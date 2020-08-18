import { model } from "mongoose";
import { IStoreLocationsDocument, IStoreLocationsModel } from "./storeLocations.types";
import StoreLocationsSchema from "./storeLocations.schema";

export const StoreLocationsModel = model<IStoreLocationsDocument, IStoreLocationsModel>("storeLocations", StoreLocationsSchema);