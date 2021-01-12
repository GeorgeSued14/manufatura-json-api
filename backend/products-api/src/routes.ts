import express from "express";
import {
  getAllProducts,
  getProductById,
  storageProduct,
  removeProductById,
  updateProductById,
} from "./controllers/ProductsController";

export const routes = express.Router();

routes.get("/", getAllProducts);
routes.post("/", storageProduct);
routes.get("/:id", getProductById);

routes.put("/:id", updateProductById);
routes.delete("/:id", removeProductById);
