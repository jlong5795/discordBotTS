import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";

import { iCommand } from "../interfaces";
import { getCamperData, updateCamperData } from "../modules";

export const oneHundred: iCommand = {
    data: new SlashCommandBuilder()
        .setName("100")
        .setDescription("Check in for the 100 Days of Coding Challenge!")
        .addStringOption((option) => 
            option
                .setName("message")
                .setDescription("The message to go into your 100 Days of Coding update.")
                .setRequired(true)
        ),
    run: async (interaction) => {
        await interaction.deferReply();
        const { user } = interaction;
        const text = interaction.options;
        console.log("🚀 ~ file: oneHundred.ts ~ line 19 ~ run: ~ text", text)

        const targetCamper = await getCamperData(user.id);
        const updatedCamper = await updateCamperData(targetCamper);

        const oneHundredEmbed  = new EmbedBuilder();
        oneHundredEmbed.setTitle("100 Days of Coding Challenge");
        oneHundredEmbed.setDescription(text.message);
    }
};