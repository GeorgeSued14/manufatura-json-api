import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import dotenvsafe from "dotenv-safe";

dotenvsafe.config();

const SECRET_KEY = <string>process.env.SECRET_OR_KEY;

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["auth"];
  let payload;

  try {
    payload = <any>jwt.verify(token, SECRET_KEY);
    res.locals.payload = payload;
  } catch (error) {
    res.status(401).send();
  }
  const { userId, email } = payload;
  const newToken = jwt.sign({ userId, email }, SECRET_KEY, {
    expiresIn: 60,
  });

  res.setHeader("token", newToken);

  next();
};
