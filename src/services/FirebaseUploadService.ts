import { Request, Response, NextFunction } from "express";
import "../config/firebase-setup";
import { uploadFileToFirebase } from "../config/firebase-setup";
import { UploadProvider } from "./interfaces/UploadProvider";

export class FirebaseUploadService implements UploadProvider {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { storage, storageRef } = uploadFileToFirebase(req);

      return res.send({
        url: "downloadedURL!",
        storage,
        storageRef,
      });
    } catch (e: any) {
      return res.status(400).send({ status: "error", message: e.message });
    }
  }
}
