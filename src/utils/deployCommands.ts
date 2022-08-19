import fs from "node:fs";
import path from "node:path";
import { REST } from "@discordjs/rest";
import { Routes } from "discord.js";
require("dotenv").config();


const commands: any[] = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN!);


rest.put(Routes.applicationGuildCommands(process.env.BOT_ID!, process.env.GUILD_ID!), { body: commands })
    .then(() => console.log('Successfully registered commands'))
    .catch(console.error);
// rest.put(Routes.applicationCommands(process.env.BOT_ID!), { body: commands })
//     .then(() => console.log('Successfully registered global commands'))
//     .catch(console.error);

// rest.put(Routes.applicationGuildCommands(process.env.BOT_ID!, process.env.GUILD_ID!), { body: [] })
//     .then(() => console.log('Successfully unregistered all guild commands'))
//     .catch(console.error);
// rest.put(Routes.applicationCommands(process.env.BOT_ID!), { body: [] })
//     .then(() => console.log('Successfully unregistered all global commands'))
//     .catch(console.error);