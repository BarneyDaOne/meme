// work tbh

const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
let xp = require("./xp.json");
let oxp = require("./oxp.json");
let purple = 0xF291F9
const talkedRecently = new Set();

client.on('ready', () => {
  client.user.setUsername("Espresso"); 
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ game: { name: ' only Potapo', type: 3 } });
});

let prefix = ";"

client.on('message', msg => {

let item = msg;
  
/*if (msg.content === prefix + "help") {
  const embed = new Discord.RichEmbed()
  .setColor(0xa7ffab)
  .setDescription("Woah! You somehow managed to make old man Esppresso give you a help manual!")
  .addField("General Cafe Commands", "• ;xp - Check your cafe's xp.\n• ;rent-cafe - Rent a cafe to earn some Espre-coins\n• ;cafe - Take a look at your current cafe's stats and how it looks.\n• ;buy - Take a look or buy products to boost your earnings!")
  .addField("Other Commands", "• ;invite - Invite old man Esppresso to a server.")
  msg.channel.send({embed});
}*/

/*if (msg.content.startsWith(prefix + "avatar")) {
  if (msg.mentions.users.size === 1) {
    const embed = new Discord.RichEmbed()
    .setColor(0x1F98b1)
    .addField(msg.mentions.members.first().user.username, "This is their avatar.")
    .setImage(msg.mentions.members.first().user.avatarURL)
    msg.channel.send({embed})
  } else if (msg.mentions.users.size === 0) {
    const embed = new Discord.RichEmbed()
    .setColor(0x1F98b1)
    .addField(msg.author.username, "This is your avatar.")
    .setImage(msg.author.avatarURL)
    msg.channel.send({embed})
  }
}*/

if (msg.content === prefix + "invite") {
  msg.channel.send("https://discordapp.com/api/oauth2/authorize?client_id=419229555857817601&permissions=8&scope=bot");
}

let xpAdd = 13;
console.log(xpAdd);
let xpAd = 13;
console.log(xpAdd);
let xpRandom = 1000;
console.log(xpAdd);

if(!xp[item.author.id]){
  xp[item.author.id] = {
    xp: 0,
    level: 1,
    oxp: 0,
    cafe: 0,
    coins: 0,
    cpm: 15
};
}

let curxp = xp[item.author.id].xp;
let hiddenxp = xp[item.author.id].oxp;
let curlvl = xp[item.author.id].level;
let nxtLvl = xp[item.author.id].level * 120;
let dispLvl = xp[item.author.id].level + 1;
let curcoins = xp[item.author.id].coins;
let curcpm = xp[item.author.id].cpm;

if (xp[item.author.id].cafe !== 0) {
talkedRecently.add(item.author.id);
setTimeout(() => {
  // Removes the user from the set after 25 seconds
  xp[item.author.id].xp = curxp += xpAdd;
  xp[item.author.id].oxp = hiddenxp += xpAd;

  xp[item.author.id].coins = curcpm += curcoins;  

  talkedRecently.delete(item.author.id);
}, 25000);
}
/*if (msg.content === prefix + "daily") {
  talkedRecently.add(item.author.id).then(msg => {msg.reply("ok")})  
  setTimeout(() => {
    // Removes the user from the set after 25 seconds
   xp[item.author.id].xp = curxp += xpRandom;
   talkedRecently.delete(item.author.id);
  }, 86400000);
}*/

if (nxtLvl < xp[item.author.id].oxp) {
  xp[item.author.id].oxp -= hiddenxp;

  xp[item.author.id].level += curlvl + 1;

  xp[item.author.id].cpm += curcpm * 0.5;

  xp[item.author.id].coins += curcoins + 200;

  const embed = new Discord.RichEmbed()
  .setTitle("Level Up!")
  .setDescription("New Level : " + dispLvl)
  .setColor(0x81ffa2)
  .setFooter("200 Espre-coins added to your current balance, your cpm has now been boosted.")
  item.channel.send({embed}).then(msg => {msg.delete(50000)});
}

fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
  if(err) console.log(err)
});

fs.writeFile("./oxp.json", JSON.stringify(oxp), (err) => {
  if(err) console.log(err)
});

if (item.content === prefix + "xp") {
  if (xp[item.author.id].cafe !== 0) {
   const embed = new Discord.RichEmbed()
   .setColor(0x81ffa2)
   .addField("Cafe Level", curlvl, true)
   .addField("Cafe XP", hiddenxp + "/" + nxtLvl + " (" + curxp + " tot.)", true)
   .addField("XP Needed", nxtLvl, true)
   .setAuthor(item.author.username + "'s Cafe XP")
   item.channel.send({embed})
  } else if (xp[item.author.id].cafe === 0) {
    msg.channel.send("⛔ You need to **rent** a cafe! use `;rent-cafe`")
  }
}

/*if (item.content === prefix + "coins") {
  const embed = new Discord.RichEmbed()
  .setColor(0x481faf1)
  .addField(msg.author.username + "'s coins", "**CPM (Coins per message) : " + xp[item.author.id].cpm)
  msg.channel.send({embed})
}*/

