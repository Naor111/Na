module.exports = {
    name: "messageCreate",
    async execute(message) {
        if(message.author.bot) return;

        if (message.content.includes("https://") || message.content.includes("http://") || message.content.includes("discord.gg")) {
            message.delete();

            message.channel.send({ content: `${message.author}, don't attempt to send links or moderator may have to punish you! :(`});
        }

        if (message.content.includes("<@701488828946448464>") || message.content.includes("<@913764493211893760>") || message.content.includes("<@714774178372255745>")) {
            

            message.channel.send({ content: `${message.author}, don't attempt to ping one of the Directors or TreeBot or moderators may have to punish you! :(`});
        }

        if (message.content.includes("<@1082446327058808923>")) {
            

            message.channel.send({ content: `${message.author}, don't attempt to ping Lu or he will eat  you! :(`});
        }
    }
}