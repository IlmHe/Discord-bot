const fs = require('fs');
const Discord = require('discord.js');

//	Checks config.json for token
const {
	token,
} = require('./config.json');

const client = new Discord.Client();

//	Looks for commands folder and filters all files that end with .js
const commandnames = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//	Loops through all the .js files in commands, to see which can be executed
for (const file of commandnames) {
	const command = require(`./commands/${file}`);

	// When the client is ready, run this code
	// This event will only trigger one time after logging in
	client.once('ready', () => {
		console.log('Ready!');
	});


	client.on('message', message => {
		if (message.author.bot) return;

		//	Runs the function in all of the command .js files
		command.execute(message);

	});

}
client.login(token);
