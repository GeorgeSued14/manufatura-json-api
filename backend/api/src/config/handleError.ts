import { NextFunction, Response } from "express";

export interface ErrnoException extends Error {
  errno?: number;
  code?: string;
  statusCode?: number;
  path?: string;
  syscall?: string;
  stack?: string;
}

export const handlerError = (err: ErrnoException, res: Response) => {
  console.log(err);

  if (err.code === "ENOTFOUND") {
    res.json("Servidor Indisponível").status(500);
  }

  if (err.code === "ECONNRESET") {
    res.json("Servidor Indisponível").status(500);
  }
};

export function errorHandler(
  err: ErrnoException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (typeof err === "string") {
    // custom application error
    return res.status(400).json({ message: err });
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).json({ message: "Invalid Token" });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
}
