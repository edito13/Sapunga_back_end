import { Router } from "express";

const router = Router();

module.exports = (app: any) => app.use("/order", router);
