const path = require('path');
const fs = require('fs');
try {
	const rawData = fs.readFileSync(path.resolve('commands', 'jsonFiles', 'ids.json'));
	const rawDataParsed = JSON.parse(rawData);
}

catch {
	fs.openSync('ids.json', 'w');
}

module.exports = {
	execute(message) {

		// If message starts with !addstfu
		// split the message
		// and make stfuId equal to the string of numbers after !removestfu.
		if (message.content.startsWith('!removestfu')) {
			rawData = fs.readFileSync(path.resolve('commands', 'jsonFiles', 'ids.json'));
			rawDataParsed = JSON.parse(rawData);

			const words = message.content.split(' ');
			const stfuId = words[1];

			// Checks if valid discord id
			if (
				stfuId == undefined ||
                stfuId.length !== 18 ||
                isNaN(stfuId)
			) {
				message.channel.send('Not a valid discord id! :angry: :angry: ');
				return;
			}

			// Removes discord id from ids.json, then replies to user
			rawDataParsed.ids = rawDataParsed.ids.filter(item => item !== stfuId);
			const idsData = JSON.stringify(rawDataParsed);
			const writePath = path.resolve('commands', 'jsonFiles', 'ids.json');
			fs.writeFileSync(writePath, idsData);
			message.reply(':angry:');
		}
	},
};
