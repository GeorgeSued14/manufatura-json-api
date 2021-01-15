import httpProxy from "http-proxy";
import { Request, Response, Express } from "express";
import dotenvsafe from "dotenv-safe";
import { ErrnoException, handlerError } from "../config/handleError";

dotenvsafe.config({ allowEmptyValues: true });

const API_PRODUCTS = process.env.API_PRODUCTS;

const proxy = httpProxy.createProxyServer({});

export function initProxy(app: Express) {
  app.use("/products/", (req: Request, res: Response) => {
    console.log("Redirect products");
    proxy.web(
      req,
      res,
      { target: API_PRODUCTS, changeOrigin: true },
      (err: ErrnoException) => handlerError(err, res)
    );
  });
}
