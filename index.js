const klaw = require('klaw');
const path = require('path');
const { Client, Collection } = require('discord.js');

const commandsPath = path.join(__dirname, "commands");

new class extends Client {
    constructor() {
        super();

        this.config = require('./config.json');

        this.commands = new Collection();

        this.init();

        this.on('ready', () => {
            console.log(`Client Information:\nUser: ${this.user.tag}\nUser ID: ${this.user.id}\nGuilds: ${this.guilds.size}\nChannels: ${this.channels.size}`);
        });

        this.on('message', message => {
            if (!message.author.id === this.user.id) return;
            if (!message.content.startsWith(this.config.prefix)) return;

            const content = message.content.slice(this.config.prefix.length);

            const command = this.commands[content.split(' ')[0]];
            if (!command) return;

            command.execute(message);
        });

        this.login(this.config.token);
    }

    init() {
        klaw(commandsPath).on("data", item => {
            let file = path.parse(item.path);
            if (!file.ext || file.ext !== ".js") return;

            let command = new (require(`${file.dir}/${file.base}`))(this);
            this.commands.set(command.name, command);
        });
    }
};