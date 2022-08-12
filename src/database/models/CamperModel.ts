import { model, Schema } from "mongoose";
import { iCamperModel } from "../../interfaces";

export const Camper = new Schema({
    day: Number,
    discordId: String,
    round: Number,
    timestamp: Number,
});

export default model<iCamperModel>("camper", Camper);