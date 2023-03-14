import { Request, Response, NextFunction, Router } from "express";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import { expressFunction } from "../types";

interface JwtPayload {
  id: string;
}

const CheckingToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  try {
    if (!authHeader) throw "Token não enviado!";

    const token = authHeader && authHeader.split(" ")[1];
    const secret = process.env.SECRET as string;

    const { id } = Jwt.verify(token as string, secret) as JwtPayload;
    const user = await User.findById(id, "-password");

    if (!user) throw "Token Inválido!";

    next();
  } catch (error) {
    res.status(401).send({ error });
  }
};

const router = Router();

router.post("/regist", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  const user = await User.findOne({ email });

  try {
    if (user) throw "Já existe um usuário com este e-mail";
    // If it´s all ok

    const salt = await bcrypt.genSalt(12);
    const passwordCrypted = await bcrypt.hash(password, salt);
    const userRegisted = await User.create({
      name,
      email,
      password: passwordCrypted,
    });

    res.status(201).json({ user: userRegisted });
  } catch (error) {
    res.status(401).send({ error });
  }
});

router.get("/selectAll", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.get("/selectOne/:id", CheckingToken, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) throw "Usuário não encontrado!";
    res.json(user);
  } catch (error) {
    res.status(401).send({ error });
  }
});

router.delete("/deleteUser", async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findByIdAndRemove(id);
    if (!user) throw "Usuário não encontrado";
    res.json(user);
  } catch (error) {
    res.status(401).send({ error });
  }
});

router.post("/checkLogin", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  try {
    if (!user) throw "Este email não está cadastrado";

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) throw "Sua senha está incorreta, tente novamente.";

    const secret = process.env.SECRET as string;

    const token = Jwt.sign({ id: user._id }, secret);

    res.json({ user, token });
  } catch (error) {
    res.send({ error: error as string });
  }
});

// Update new datas of a specific user
router.put("UpdateUser", async (req, res) => {});

module.exports = (app: any) => app.use("/user", router);
