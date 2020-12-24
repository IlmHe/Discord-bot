const fs = require("fs");
let rawcock = fs.readFileSync("./cock.json");
let cock = JSON.parse(rawcock);
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
      rawcock = fs.readFileSync("cock.json");
      console.log(rawcock);
      cock = JSON.parse(rawcock);
      console.log(cock);
      if (!cock.cocks.includes(stfuid)) {
        cock.cocks.push(stfuid);
        let cockdata = JSON.stringify(cock);
        fs.writeFileSync("cock.json", cockdata);
      } else {
        message.reply("FUCK YOU NIGGA");
      }
      return;
    }
    rawcock = fs.readFileSync("./cock.json");
    cock = JSON.parse(rawcock);
    if (cock.cocks.includes(message.author.id)) {
      message.channel.send("stfu");
    }
  },
};
