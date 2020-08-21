import {Document, Model} from "mongoose"
import mongoose from "mongoose"
export interface IStoreLocations {
    address: string;
    store: mongoose.Types.ObjectId;
    coordinates: {
        type: string;
        coordaintes: number[];
    }
}

export interface IStoreLocationsDocument extends IStoreLocations, Document{}

export interface IStoreLocationsModel extends Model<IStoreLocationsDocument>{}