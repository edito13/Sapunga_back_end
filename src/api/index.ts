import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Telegraf } from "telegraf";
import { Client } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

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

route.post("/sms", (req, res) => {
  const { name, phoneNumber, message } = req.body;

  const bot = new Telegraf("6247664565:AAG7EcKWm_Zyn34drKwMsnYPpY2-lqC5_CI");
  bot.telegram.sendMessage(
    5142203429,
    `
    ${name} com o seguinte número ${phoneNumber}, acabou de mandar a seguinte mensagem: ${message}
  `
  );
  res.send("Mensagem foi enviada com sucesso!");
  // bot.start((ctx) => ctx.reply("Welcome"));
  // bot.help((ctx) => ctx.reply("Send me a sticker"));
  // bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
  // bot.hears("hi", (ctx) => ctx.reply("Hey there"));
  // bot.launch();
});

route.get("/WhatsappSms", (req, res) => {
  const client = new Client({});

  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log("Você está conectado no Whatsapp");
  });

  client.on("message", (msg) => {
    if (msg.body == "ping") {
      msg.reply("pong");
    }
  });

  client.initialize();

  res.send("Mensagem foi enviada com sucesso!");
});

require("../controllers/user.controller")(app);
require("../controllers/product.controller")(app);
require("../controllers/order.controller")(app);
require("../controllers/react.controller")(app);
require("../controllers/category.controller")(app);
require("../controllers/admin.controller")(app);

app.use(route);

app.listen(process.env.PORT || PORT, () =>
  console.log(`Servidor rodando na porta ${PORT}`)
);
