import { Response, Request, NextFunction } from "express";
import { User } from "../models/UsersModel";
import { getRepository } from "typeorm";

import { validate } from "class-validator";

export const index = async (req: Request, res: Response) => {
  res.json({ message: "REST WebAPI Challenge 20200630 Running" }).status(200);
};

export const getAll = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  const users = await userRepository.find({
    select: ["id", "name", "email"],
  });

  return res.json(users).status(200);
};
export const getOneById = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const userRepository = getRepository(User);
  try {
    const user = userRepository.findOneOrFail(id, {
      select: ["id", "email", "role"],
    });
    res.json(user).status(200);
  } catch (error) {
    res.status(404).send("User not found");
  }
};

export const register = async (req: Request, res: Response) => {
  const { name, email, phone_number, role, password } = req.body;

  const userRepository = getRepository(User);
  const existingUser = await userRepository.findOne({ email });

  if (existingUser) {
    res.json({ message: "User already taken" }).status(400);
  } else {
    const user: User = userRepository.create({
      name: name,
      email: email,
      phone_number: phone_number,
      role: role,
      password: password,
    });

    user.password = user.hashPassword();
    console.log(user);
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send("username already in use");
      return;
    }

    res.json("User created successfully").status(201);
  }
};

export const update = async (req: Request, res: Response) => {
  const id = req.params.id;

  const { email, role } = req.body;

  const userRepository = getRepository(User);

  let user: User;

  try {
    user = await userRepository.findOneOrFail(id);
  } catch (error) {
    res.status(404).send("User not found");
    return;
  }

  user.email = email;
  user.role = role;

  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  try {
    await userRepository.save(user);
  } catch (e) {
    res.status(409).send("username already in use");
    return;
  }
  res.status(204).json(user);
};

export const remove = async (req: Request, res: Response) => {
  const id = req.params.id;

  const userRepository = getRepository(User);
  let user: User;
  try {
    user = await userRepository.findOneOrFail(id);
  } catch (error) {
    res.status(404).send("User not found");
    return;
  }
  userRepository.delete(id);

  res.status(204).json(`User ${id} was deleted successfuly`);
};
