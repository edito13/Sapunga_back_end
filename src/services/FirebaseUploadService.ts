import { Request, Response, NextFunction } from "express";
import path from "path";
import {
  ref as StorageRef,
  UploadMetadata,
  uploadBytesResumable,
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

      const downloadURL = await getDownloadURL(snapshot.ref);
      const fullAddress = this.getFullAddress(filename);
      const viewURL = `${fullAddress}?alt=media`;

      return res.send({
        filename,
        url: viewURL,
      });
    } catch (e: any) {
      return res.status(400).send({ status: "error", message: e.message });
    }
  }

  getFullAddress(filename: string) {
    const {
      options: { storageBucket },
    } = firebaseApp;
    const fullAddress = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodeURIComponent(
      filename
    )}`;

    return fullAddress;
  }
}
