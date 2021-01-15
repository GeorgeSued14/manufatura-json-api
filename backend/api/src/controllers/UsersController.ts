import { Response, Request, NextFunction } from "express";
import { User } from "../models/UsersModel";
import { getManager } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const SALT_ROUND = Number(process.env.BCRYPT_SALT_ROUND);
const SECRET_KEY: any = process.env.SECRET_OR_KEY;

export const index = async (req: Request, res: Response) => {
  res.json("REST WebAPI Challenge 20200630 Running").status(200);
};

export const getAll = async (req: Request, res: Response) => {
  const userRepository = getManager().getRepository(User);
  const users = await userRepository.find();

  return res.json(users).status(200);
};

export const register = async (req: Request, res: Response) => {
  const { name, email, phone_number, password } = req.body;

  const userRepository = getManager().getRepository(User);
  const existingUser = await userRepository.findOne({ email });

  if (existingUser) {
    res.json({ message: "User already taken" }).status(400);
  } else {
    const salt = await bcrypt.genSalt(SALT_ROUND);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await userRepository.create({
      name: name,
      email: email,
      phone_number: phone_number,
      password: hashPassword,
    });

    await userRepository.save(user);

    res.json("User created successfully").status(200);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userRepository = getManager().getRepository(User);

  const user = await userRepository.findOne({
    email,
  });

  if (!user) {
    res.json({ message: "Invalid email or password" }).status(400);
  } else {
    const isPasswordSucess = await bcrypt.compare(
      password,
      user.password.toString()
    );

    if (isPasswordSucess) {
      const payload = {
        id: user.id,
        name: user.name,
      };

      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 60 });

      res.cookie("jwt", token, { secure: true, httpOnly: true });
      res.json({ auth: true, token: token }).status(200);
    } else {
      res.json({ message: "Invalid email or password" }).status(400);
    }
  }
};

export const logout = async (req: Request, res: Response) => {
  res.json({ auth: false, token: null });
};