if (item.content === prefix + "rent-cafe") {
   if (xp[item.author.id].cafe === 0) {
    xp[item.author.id].cafe = 1;
    msg.channel.send("Congrats " + msg.author.username + ", You've just bought a cafe! Use ;cafe to check out your new cafe!")
   } else if (xp[item.author.id].cafe !== 0) {
      msg.channel.send("⛔ You **can't** rent more then 1 cafe!")
   }
}

if (item.content === prefix + "cafe") {
  if (xp[item.author.id].cafe === 1) {
    const embed = new Discord.RichEmbed()
    .setImage("https://cdn.discordapp.com/attachments/464447104488833024/465162817381728276/cafe1-u.png")
    .addField(msg.author.username + "'s cafe", "💸 **CPM** : " + xp[item.author.id].cpm + "\n💰 **Coins** : " + xp[item.author.id].coins)
    .setFooter("Your first cafe! Yeah... Not the most appealing cafe but atleast you got one for free! CPM means Coins per message.")
    msg.channel.send({embed});
  } else if (xp[item.author.id].cafe === 2) {
    const embed = new Discord.RichEmbed()
    .setImage("https://cdn.discordapp.com/attachments/464447104488833024/465206966646603796/cafe2-u.png")
    .addField(msg.author.username + "'s cafe", "💸 **CPM** : " + xp[item.author.id].cpm + "\n💰 **Coins** : " + xp[item.author.id].coins)
    .setFooter("Your first cafe! You've already made your first purchase, that's great! CPM means Coins per message.")
    msg.channel.send({embed});
  } else if (xp[item.author.id].cafe === 3) {
    const embed = new Discord.RichEmbed()
    .setImage("https://cdn.discordapp.com/attachments/464447104488833024/465208922169671680/cafe3-u.png")
    .addField(msg.author.username + "'s cafe", "💸 **CPM** : " + xp[item.author.id].cpm + "\n💰 **Coins** : " + xp[item.author.id].coins)
    .setFooter("Your first cafe! You've already made your second purchase, that's super great! CPM means Coins per message.")
    msg.channel.send({embed});
  } else if (xp[item.author.id].cafe === 0) {
    msg.channel.send("⛔ You need to **rent** a cafe! use `;rent-cafe`")
  }
}

if (item.content.startsWith(prefix + "buy")) {
  if (item.content === prefix + "buy") {
    const embed = new Discord.RichEmbed()
    .setTitle("Item Menu")
    .setDescription("`1` 🥂 **Electronic Coffee Maker** : 50 Espre-coins | 0.8x more CPM\n`2` ✨ **Clean Items** : 100 Espre-coins | 1.3x more CPM")    
    msg.channel.send({embed});
  } else if (item.content === prefix + "buy 1") {
    if (xp[item.author.id].coins > 50) {
      xp[item.author.id].coins -= curcoins - 50;
      xp[item.author.id].cafe += 1;
      xp[item.author.id].cpm += curcpm * 0.5;
      const embed = new Discord.RichEmbed()
      .setTitle("Thank you for your purchase! You'll earn more money in no time!")
      .setDescription("The **Electronic Coffee Maker** has been added to your cafe.")
      msg.channel.send({embed});
    } else if (xp[item.author.id].coins < 50) {
      msg.channel.send("⛔ **Insufficient funds!** You currently have " + xp[item.author.id].coins + " and you need 50 coins to purchase this item!")
    }
  } else if (item.content === prefix + "buy 2") {
    if (xp[item.author.id].coins > 100) {
      xp[item.author.id].coins -= curcoins - 100;
      xp[item.author.id].cafe += 1;
      xp[item.author.id].cpm += curcpm * 1.0;
      const embed = new Discord.RichEmbed()
      .setTitle("Thank you for your purchase! You'll earn more money in no time!")
      .setDescription("Your items are now **Clean Items** in your cafe.")
      msg.channel.send({embed});
    } else if (xp[item.author.id].coins < 100) {
      msg.channel.send("⛔ **Insufficient funds!** You currently have " + xp[item.author.id].coins + " and you need 100 coins to purchase this item!")
    }
  }
}

if (msg.content === prefix + "announce") {
  msg.delete();

  const embed = new Discord.RichEmbed()
  .setColor(0xffe494)
  .setTitle("Semi-Announcement")
  .addField("I was made by yer boss, Potapo.", "Just letting you know.")
  msg.channel.send({embed});
}

let warned = msg.mentions.members.first().user.username;
let args = msg.content.split(" ").slice(1);

/*if (msg.content.startsWith(prefix + "warn")) {
  msg.delete();

  const embed = new Discord.RichEmbed()
  .setColor(0xff4d4f)
  .setTitle("⚠ **Member Warned** ⚠")
  .addField(`Warn Reciever : ${warned}\nWarn Placer : ${msg.author.username}\nReason : ${args.slice(1).join(" ")}`)
  msg.channel.send({embed});
}*/

if (msg.content.startsWith(prefix + "warn")) {
  msg.delete();

  const embed = new Discord.RichEmbed()
  .setColor(0xff4d4f)
  .setTitle("⚠ **User Warned** ⚠")
  .setDescription("User : " + msg.mentions.members.first().user.username + " \nWarn Giver : " + msg.author.username + " \nReason : " + args.join(" "))
  msg.channel.send({embed});
}

});

client.login(process.env.BOT_TOKEN);
