const fs = require('fs');
//	The fs module enables interacting with the file system in a way modeled on standard POSIX functions.
const path = require('path');
//	The path module provides utilities for working with file and directory paths
let rawdata = fs.readFileSync(path.resolve('commands', 'jsonFiles', 'ids.json'));
// Find the correct ids.json file
let rawdataparsed = JSON.parse(rawdata);
//	Converts it to ASCII text, and parses the actual JSON data in to a JavaScript object.
module.exports = {
	execute(message) {
		if (message.content.startsWith('!addstfu')) {
			const words = message.content.split(' ');
			const stfuid = words[1];
			// If message starts with !addstfu, split the message and make stfuid equal to the string of numbers after !addstfu.
			if (
				stfuid == undefined ||
        stfuid.length !== 18 ||
        isNaN(stfuid)
			) {
				message.reply('Not a valid discord id! :angry: :angry: ');
				return;
				//	If stfuid, is undefined, not 18 chars, or not a number, send an error message back to the user.
			}
			rawdata = fs.readFileSync(path.resolve('commands', 'jsonFiles', 'ids.json'));
			rawdataparsed = JSON.parse(rawdata);
			if (!rawdataparsed.ids.includes(stfuid)) {
				//	If ids.json doesnt include the discord id
				rawdataparsed.ids.push(stfuid);
				//	Pushes new id to the end of the ids array in ids.json
				const idsdata = JSON.stringify(rawdataparsed);
				//	Stringify method converts a JavaScript object or value to a JSON string
				const writepath = path.resolve('commands', 'jsonFiles', 'ids.json');
				fs.writeFileSync(writepath, idsdata);
				// Writes new id into ids.json asynchronously
			}
			else {
				message.reply('Id already is in the list');
			}
			return;
		}
		rawdata = fs.readFileSync(path.resolve('commands', 'jsonFiles', 'ids.json'));
		rawdataparsed = JSON.parse(rawdata);
		if (rawdataparsed.ids.includes(message.author.id)) {
			message.channel.send('stfu');
			//	If discord id is in ids.json, sends stfu to the same text channel
		}
	},
};
