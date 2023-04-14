"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const telegraf_1 = require("telegraf");
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
// Importing Database Conection
const conection_1 = __importDefault(require("../database/conection"));
const multerConfig_1 = require("../assets/multerConfig");
const upload_controller_1 = require("../controllers/upload.controller");
const app = (0, express_1.default)();
const route = express_1.default.Router();
const PORT = 3000;
// Let JSON for the request
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use("/images", express_1.default.static("uploads"));
// Connect to database
(0, conection_1.default)();
// all routes can access a file.
app.use(multerConfig_1.upload.single("file"));
route.post("/uploads", upload_controller_1.uploadFile);
route.post("/sms", (req, res) => {
    const { name, phoneNumber, message } = req.body;
    const bot = new telegraf_1.Telegraf("6247664565:AAG7EcKWm_Zyn34drKwMsnYPpY2-lqC5_CI");
    bot.telegram.sendMessage(5142203429, `
    ${name} com o seguinte número ${phoneNumber}, acabou de mandar a seguinte mensagem: ${message}
  `);
    res.send("Mensagem foi enviada com sucesso!");
    // bot.start((ctx) => ctx.reply("Welcome"));
    // bot.help((ctx) => ctx.reply("Send me a sticker"));
    // bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
    // bot.hears("hi", (ctx) => ctx.reply("Hey there"));
    // bot.launch();
});
route.get("/WhatsappSms", (req, res) => {
    const client = new whatsapp_web_js_1.Client({});
    client.on("qr", (qr) => {
        qrcode_terminal_1.default.generate(qr, { small: true });
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
app.listen(process.env.PORT || PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
