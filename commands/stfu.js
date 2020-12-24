const fs = require("fs");
let rawdata = fs.readFileSync("./ids.json");
let ids = JSON.parse(rawdata);
module.exports = {
  execute(message) {
    if (message.content.startsWith("!addstfu")) {
      const words = message.content.split(" ");
      let stfuid = words[1];
      if (
        stfuid == undefined ||
        stfuid.length !== 18 ||
        isNaN(stfuid) ||
        isNaN(stfuid)
      ) {
        const user = message.author;
        message.channel.send(`FUCK YOU ${user.username} :angry: :angry: `);
        return;
      }
      rawdata = fs.readFileSync("ids.json");
      ids = JSON.parse(rawdata);
      if (!ids.ids.includes(stfuid)) {
        ids.ids.push(stfuid);
        let idsdata = JSON.stringify(ids);
        fs.writeFileSync("ids.json", idsdata);
      } else {
        message.reply("Id already is in the list");
      }
      return;
    }
    rawdata = fs.readFileSync("./ids.json");
    ids = JSON.parse(rawdata);
    if (ids.ids.includes(message.author.id)) {
      message.channel.send("stfu");
    }
  },
};
