import express, { Router } from "express";
import cors from "cors";

// Importing Database Conection
import ConnectToDatabase from "../database/conection";
import { upload } from "../assets/multerConfig";
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

route.post("/uploads", uploadFile);

require("../controllers/user.controller")(app);
require("../controllers/product.controller")(app);

app.use(route);

app.listen(process.env.PORT || PORT, () =>
  console.log(`Servidor rodando na porta ${PORT}`)
);
