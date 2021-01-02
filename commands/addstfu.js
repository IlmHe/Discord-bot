const fs = require('fs');
const path = require('path');

let rawData = fs.readFileSync(path.resolve('commands', 'jsonFiles', 'ids.json'));
let rawDataParsed = JSON.parse(rawData);

module.exports = {
	execute(message) {

		// If message starts with !addstfu
		// split the message
		// and make stfuId equal to the string of numbers after !addstfu.
		if (message.content.startsWith('!addstfu')) {
			const words = message.content.split(' ');
			const stfuId = words[1];

			//	If stfuId, is undefined, not 18 chars, or not a number,
			// send an error message back to the user.
			if (
				stfuId == undefined ||
        stfuId.length !== 18 ||
        isNaN(stfuId)
			) {
				message.reply('Not a valid discord id! :angry: :angry: ');
				return;
			}

			message.reply(':flushed:');

			rawData = fs.readFileSync(path.resolve('commands', 'jsonFiles', 'ids.json'));
			rawDataParsed = JSON.parse(rawData);

			// If ids.json doesnt include the discord id,
			// pushes new id to the end of the ids array in ids.json
			// and writes new id into ids.json asynchronously
			if (!rawDataParsed.ids.includes(stfuId)) {
				rawDataParsed.ids.push(stfuId);
				const idsData = JSON.stringify(rawDataParsed);
				const writePath = path.resolve('commands', 'jsonFiles', 'ids.json');
				fs.writeFileSync(writePath, idsData);

			}

			else {
				message.reply('Id already is in the list');
			}

			return;
		}

		rawData = fs.readFileSync(path.resolve('commands', 'jsonFiles', 'ids.json'));
		rawDataParsed = JSON.parse(rawData);

		//	If discord id is in ids.json, sends stfu to the same text channel
		if (rawDataParsed.ids.includes(message.author.id)) {
			message.channel.send('stfu');
		}
	},
};
