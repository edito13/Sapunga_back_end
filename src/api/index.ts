import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// Importing Database Conection
import ConnectToDatabase from "../database/conection";
import { upload } from "../assets/multerConfig";
import { uploadFile } from "../controllers/upload.controller";

const app = express();
const route = express.Router();
const PORT = 3000;

// Let JSON for the request
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use("/images", express.static("uploads"));

// Connect to database
ConnectToDatabase();

// all routes can access a file.
app.use(upload.single("file"));

route.post("/uploads", uploadFile);

require("../controllers/user.controller")(app);
require("../controllers/product.controller")(app);
require("../controllers/category.controller")(app);
require("../controllers/order.controller")(app);
require("../controllers/react.controller")(app);

app.use(route);

app.listen(process.env.PORT || PORT, () =>
  console.log(`Servidor rodando na porta ${PORT}`)
);
