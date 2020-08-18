import mongoose from 'mongoose';
import {Document, Model} from "mongoose"
const {Array,ObjectId} = mongoose.Types


export interface IProducts {
    name: string;
    colorways: string[];
    description: string;
    brand: number;
    type: number;
    gender: number;
}

export interface IProductsDocument extends IProducts, Document{}
export interface IProductsModel extends Model<IProductsDocument>{}
