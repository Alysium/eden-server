import { model } from "mongoose";
import { IStoresDocument, IStoresModel } from "./stores.types";
import StoresSchema from "./stores.schema";

export const StoresModel = model<IStoresDocument, IStoresModel>("stores", StoresSchema);