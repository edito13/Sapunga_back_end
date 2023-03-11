import firebaseConfig from "./firebase.json";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);
// "gs://react-login-10ba2.appspot.com"

export { firebaseApp, storage };
