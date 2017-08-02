const RichEmbed = require("discord.js").RichEmbed;
const Command = require("../command.js");
const config = require("../config.json");

module.exports = class extends Command {
    constructor(self) {
        super(self, {
            name: "embed",
        });

        this.self = self;
    }

    execute(message) {
        let content = message.content.slice(config.prefix.length + "embed".length);
        message.delete();

        let color = message.member ?
            parseInt(message.member.highestRole.hexColor.slice(1), 16) :
            parseInt(("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6), 16);

        let embed = new RichEmbed()
            .setDescription(content)
            .setColor(color);

        return message.channel.send({ embed: embed }).catch(err => {
            var embed = new RichEmbed().setDescription(err).setColor(color);
            message.channel.send({ embed: embed }).catch(console.log);
        });


        /*message.channel.sendMessage("", {
            "embed": {
                "description": content,
                "color": color
            }
        }).catch(err => message.channel.sendMessage("", {
            "embed": {
                "description": err,
                "color": 0xff0000
            }
        }));*/
    }
};
