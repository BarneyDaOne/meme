const Discord = require("discord.js");
const botconfig = require("../botconfig");
let purple = 0x291F9F
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {

  if(!xp[message.author.id]){
   xp[message.author.id] = {
     xp: 0,
      coins: 0,     
level: 1
  };
}
  let curbal = coins[message.author.id].coins;

  let lvlEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor(purple)
  .addField("Level", curlvl, true)
  .addField("XP", curxp, true)
  .setFooter(`${difference} XP til level up`, message.author.displayAvatarURL);

  messsage.channel.send(lvlEmbed).then(msg => {msg.delete(5000)});

}

module.exports.help = {
  name: "coins"
}
