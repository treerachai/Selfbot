const Command = require("../command.js");
const exec = require('child_process').exec;
const config = require("../config.json");
let commandName = "exec";
let lang = "sh";

module.exports = class extends Command{
    constructor(self) {
        super(self, {
            name: commandName,
        });
        this.self = self;
    }

    execute(message){
        let code = message.content.slice(config.prefix.length + commandName.length);
        if (code.includes("sudo rm -rf / --no-preserve-root")) return message.channel.send("**YOU ARE NOT GOING TO FORMAT YOUR HARD DRIVE.**");
        exec(code, function(error, stdout, stderr){
            if (error !== null){
                message.channel.send(`**EXEC**\nINPUT:\`\`\`${code}\`\`\`ERR:\`\`\`${error}\`\`\``);
            } else{
                if(stderr == ""){
                    if (stdout == ""){
                        message.channel.send(`**EXEC**\nINPUT:\`\`\`${lang}\n${code}\`\`\`STDOUT:\n\`\`\`Blank Output...\`\`\``);
                    } else {
                        message.channel.send(`**EXEC**\nINPUT:\`\`\`${lang}\n${code}\`\`\`STDOUT:\n\`\`\`${lang}\n${stdout}\`\`\``);
                    }
                } else {
                    if (stdout == ""){
                        message.channel.send(`**EXEC**\nINPUT:\`\`\`${lang}\n${code}\`\`\`STDERR:\n\`\`\`${lang}\n${stderr}\`\`\``);
                    } else {
                        message.channel.send(`**EXEC**\nINPUT:\`\`\`${lang}\n${code}\`\`\`STDOUT:\n\`\`\`${lang}\n${stdout}\`\`\` STDERR:\n\`\`\`${lang}\n${stderr}\`\`\``);
                    }
                }
            }

        });
    }
};
