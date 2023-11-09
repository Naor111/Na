const { Client, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, Embed } = require("discord.js");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Mute a member from the server.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption(option =>
        option.setName("target")
        .setDescription("Select the user you wish to mute.")
        .setRequired(true)
        )

    .addStringOption(option => 
        option.setName("time")
        .setDescription("How long should the mute last? e.g. 10s, 10m, 10h,10d")
        .setRequired(true)
        )

        .addStringOption(option =>
            option.setName("reason")
            .setDescription("What is the reason for the mute?")
            .setRequired(false)
            ),
            
            async execute(interaction) {
                const {guild, options} = interaction;

                const user = options.getUser("target");
                const member = guild.members.cache.get(user.id);
                const time = options.getString("time");
                const convertedTime = ms(time);
                const reason = options.getString("reason") || "No reason provided";

                const errEmbed = new EmbedBuilder()
                    .setDescription('Something went wrong. Please try again later.')
                    .setColor(0xc72c3b)

                const succesEmbed = new EmbedBuilder()
                .setTitle("**:white_check_mark: Muted**")
                .setDescription(`Succesfully muted ${user}.`)
                .addFields(
                    { name: "Reason", value: `${reason}`, inline: true},
                    { name: "Duration", value: `${time}`, inline: true}
                )
                .setColor(0x5fb041)
                .setTimestamp();

                if (member.roles.highest.position >= interaction.member.roles.highest.position)
                return interaction.reply({ embeds: [errEmbed], ephemeral: true});

                if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
                    return interaction.reply({ embeds: [errEmbed], ephemeral: true});
                
                if (!convertedTime)
                    return interaction.reply({ embeds: [errEmbed], ephemeral: true});

                try{
                    await member.timeout(convertedTime, reason);

                    interaction.reply({ embeds: [succesEmbed], ephemeral: true });
                } catch (err ) {
                    console.log(err);
                }
            }
} 