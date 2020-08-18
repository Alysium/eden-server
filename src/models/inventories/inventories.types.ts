import {Document, Model} from "mongoose"
import mongoose from 'mongoose';
export interface IInventories {
    colorway: mongoose.Types.ObjectId;
    price: number;
    salePrice: number;
    sale: boolean;
    sizes: Object;
    storeLocation: mongoose.Types.ObjectId;
    newRelease: boolean
}

export interface IInventoriesDocument extends IInventories, Document{}

export interface IInventoriesModel extends Model<IInventoriesDocument>{}