// Inital Requiring
const Discord = require('discord.js');
const self = new Discord.Client();

// Variables
const myToken = '  Y  o  u  r     T  o  k  e  n     H  e  r  e  ';
const prefix = 'self:';

// Create commands
const commands = {
    'ping': message => {
        message.channel.sendMessage('`SELF:` Pinging...')
            .then(msg => {
                message.delete();
                msg.edit(`\`SELF:\` Pong! \`Took ${msg.timestamp - message.timestamp}ms\``);
            });
    },
    'restart': message => {
        // You must be using pm2 for this to work correctly
        message.edit('`SELF:` Restarting!')
            .then(() => process.exit());
    },
    'eval': (message, newContent) => {
        const code = newContent.slice(newContent.search(' ') + 1);
        if (!code.length) return message.reply('there\'s no code!');
        try {
            message.edit(`\`INPUT:\`\n\`\`\`\n${code}\n\`\`\`\n\`OUTPUT:\`\n\`\`\`\n${eval(code)}\n\`\`\``);
        } catch(err) {
            message.edit(`\`INPUT:\`\n\`\`\`\n${code}\n\`\`\`\n\`ERROR:\`\n\`\`\`\n${err}\n\`\`\``);
        }
    }
};

// Receivers
self.on('ready', () => {
    console.log('Hey, I\'m ready to take commands!');
});

self.on('reconnecting', () => {
    console.log('Oh no! I disconnected from Discord. I\'m attempting to reconnect.');
});

self.on('message', message => {
    if (!message.author.equals(self.user)) return; // Just to be sure the author is the self bot
    if (!message.content.startsWith(prefix)) return; // Just to make sure a command is being used

    const content = message.content.slice(prefix.length);

    const command = commands[content.split(' ')[0]];
    if (!command) return message.edit('`ERROR:` Invalid Command');
    command(message, content);
});

// Initiate logging in to the bot
self.login(myToken);
