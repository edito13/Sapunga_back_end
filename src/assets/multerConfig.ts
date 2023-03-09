import multer from "multer";

// const storage = multer.diskStorage({
//   destination: (req, file, calback) => {
//     calback(null, resolve("uploads"));
//   },
//   filename: (req, file, calback) => {
//     const time = new Date().getTime();

//     calback(null, `${time}_${file.originalname}`);
//   },
// });

const storage = multer.memoryStorage();
const upload = multer({ storage });

export { upload };
