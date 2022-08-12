import dayjs from "dayjs";

import CamperModel from "../database/models/CamperModel";

export const getCamperData = async (id: string) => {
    const camperData = await CamperModel.findOne({ discordId: id }) || 
        (await CamperModel.create({ 
            date: dayjs().format("YYYY-MM-DD"),
            day: 0,
            discordId: id,
            round: 1
        }));
    return camperData;
}