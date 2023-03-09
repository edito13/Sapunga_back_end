import { NextFunction, Request, Response } from "express";
import { FirebaseUploadService } from "../services/FirebaseUploadService";
import { UploadProvider } from "../services/interfaces/UploadProvider";
import { LocalUploadService } from "../services/LocalUploadService";
import { NodeEnvironment } from "../types";

export async function uploadFile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const localUpload = new LocalUploadService();
  const firebaseUpload = new FirebaseUploadService();
  const env = process.env.NODE_ENV as NodeEnvironment;

  const waysToUpload: Record<NodeEnvironment, UploadProvider> = {
    development: localUpload,
    production: firebaseUpload,
  };

  const UploadEntity = waysToUpload[env || "development"];

  UploadEntity.handle(req, res, next);
}
