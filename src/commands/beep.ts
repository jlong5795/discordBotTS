import { SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("beep")
        .setDescription("Replies with Boop!"),
    async execute(interaction: any) {
        await interaction.reply("Boop!");
    }
};