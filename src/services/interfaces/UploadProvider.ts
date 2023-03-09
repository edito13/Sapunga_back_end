import { Request, Response, NextFunction } from "express";

export interface UploadProvider {
  handle: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response>;
}
