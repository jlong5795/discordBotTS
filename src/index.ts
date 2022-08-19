import { Client, Collection, GatewayIntentBits } from "discord.js";
import dayjs from "dayjs";
import fs from "node:fs";
import path from "node:path";
require('dotenv').config();

import { connectDatabase } from "./database/connectDatabase";
import { validateEnv } from "./utils/validateEnv";

// Validate environment variables
if (!validateEnv()) {
    throw new Error("Invalid environment variables");
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // set a new item in the collection with the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

(async () => {
    try {
        client.once("ready", () => console.log(`Connected to Discord @ ${dayjs().format("MM-DD-YYYY hh:mm:ss")}!`));
        
        client.on("interactionCreate", async (interaction: any) => {
            if (!interaction.isChatInputCommand()) return;

            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                //TODO: Send to error log
                await interaction.reply({ content: "An error occurred while attempting to execute this command", ephemeral: true });
            }
        })

        // Connects to MongoDB
        await connectDatabase();
        // Log in bot
        await client.login(process.env.BOT_TOKEN);
    } catch (error) {
        console.error(error);
    }




})();
