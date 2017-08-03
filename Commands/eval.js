const Command = require("../command.js");
const util = require("util");
const RichEmbed = require("discord.js").RichEmbed;

let moment = require('moment');

module.exports = class extends Command {
    constructor(self) {
        super(self, {
            name: "eval",
        });

        this.self = self;

        this.embed = function(input, output, error = false) {
            return new RichEmbed().setColor(error ? 0xFF0000 : 0x00FF00).addField("Input", input).addField(error ? "Error" : "Output", `\`\`\`${error ? "" : "js"}\n${output}\n\`\`\``).setFooter(`${this.self.user.username} Eval`);
        }
    }

    execute(message) {
        const code = message.content.slice(message.content.search(' ') + 1);
        if (!code.length) return message.channel.send('No code input.');

        if (code.match(/token/gi)) return message.channel.send("The input requests the user token.");

        if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')){
            try {
                return message.edit(`\`INPUT:\`\n\`\`\`\n${code}\n\`\`\`\n\`OUTPUT:\`\n\`\`\`\n${eval(code)}\n\`\`\``);
            } catch(err) {
                return message.edit(`\`INPUT:\`\n\`\`\`\n${code}\n\`\`\`\n\`ERROR:\`\n\`\`\`\n${err}\n\`\`\``);
            }
        }

        try {
            let after = eval(code);

            if (after instanceof Promise) {
                after.then(a => {
                    return message.edit("", { embed: this.embed(code, a instanceof Object ? util.inspect(a, { depth: 0 }) : a) });
                }).catch(err => {
                    return message.edit("", { embed: this.embed(code, err, true) });
                });
            } else {
                return message.edit("", { embed: this.embed(code, after instanceof Object ? util.inspect(after, { depth: 0 }) : after) });
            }
        } catch(err) {
            return message.edit("", { embed: this.embed(code, err, true) });
        }
    }
};
