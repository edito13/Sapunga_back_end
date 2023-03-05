import multer from "multer";
import { resolve } from "path";

export const storage = multer.diskStorage({
  destination: (req, file, calback) => {
    calback(null, resolve("uploads"));
  },
  filename: (req, file, calback) => {
    const time = new Date().getTime();

    calback(null, `${time}_${file.originalname}`);
  },
});
