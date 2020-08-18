import { model } from "mongoose";
import { IInventoriesDocument } from "./inventories.types";
import InventoriesSchema from "./inventories.schema";

export const InventoriesModel = model<IInventoriesDocument>("inventories", InventoriesSchema);