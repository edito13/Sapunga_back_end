import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import User from "../models/user.model";
import { JwtPayload } from "../types";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader) throw "Token não enviado!";

    const parts = authHeader.split(" ");

    if (!(parts.length === 2)) throw "Erro no Token";

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) throw "Token mal formatado";

    const secret = process.env.SECRET as string;

    const { id } = Jwt.verify(token as string, secret) as JwtPayload;
    const user = await User.findById(id, "-password");

    if (!user) throw "Token Inválido!";

    req.userId = id;

    next();
  } catch (error) {
    res.status(401).send({ error });
  }
};

export default auth;
