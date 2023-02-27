import express, { Router } from "express";
import cors from "cors";

// Importing Controllers Functions
import {
  CheckingToken,
  CheckLogin,
  DeleteUser,
  RegistUser,
  SelectAllUser,
  SelectUser,
} from "../controllers/user.controller";

// Importing Database Conection
import ConnectToDatabase from "../database/conection";
import multer from "multer";
import { storage } from "../assets/multerConfig";

const app = express();
const route = Router();
const port = 8000;

// Let JSON for the request
app.use(express.json());

app.use(cors());
app.use('/images', express.static('uploads'))

// Connect to database
ConnectToDatabase();

const uploads = multer({ storage })

route.get("/selecionarUsuarios", SelectAllUser);

route.get("/selecionarUsuario/:id", CheckingToken, SelectUser);

route.delete("/deletar_usuario", DeleteUser);

route.post("/verificar_login", CheckLogin);

route.post("/cadastrar_usuario", RegistUser);

route.post('/uploads', uploads.single('file'), (req, res) => {
  res.send(req.file?.filename)
})

app.use(route);

app.listen(port, () => console.log("O servidor está ligado"));
