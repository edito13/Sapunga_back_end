import { Request, Response, NextFunction } from "express";
import path from "path";
import {
  ref as StorageRef,
  UploadMetadata,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { UploadProvider } from "./interfaces/UploadProvider";
import { v4 } from "uuid";
import { storage, firebaseApp } from "../config/firebase-setup";

export class FirebaseUploadService implements UploadProvider {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) throw new Error("No file found.");

      const extname = path.extname(req.file.originalname);
      const filename = `${v4()}${extname}`;

      const storageRef = StorageRef(storage, filename);
      const metadata: UploadMetadata = {
        contentType: req.file.mimetype,
      };

      const snapshot = await uploadBytesResumable(
        storageRef,
        req.file.buffer,
        metadata
      );

      await uploadBytes(storageRef, req.file.buffer);

      const imageURL = getDownloadURL(snapshot.ref).then(
        (urlImage: string) => urlImage
      );

      return res.send({
        // url: this.getFullAddress(filename),
        filename,
        url: imageURL,
        // storageRef,
      });
    } catch (e: any) {
      return res.status(400).send({ status: "error", message: e.message });
    }
  }

  getFullAddress(filename: string) {
    const {
      options: { storageBucket },
    } = firebaseApp;
    // return `https://storage.googleapis.com/${storageBucket}/${filename}?alt=media`;
    return `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/${filename}?alt=media`;
  }
}
