import { Document } from "mongoose";

export interface iCamperModel extends Document {
    day: number,
    discordId: string,
    round: number,
    timestamp: number | string,
}