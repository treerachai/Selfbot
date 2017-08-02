const Command = require("../command.js");

module.exports = class extends Command {
    constructor(self) {
        super(self, {
            name: "ping",
        });

        this.self = self;
    }

    execute(message) {
        message.channel.send(`Self Pinging...`).then(msg => {
            msg.edit(`Pong! | Client Ping: ${msg.createdTimestamp - message.createdTimestamp}ms | API Latency: ${this.self.ping}ms`);
        });
    }
};
