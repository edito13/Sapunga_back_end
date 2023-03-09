import { Request, Response, NextFunction } from "express";
import { UploadProvider } from "./interfaces/UploadProvider";

export class LocalUploadService implements UploadProvider {
  handle(req: Request, res: Response, next: NextFunction) {
    return res.send({});
  }
}
