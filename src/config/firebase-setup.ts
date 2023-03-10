import firebaseConfig from "./firebase.json";
import { initializeApp } from "firebase/app";
import {
  ref as StorageRef,
  UploadMetadata,
  getStorage,
} from "firebase/storage";
import { Request } from "express";
import path from "path";
import { v4 } from "uuid";

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);
// "gs://react-login-10ba2.appspot.com"

function uploadFileToFirebase(req: Request) {
  if (!req.file) throw new Error("No file found.");

  const extname = path.extname(req.file.originalname);
  const filename = `${v4()}.${extname}`;

  const storageRef = StorageRef(storage);
  const metadata: UploadMetadata = {
    contentType: req.file.mimetype,
  };

  // const snapshot = await uploadBytesResumable(
  //   storageRef,
  //   req.file.buffer,
  //   metadata
  // );

  // uploadBytes(storageRef, req.file.buffer).then((snapshot) => {
  //   console.log("Uploaded a blob or file!");
  // });

  // const downloadedURL = await getDownloadURL(snapshot.ref);
  return { storage, storageRef };
}

export { firebaseApp, storage, uploadFileToFirebase };
