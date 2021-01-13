import { Response, Request } from "express";
import { Product } from "../models/ProductsModel";
import { getManager, getRepository } from "typeorm";

export const getAllProducts = async (req: Request, res: Response) => {
  const productsRepository = getManager().getRepository(Product);
  const products = await productsRepository.find();
  console.log("Product", products);

  return res.json(products).status(200);
};

export const storageProduct = async (req: Request, res: Response) => {
  let product = new Product();
  product = { ...req.body };
  console.log(product);
  console.log("meu json", JSON.stringify(product));

  const productRepository = getManager().getRepository(Product);
  product = await productRepository.create(product);

  await productRepository.save(product);

  return res.json(product).status(201);
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const productRepository = getManager().getRepository(Product);

  const product = await productRepository.findOne(id);

  console.log("Product do id", product);

  res.send(product).status(200);
};

export const removeProductById = async (req: Request, res: Response) => {
  const productRepository = getRepository(Product);

  const product = await productRepository.find({
    id: Number(req.params.id),
  });

  await productRepository.remove(product);

  return res.json(`Product id ${req.params.id} has been deleted.`).status(200);
};

export const updateProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    type,
    title,
    description,
    filename,
    height,
    width,
    price,
    rating,
  } = req.body;
  const productRepository = getRepository(Product);

  const newProduct = {
    type: type,
    title: title,
    description: description,
    filename: filename,
    height: height,
    width: width,
    price: price,
    rating: rating,
    updated_at: new Date(),
  };

  await productRepository.update(Number(id), newProduct);

  const updateProductById = await productRepository.findOneOrFail({
    id: Number(id),
  });

  return res.json(updateProductById).status(204);
};
