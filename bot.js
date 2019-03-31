// work tbh

const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
let xp = require("./xp.json");
let oxp = require("./oxp.json");
let purple = 0x5b5b5b
let purple2 = 0xdbdbdb
let purple3 = 0xa580cc
let purple4 = 0x54ff76
const talkedRecently = new Set();

client.on('ready', () => { 
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ game: { name: client.users.size + " users. (==help)", type: 3 } });
});

let prefix = "==";

client.on('message', msg => {

if (msg.content === prefix + "help") {
  const embed = new Discord.RichEmbed()
  .setColor(0x8b3cff)
  .setTitle("Wow you actually did that...?")
  .setDescription("You're cool, I like you.")
  msg.channel.send({embed})
}

});

client.login(process.env.BOT_TOKEN);
