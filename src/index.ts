import { Client } from "discord.js";
import dayjs from "dayjs";

import { IntentOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase";
import { onInteraction } from "./events";
import { validateEnv } from "./utils/validateEnv";

(async () => {
    if (!validateEnv()) return;

    const BOT = new Client({ intents: IntentOptions });

    BOT.on("ready", () => console.log(`Connected to Discord @ ${dayjs().format("MM-DD-YYYY hh:mm:ss")}!`));
    BOT.on("interactionCreate", async (interaction) => await onInteraction(interaction));

    await connectDatabase();

    await BOT.login(process.env.BOT_TOKEN);
})();
