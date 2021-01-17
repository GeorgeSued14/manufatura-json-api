import { json, NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository, getManager } from "typeorm";
import { validate } from "class-validator";
import { User } from "../models/UsersModel";
import bcrypt from "bcryptjs";

const SECRET_KEY = <string>process.env.SECRET_OR_KEY;

export const login = async (req: Request, res: Response) => {
  let { email, password } = req.body;

  if (!(email && password)) {
    res.status(400).send();
  }

  const userRepository = getRepository(User);

  let user: User = new User();

  try {
    user = await userRepository.findOneOrFail({ where: { email } });
  } catch (error) {
    res.status(401).send();
  }

  if (!user.checkIfUnencryptedPasswordIsValid(password)) {
    res.status(401).send();
    return;
  }

  const token = jwt.sign(
    { userId: user.id, username: user.email },
    SECRET_KEY,
    { expiresIn: 60 }
  );
  res.setHeader("auth", token);
  res.json({ auth: true, token: token });
};

export const logout = async (req: Request, res: Response) => {
  res.json({ auth: false, token: null });
};

export const changePassword = async (req: Request, res: Response) => {
  const id = res.locals.jwtPayload.userId;

  const { oldPassword, newPassword } = req.body;
  if (!(oldPassword && newPassword)) {
    res.status(400).send();
  }

  const userRepository = getRepository(User);
  let user: User = new User();

  try {
    user = await userRepository.findOneOrFail(id);
  } catch (id) {
    res.status(401).send();
  }

  if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
    res.status(401).send();
    return;
  }

  user.password = newPassword;

  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  user.hashPassword();
  userRepository.save(user);

  res.status(204).send();
};
