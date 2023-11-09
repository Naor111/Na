const {SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription("Kick a user from the server")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption(option => 
        option.setName("target")
        .setDescription("User to be kicked")
        .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
            .setDescription("Reason for the kick")
            ),

            async execute (interaction) {
                const {channel, options} = interaction;

                const user = options.getUser("target");
                const reason = options.getString("reason");

                const member = await interaction.guild.members.fetch(user.id);

                const errEmbed = new EmbedBuilder()
                .setDescription(`You can't take action against ${user.username} since they have a higher role.`)
                .setColor(0xc723b)

                if (member.roles.highest.position >= interaction.member.roles.highest.position)
                return interaction.reply({ embeds: [errEmbed], ephemeral: true});

                await member.kick(reason);

                const embed = new EmbedBuilder()
                .setTitle("🔨・Kick")
                .setDescription(`Succesfully kicked ${user} with reason: ${reason}`)
                .addFields(
                    {
                        name: "👤┆Kicked by",
                        value: interaction.user.tag,
                        inline: true
                    },
                    {
                        name: "💬┆Reason",
                        value: reason,
                        inline: true
                    })
                .setTimestamp()

                await interaction.reply({
                    embeds: [embed],
                });
            }
}