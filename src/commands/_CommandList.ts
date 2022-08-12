import fs from "fs";

import { iCommand } from "../interfaces";

const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));

export const CommandList: iCommand[] = [];

for (const file of commandFiles) {
    CommandList.push(require(`./commands/${file}`));
};
