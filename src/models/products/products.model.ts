import { model } from "mongoose";
import { IProductsDocument, IProductsModel } from "./products.types";
import ProductsSchema from "./products.schema";

export const ProductsModel = model<IProductsDocument, IProductsModel>("products",  ProductsSchema);