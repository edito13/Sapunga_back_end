import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/user.model";
import { expressFunction } from "../types";

// Create a new user
export const RegistUser: expressFunction = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  const user = await UserModel.findOne({ email });

  try {
    if (user) throw "Já existe um usuário com este e-mail";
    else if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    )
      throw "Há campos vazios, preencha-os!";
    else if (confirmPassword !== password) throw "As senhas são diferentes";

    // If it´s all ok

    const salt = await bcrypt.genSalt(12);
    const passwordCrypted = await bcrypt.hash(password, salt);
    const userRegisted = await UserModel.create({
      name,
      email,
      password: passwordCrypted,
    });

    res.send({status: 200, user: userRegisted});
  } catch (error) {
    res.send({status: 500, erro: error});
  }
};

// Get all users
export const SelectAllUser: expressFunction = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (error) {
    res.send({status: 500, erro: error});
  }
};

// Get a specific user
export const SelectUser: expressFunction = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id, "-password");
    if(!user) throw 'Usuário não encontrado!'
    res.send({status: 200, user});
  } catch (error) {
    res.send({status: 500, erro: error});
  }
};

// Delete a specific user
export const DeleteUser: expressFunction = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await UserModel.findByIdAndRemove(id);
    if(!user) throw 'Usuário não encontrado'
    res.send({ status: 200, user });
  } catch (error) {
    res.send({status: 500, erro: error});
  }
};

// Update new datas of a specific user
export const UpdateUser: expressFunction = async (req, res) => {
  
};

// Check if user exist on the database
export const CheckLogin: expressFunction = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  try {
    if (!user) throw "Este email não está cadastrado";
    else if (!password) throw "Precisa enviar uma senha";

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) throw "Sua senha está incorreta, tente novamente.";

    const secret = process.env.SECRET as string;

    const token = Jwt.sign({ id: user._id }, secret);

    res.send({ status: 200, user, token });
  } catch (error) {
    res.send({status: 500, erro: error});
  }
};

export const CheckingToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) res.status(500).send("Acesso negado!");

  next();
};
