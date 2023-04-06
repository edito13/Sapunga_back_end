import express from "express";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Admin from "../models/admin.model";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, code, confirmCode } = req.body;

  try {
    if (!name) throw "Por favor, envie um nome!";
    else if (!code) throw "Por favor, envie um código de acesso!";
    else if (code !== confirmCode)
      throw "Os códigos não são iguais, corriga-os";

    const salt = await bcrypt.genSalt(12);
    const passwordCrypted = await bcrypt.hash(code, salt);

    const admin = await Admin.create({ name, code: passwordCrypted });

    res.json(admin);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.post("/checkLogin", async (req, res) => {
  const { name, code } = req.body;

  const admin = await Admin.findOne({ name });

  try {
    if (!admin) throw "Desculpa, mas não existe este administrador!";

    const checkCode = await bcrypt.compare(code, admin.code as string);

    if (!checkCode)
      throw "Seu código está incorreto, envie um código de acesso certo!";

    const secret = process.env.SECRET as string;

    const token_admin = Jwt.sign({ id: admin._id }, secret);

    res.json({ admin, token_admin });
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find({});

    res.json(admins);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findById(id);

    if (!admin) throw "Administrador não encontrado!";

    res.json(admin);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.delete("/", async (req, res) => {
  const { id } = req.body;

  try {
    const admin = await Admin.findByIdAndRemove(id);

    if (!admin) throw "Administrador não encontrado!";

    res.json(admin);
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = (app: any) => app.use("/admin", router);
