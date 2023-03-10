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
import { storage } from "../config/firebase-setup";

export class FirebaseUploadService implements UploadProvider {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) throw new Error("No file found.");

      const extname = path.extname(req.file.originalname);
      const filename = `${v4()}.${extname}`;

      const storageRef = StorageRef(storage, `uploads/${filename}`);
      const metadata: UploadMetadata = {
        contentType: req.file.mimetype,
      };

      const snapshot = await uploadBytesResumable(
        storageRef,
        req.file.buffer,
        metadata
      );

      uploadBytes(storageRef, req.file.buffer).then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });

      const downloadedURL = await getDownloadURL(snapshot.ref);

      return res.send({
        downloadedURL,
      });
    } catch (e: any) {
      return res.status(400).send({ status: "error", message: e.message });
    }
  }
}
