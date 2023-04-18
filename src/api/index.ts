import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// Importing Database Conection
import ConnectToDatabase from "../database/conection";
import { upload } from "../assets/multerConfig";
import { uploadFile } from "../controllers/upload.controller";
import auth from "../middleware/auth.middleware";
import { Telegraf } from "telegraf";
import User from "../models/user.model";

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
route.post("/sendMessage", auth, async (req, res) => {
  const { message } = req.body;

  try {
    const user = await User.findById(req.userId);

    const bot = new Telegraf("6247664565:AAG7EcKWm_Zyn34drKwMsnYPpY2-lqC5_CI");
    bot.telegram.sendMessage(
      5142203429,
      `
      Usuário: ${user?.name}
      
      Mensagem: ${message}
    `
    );

    res.send("Mensagem enviada com sucesso.");
  } catch (error) {
    res.status(401).send({ error });
  }
});

require("../controllers/user.controller")(app);
require("../controllers/product.controller")(app);
require("../controllers/order.controller")(app);
require("../controllers/favourite.controller")(app);
require("../controllers/category.controller")(app);
require("../controllers/admin.controller")(app);

app.use(route);

app.listen(process.env.PORT || PORT, () =>
  console.log(`Servidor rodando na porta ${PORT}`)
);
