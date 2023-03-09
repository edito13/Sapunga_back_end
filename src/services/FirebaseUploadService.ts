import { Request, Response, NextFunction } from "express";
import { UploadProvider } from "./interfaces/UploadProvider";

export class FirebaseUploadService implements UploadProvider {
  async handle(req: Request, res: Response, next: NextFunction) {
    return true;
  }
}