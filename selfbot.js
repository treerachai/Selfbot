var myToken = ""

var Discord = require('discord.js)
var self = new Discord.Client()
self.login(myToken)
self.on("ready", () => {console.log("Connected!")})
self.on("reconnecting", () => {console.log("Reconnecting!")})

var list = {
    "ping": message => {
        message.channel.sendMessage("Pinging...")
            .then(msg => {
                message.delete()
                msg.edit(`Pong! \`Took ${msg.timestamp - message.timestamp}ms\``)
            })
    },
    "eval": message => {
        var code = message.content.slice("self:eval ".length)
        try {
            message.edit(`\`INPUT:\`\n\`\`\`${code}\`\`\`\n\`OUTPUT:\`\n\`\`\`${eval(code)}\`\`\``)
        } catch(err) {
            message.edit(`\`INPUT:\`\n\`\`\`${code}\`\`\`\n\`ERROR:\`\n\`\`\`${err}\`\`\``)
        }
    }
}

self.on("message", message => {
    if (message.author.id !== self.user.id) return; // Make sure only you can use the bot
    if (!message.content.startsWith("self:")) return; // Make sure it is a command
    var command = list[message.content.split(" ")[0].substring(5)]; // Get the command
    if (!command) return; // Check to see if it is a command
    command(message); // Run the command
});
