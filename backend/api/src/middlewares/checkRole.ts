import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { User } from "../models/UsersModel";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.payload.userId;

    const userRepository = getRepository(User);

    var user: User = new User();

    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    if (roles.indexOf(user.role) > -1) next();
    else res.status(401).send();
  };
};
