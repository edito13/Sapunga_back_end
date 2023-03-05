import multer, { Options } from "multer";
import { resolve } from "path";

export const MulterConfig = {
  dest: resolve(__dirname, "..", "..", "uploads"),
  storage: multer.diskStorage({
    destination: (req, file, calback) => {
      calback(null, resolve(__dirname, "..", "..", "uploads"));
    },
    filename: (req, file, calback) => {
      const time = new Date().getTime();

      calback(null, `${time}_${file.originalname}`);
    },
  }),
} as Options;
