let stfuid;
module.exports = {
	execute(message) {
		if (message.content.startsWith('!stfu')) {
			const words = message.content.split(' ');
			stfuid = words[1];
			if (stfuid == undefined) {
				const user = message.author;
				message.channel.send(`Need discord id ${user.username} :angry: :angry: `);
				return;
			}
			if (stfuid.length == 18) {
				message.react('👍');
				return;
			}
			if (isNaN(stfuid)) {
				const user = message.author;
				message.channel.send(`This is not a number! ${user.username} :angry: :angry: `);
				return;
			}
			else {
				const user = message.author;
				message.channel.send(`This is not a valid id! ${user.username} :angry: :angry: `);
				return;
			}
		}
		if (message.author.id == stfuid) {
			message.channel.send('stfu');
		}
	},
};
