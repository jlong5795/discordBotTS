import dayjs from "dayjs";
import { connect } from "mongoose";

export const connectDatabase = async () => {
    await connect(process.env.MONGODB_URI as string);
    console.log(`Connected to MongoDB @ ${dayjs().format("MM-DD-YYYY hh:mm:ss")}!`);
};