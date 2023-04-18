"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mailgun = require("mailgun.js");
const formData = require("form-data");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const api = require("../../node_modules/clicksend/api.js");
// Importing Database Conection
const conection_1 = __importDefault(require("../database/conection"));
const multerConfig_1 = require("../assets/multerConfig");
const upload_controller_1 = require("../controllers/upload.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const telegraf_1 = require("telegraf");
const user_model_1 = __importDefault(require("../models/user.model"));
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
route.post("/sendMessage", auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = req.body;
    try {
        const user = yield user_model_1.default.findById(req.userId);
        const bot = new telegraf_1.Telegraf("6247664565:AAG7EcKWm_Zyn34drKwMsnYPpY2-lqC5_CI");
        bot.telegram.sendMessage(5142203429, `
      Usuário: ${user === null || user === void 0 ? void 0 : user.name}
      
      Mensagem: ${message}
    `);
        res.send("Mensagem enviada com sucesso.");
    }
    catch (error) {
        res.status(401).send({ error });
    }
}));
require("../controllers/user.controller")(app);
require("../controllers/product.controller")(app);
require("../controllers/order.controller")(app);
require("../controllers/favourite.controller")(app);
require("../controllers/category.controller")(app);
require("../controllers/admin.controller")(app);
app.use(route);
app.listen(process.env.PORT || PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
