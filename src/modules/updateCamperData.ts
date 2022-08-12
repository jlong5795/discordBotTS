import dayjs from "dayjs";

import CamperModel from "../database/models/CamperModel";
import { iCamperModel } from "../interfaces";

export const updateCamperData = async (Camper: iCamperModel) => {
    Camper.day++;
    if (Camper.day > 100) {
        Camper.day = 1;
        Camper.round ++;
    }
    Camper.timestamp = dayjs().format("YYYY-MM-DD");
    await Camper.save();
    return Camper;
};