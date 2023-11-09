const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Pong")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), //Only Admins can use this
        execute(interaction) {
            interaction.reply({content: "Pong.", ephermal: false})  // Only visible for myself. (ephermal)
        },
};