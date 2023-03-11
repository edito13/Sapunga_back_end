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
import { upload } from "../assets/multerConfig";
import {
  cadastrar_produto,
  selecionar_produtos,
} from "../controllers/products.controller";
import { uploadFile } from "../controllers/upload.controller";

const app = express();
const route = Router();
const PORT = 3000;

// Let JSON for the request
app.use(express.json());

app.use(cors());
app.use("/images", express.static("uploads"));

// Connect to database
ConnectToDatabase();

// all routes can access a file.
app.use(upload.single("file"));

route.get("/selecionar_usuarios", SelectAllUser);

route.get("/selecionar_usuario/:id", CheckingToken, SelectUser);

route.delete("/deletar_usuario", DeleteUser);

route.post("/verificar_login", CheckLogin);

route.post("/cadastrar_usuario", RegistUser);

route.post("/uploads", uploadFile);

route.post("/cadastrar_produto", cadastrar_produto);
route.get("/selecionar_produtos", selecionar_produtos);

app.use(route);

app.listen(process.env.PORT || PORT, () =>
  console.log(`Servidor rodando na porta ${PORT}`)
);
