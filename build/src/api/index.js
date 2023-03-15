"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Importing Database Conection
const conection_1 = __importDefault(require("../database/conection"));
const multerConfig_1 = require("../assets/multerConfig");
const upload_controller_1 = require("../controllers/upload.controller");
const app = (0, express_1.default)();
const route = express_1.default.Router();
const PORT = 3000;
// Let JSON for the request
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/images", express_1.default.static("uploads"));
// Connect to database
(0, conection_1.default)();
// all routes can access a file.
app.use(multerConfig_1.upload.single("file"));
route.post("/uploads", upload_controller_1.uploadFile);
require("../controllers/user.controller")(app);
require("../controllers/product.controller")(app);
require("../controllers/category.controller")(app);
require("../controllers/order.controller")(app);
require("../controllers/react.controller")(app);
app.use(route);
app.listen(process.env.PORT || PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
