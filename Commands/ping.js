const Command = require("../command.js");

module.exports = class extends Command {
    constructor(self) {
        super(self, {
            name: "ping",
        });

        this.self = self;
    }

    execute(message) {
        message.channel.sendMessage(`Self Pinging...`).then(msg => {
            msg.edit(`Self Pong! | Took ${msg.createdTimestamp - message.createdTimestamp}ms`);
        });
    }
};
