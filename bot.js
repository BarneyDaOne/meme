// work tbh

const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => { 
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ game: { name: client.users.size + " users. (==help)", type: 3 } });
  client.user.setUsername("Yoit");
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
