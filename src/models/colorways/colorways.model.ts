import { model } from "mongoose";
import { IColorwayDocument, IColorwayModel } from "./colorways.types";
import ColorwaysSchema from "./colorways.schema";

export const ColorwaysModel = model<IColorwayDocument, IColorwayModel>("colorways", ColorwaysSchema);