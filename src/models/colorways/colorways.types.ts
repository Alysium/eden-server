import {Document, Model} from "mongoose"
import mongoose from 'mongoose';
export interface IColorways {
    colorwayName: string;
    name: string;
    brand: number;
    type: number;
    gender: number;
    product: mongoose.Types.ObjectId;
    colors: number[];
    pictures: string[];
    thumbnailUrl: string;
}

export interface IColorwayDocument extends IColorways, Document{}

export interface IColorwayModel extends Model<IColorwayDocument>{}