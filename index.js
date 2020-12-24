const fs = require('fs');
//	The fs module enables interacting with the file system in a way modeled on standard POSIX functions.
const Discord = require('discord.js');
//	Imports node module discord.js
const {
	token,
} = require('./config.json');
//	Checks config.json for token
const client = new Discord.Client();
// Create a new Discord client

const commandnames = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
//	Looks for commands folder and filters all files that end with .js

for (const file of commandnames) {
	const command = require(`./commands/${file}`);
	//	Loops through all the .js files in commands, to see which can be executed

	client.once('ready', () => {
		console.log('Ready!');
	});
	// When the client is ready, run this code
	// This event will only trigger one time after logging in

	client.on('message', message => {
		//	Whenever a message is sent inside a channel this bot has access to, the message is checked by the bot for possible commands etc
		if (message.author.bot) return;
		// If the message is sent by a bot, ignore it

		command.execute(message);
		//	Runs the function in all of the command .js files
	});

}
client.login(token);
// login to Discord with your app's token
