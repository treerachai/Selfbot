const Discord = require("discord.js");
const self = new Discord.Client();
const fs = require("fs-extra-promise");
const path = require("path");
const commandsPath = path.join(__dirname, "Commands");

const config = require("./config");

const commands = new Object();

function loadCommands() {
    fs.walk(commandsPath).on("data", item => {
        let file = path.parse(item.path);
        if (!file.ext || file.ext !== ".js") return;

        let command = new (require(`${file.dir}/${file.base}`))(self);
        commands[command.name] = command;
    });
}

self.on('ready', () => {
    console.log('Client Connected');
});

self.on('reconnecting', () => {
    console.log('Client Reconnecting');
});

self.on('message', message => {
    if (message.author.id !== self.user.id) return;
    if (!message.content.startsWith(config.prefix)) return;

    const content = message.content.slice(config.prefix.length);

    const command = commands[content.split(' ')[0]];
    if (!command) return;

    command.execute(message);
});

loadCommands();
self.login(config.token);
