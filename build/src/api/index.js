"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
// Importing Controllers Functions
const user_controller_1 = require("../controllers/user.controller");
// Importing Database Conection
const conection_1 = __importDefault(require("../database/conection"));
const app = (0, express_1.default)();
const route = (0, express_1.Router)();
const port = 8000;
// Let JSON for the request
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Connect to database
(0, conection_1.default)();
route.get("/selecionarUsuarios", user_controller_1.SelectAllUser);
route.get("/selecionarUsuario/:id", user_controller_1.CheckingToken, user_controller_1.SelectUser);
route.delete("/deletar_usuario", user_controller_1.DeleteUser);
route.post("/verificar_login", user_controller_1.CheckLogin);
route.post("/cadastrar_usuario", user_controller_1.RegistUser);
app.use(route);
app.listen(port, () => console.log("O servidor está ligado"));
