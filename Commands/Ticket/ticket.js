const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, Embed, Guild } = require("discord.js");
const ticketSchema = require("../../Models/Ticket");
const { execute } = require("./ticketsetup");

module.exports = {
    data: new SlashCommandBuilder()
            .setName("ticket")
            .setDescription("Ticket actions")
            .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
            .addStringOption(option => 
                option
                    .setName("action")
                    .setDescription("Add or remove members from the ticket.")
                    .setRequired(true)
                    .addChoices(
                        { name: "Add", value: "add"},
                        { name: "Remove", value: "remove"}
                    )
            )
            .addUserOption(option =>
                option.setName("member")
                .setDescription("Select a member from the discord server to perform the action on.")
                .setRequired(true)
            ),

            async execute(interaction) {
                const {guild, options, channel} = interaction;

                const action = options.getString("action");
                const member = options.getUser("member");

                const embed = new EmbedBuilder()

                switch (action) {
                    case "add":
                        ticketSchema.findOne({GuildID: guildId, ChannelID: channel.id }, async (err,data) => {
                            if (err) throw err;
                            if (!data)
                                return interaction.reply({ embeds: [embed.setColor("Red").setDescription("Something went wrong. Please Try again later.")], ephemeral: true });

                            if (!data.MembersID.includes(member.id))
                                return interaction.reply({ embeds: [embed.setColor("Red").setDescription("Something went wrong. Please Try again later.")], ephemeral: true });

                            data.MembersID.remove(member.id);

                            channel.permissionOverwrites.edit(member.id, {
                                SendMessages: false,
                                ViewChannels: false,   
                                ReadMessageHistory: false
                            });

                            interaction.reply({ embeds: [embed.setColor("Green").setDescription(`${member} has been removed from the ticket.`)] });

                            data.save();
                        });
                        break;
                }
            }
}