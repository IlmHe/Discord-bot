const fs = require('fs');
const Discord = require('discord.js');
const {
	token,
} = require('./config.json');

const client = new Discord.Client();

const commandnames = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandnames) {
	const command = require(`./commands/${file}`);

	client.once('ready', () => {
		console.log('Ready!');
	});

	client.on('message', message => {
		if (message.author.bot) return;

		command.execute(message);

	});

}
client.login(token);
