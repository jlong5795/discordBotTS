import { Client } from "discord.js";
import dayjs from "dayjs";

import { connectDatabase } from "./database/connectDatabase";
import { IntentOptions } from "./config/intentOptions";
import { validateEnv } from "./utils/validateEnv";

(async () => {
    if (!validateEnv()) return;

    const BOT = new Client({ intents: IntentOptions });

    BOT.on("ready", () => console.log(`Connected to Discord @ ${dayjs().format("MM-DD-YYYY hh:mm:ss")}!`));
    

    await connectDatabase();

    await BOT.login(process.env.BOT_TOKEN);
})();
