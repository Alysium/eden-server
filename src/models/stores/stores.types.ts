import {Document, Model} from "mongoose"
import mongoose from "mongoose"
export interface IStores {
    name: string;
    storeLocations: mongoose.Types.ObjectId[];
    logoThumbnailUrl: string;
    websiteUrl: string;
}

export interface IStoresDocument extends IStores, Document{}

export interface IStoresModel extends Model<IStoresDocument>{}