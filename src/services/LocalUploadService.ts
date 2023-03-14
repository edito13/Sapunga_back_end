import { Request, Response, NextFunction } from "express";
import { UploadProvider } from "./interfaces/UploadProvider";
import fs from "node:fs";
import path from "node:path";
import { v4 } from "uuid";
import { promisify } from "node:util";

const UPLOAD_FOLDER = "uploads";

const writeFile = promisify(fs.writeFile);

export class LocalUploadService implements UploadProvider {
  async handle(req: Request, res: Response, next: NextFunction) {
    if (!req.file) {
      return res.send({ status: "error", message: "No file found." });
    }

    const extname = path.extname(req.file.originalname);
    const filename = `${v4()}.${extname}`;

    // C://users/Fran/....asias.jpg
    const fileUrl = path.resolve(
      __dirname,
      "..",
      "..",
      UPLOAD_FOLDER,
      filename
    );

    try {
      await writeFile(fileUrl, req.file.buffer);

      return res.json({
        url: this.getFullAddress(filename),
      });
    } catch (error) {
      return res.status(400).send({ error });
    }
  }
  getFullAddress(filename: string) {
    // the server address must be before that
    return `/Images/${filename}`;
  }
}
