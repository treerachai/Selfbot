# Discord Selfbot

## About
This selfbot was created by HyperCoder#2975. It features some simple commands, but a powerful command handler to allow for further expansion.

## Installation
```
npm install
```

## Default Commands
### ping
Returns: `Message ping`
Returns: `API Latency`

Sends a message showing message ping and API Latency.

```
me.ping
```

### quote
Returns: `Quote Information Embed`

`options`
*  Message ID : ID of the message to be quoted

Sends an embed that contains information and content regarding the given message ID.

```
me.quote 334106075374682124
```

### embed
Returns: `Embed`

`options`
*  Text : Text to be embedded

Sends an embed containing the given text.

```
me.embed This is a sentence.
```

### eval
Returns: `Evaluated JavaScript`

`options`
*  JavaScript : JS to be evaluated

Evaluates raw JavaScript.

```
me.eval message.guild.channels.filter(c => c.type == "text").map(c => c.name).join("\n")
```

### exec
Returns: `Result of Executed Command`

`options`
*  Command : Command to be executed

Executes given command in OS's shell.

```
me.exec dir
```