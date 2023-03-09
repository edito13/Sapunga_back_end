import { Request, Response, NextFunction } from "express";
import { UploadProvider } from "./interfaces/UploadProvider";
import {
  getDownloadURL,
  uploadBytes,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import path from "path";
import { v4 } from "uuid";
import { storage } from "../config/firebase";

export class FirebaseUploadService implements UploadProvider {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) throw new Error("No file found.");
      // 'file' comes from the Blob or File API
      const extname = path.extname(req.file.originalname);
      const filename = `${v4()}.${extname}`;

      const storageRef = ref(storage, `/uploads/${filename}`);

      await uploadBytes(storageRef, req.file.buffer).then((snapshot) => {
        console.log("Uploaded a blob or file!");
        console.log(snapshot.metadata);
      });

      return res.send({});
    } catch (e: any) {
      return res.status(400).send({ status: "error", message: e.message });
    }
  }
}
