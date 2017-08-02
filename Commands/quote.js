const Command = require("../command.js");
const RichEmbed = require("discord.js").RichEmbed;

module.exports = class extends Command {
    constructor(self) {
        super(self, {
            name: "quote",
        });

        this.self = self;
    }

    execute(message) {
        let messageID = message.content.split(" ")[1];
        message.delete();
        message.channel.fetchMessage(messageID).then(message2 => {
            if (message2.channel.type == "text"){
                let embed = new RichEmbed()
                    .setTitle(`${message2.author.tag} | ${message2.author.id}`)
                    .setDescription(message2.content)
                    .setFooter(`${message2.guild.name} | ${message2.channel.name} | ${message2.createdAt}`)
                    .setColor(0x00adff);

                message.channel.send("", { embed });
            } else {
                let embed = new RichEmbed()
                    .setTitle(`${message2.author.tag} | ${message2.author.id}`)
                    .setDescription(message2.content)
                    .setFooter(`DMs | ${message2.createdAt}`)
                    .setColor(0x00adff);

                message.channel.send("", { embed });
            }
            
        }).catch(err => console.log(err));
    }
};