import { Express, Request, Response } from "express";
import * as express from "express";
import httpProxy from "express-http-proxy";

const API_USER: String = process.env.API_USER || "http://localhost:3030/users";
const API_PRODUCT: String =
  process.env.API_PRODUCT || "http://localhost:3030/products";

const userServiceProxy = httpProxy(`${API_USER}`, {
  proxyErrorHandler: function (err, res, next) {
    console.log(err);
    switch (err && err.code) {
      case "ECONNRESET": {
        return res.status(504).json("Tempo expirado");
      }
      case "ENOTFOUND": {
        return res
          .status(400)
          .json(
            "Houve um erro ao tentar acessar o servidor, entre em contato com o administrador"
          );
      }
      default: {
        next(err);
      }
    }
  },
});

const productServiceProxy = httpProxy(`${API_PRODUCT}`);
export function initRoutes(app: Express) {
  app.use("/users", (req: Request, res: Response, next: NextFunction) => {
    userServiceProxy(req, res, next);
  });

  app.use("/products", (req: Request, res: Response, next: NextFunction) => {
    productServiceProxy(req, res, next);
  });
}
