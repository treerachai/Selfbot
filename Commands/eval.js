const Command = require("../command.js");

module.exports = class extends Command {
    constructor(self) {
        super(self, {
            name: "eval",
        });

        this.self = self;
    }

    execute(message) {
        const code = message.content.slice(message.content.search(' ') + 1);
        if (!code.length) return message.channel.sendMessage('No code input.');

        try {
            message.edit(`\`INPUT:\`\n\`\`\`\n${code}\n\`\`\`\n\`OUTPUT:\`\n\`\`\`\n${eval(code)}\n\`\`\``);
        } catch(err) {
            message.edit(`\`INPUT:\`\n\`\`\`\n${code}\n\`\`\`\n\`ERROR:\`\n\`\`\`\n${err}\n\`\`\``);
        }
    }
};
