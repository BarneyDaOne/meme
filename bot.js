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
  client.user.setPresence({ game: { name: client.users.size + " users. (y-help)", type: 3 } });
});

let prefix = "y-"

client.on('message', msg => {

let item = msg;

if (msg.content === prefix + "help") {
  const embed = new Discord.RichEmbed()
  .setColor(0x8b3cff)
  .setTitle("Where shall the list to be sent?")
  .setDescription("**y-help here** or **y-help dm**")
  msg.channel.send({embed})
}

if (msg.content === prefix + "help dm") {
  msg.react("🆗")
  
  const embed = new Discord.RichEmbed()
  .setColor(0x8b3cff)
  .addField("Moderation", "y-warn, y-warn @<user> <reason>\ny-kick, y-kick @<user> <reason>\ny-ban, y-ban @<user> <reason>")
  .addField("Informantion", "y-help, y-help here or y-help dm\ny-avatar, y-avatar @<user> (Leave it blank to see your avatar)")
  .addField("Fun", "*none yet*")
  .addField("Other", "*none yet*")
  msg.author.send({embed})
} else if (msg.content === prefix + "help here") {
  const embed = new Discord.RichEmbed()
  .setColor(0x8b3cff)
  .addField("Moderation", "y-warn, y-warn @<user> <reason>\ny-kick, y-kick @<user> <reason>\ny-ban, y-ban @<user> <reason>")
  .addField("Informantion", "y-help, y-help here or y-help dm\ny-avatar, y-avatar @<user> (Leave it blank to see your avatar)")
  .addField("Fun", "*none yet*")
  .addField("Other", "*none yet*")
  .setFooter("This message will be deleted in 30 seconds after being sent to prevent spam.")
  msg.channel.send({embed}).then(msg => {msg.delete(30000)})
}

let args = msg.content.split(" ").slice(1);
let args2 = msg.content.split(" ").slice(2);

if (msg.content.startsWith(prefix + "warn")) {
  msg.delete();

  const embed = new Discord.RichEmbed()
  .setColor(0xff4d4f)
  .setTitle("⚠ **User Warned** ⚠")
  .setDescription("User : " + msg.mentions.members.first().user.username + " \nWarn Giver : " + msg.author.username + " \nReason : " + args2.join(" "))
  msg.channel.send({embed});
}

if (item.content.startsWith(prefix + "kick")) {
  msg.delete();
  
  if (!item.member.hasPermissions('KICK_MEMBERS')) return item.reply("You dont have the Permission <KICK-MEMBERS>");
  if (!item.guild.member(client.user).hasPermissions('KICK_MEMBERS')) return item.reply("I dont have the Permission to kick Members");
  let toKick = item.mentions.members.first() || item.guild.members.get(args[0]);
  if (!toKick) return item.reply("Please mention a Member to Kick, or provide their Client ID");
  let reason = args.slice(1).join(' ');
  if (!reason) reason = 'No reason provided';
  if (!toKick.kickable) return item.reply('This member isnt kickable');

  toKick.kick({reason: reason});

  const embed = new Discord.RichEmbed()
  .setColor(0xa23d3d)
  .setTitle("⛔ **User Kicked** ⛔")
  .setDescription("User : " + toKick.user.username + " \nKick Placer : " + msg.author.username + " \nReason : " + reason)
  item.channel.send({embed});
}

// Ban
if (item.content.startsWith(prefix + "ban")) {
  msg.delete()

  if (!item.member.hasPermissions('BAN_MEMBERS')) return item.reply("You dont have the Permission <BAN-MEMBERS>");
  if (!item.guild.member(client.user).hasPermissions('BAN_MEMBERS')) return item.reply("I dont have the Permission to Ban Members");
  let toBan = item.mentions.members.first() || item.guild.members.get(args[0]);
  if (!toBan) return item.reply("Please mention a Member to Ban, or provide their Client ID");
  let reason = args.slice(1).join(' ');
  if (!reason) reason = 'No reason provided';
  if (!toBan.bannable) return item.reply('This member isnt bannable');

  toBan.ban({reason: reason});

  const embed = new Discord.RichEmbed()
  .setColor(0x501111)
  .setTitle("‼ **User Banned** ‼")
  .setDescription("User : " + toBan.user.username + " \nBan Placer : " + msg.author.username + " \nReason : " + reason)
  item.channel.send({embed});
}

if (item.content.startsWith(prefix + "avatar")) {
  if (item.mentions.users.size === 1) {
    const embed = new Discord.RichEmbed()
    .setColor(0xc7a1ff)
    .addField(item.mentions.members.first().user.username, "This is their avatar.")
    .setImage(item.mentions.members.first().user.avatarURL)
    item.channel.send({embed})
  } else if (item.mentions.users.size === 0) {
    const embed = new Discord.RichEmbed()
    .setColor(0xc7a1ff)
    .addField(msg.author.username, "This is your avatar.")
    .setImage(item.author.avatarURL)
    item.channel.send({embed})
  }
}

// xp stuff

fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
  if(err) console.log(err)
});

const itemsC = [
 'Stone (C)',
 'Jagged Rock (C)',
 'Mud Ball (C)',
 'Broken Plate (C)',
 'Stick (C)'
]

const itemsUC = [
 'Old Vase (UC)',
 'Fossil (UC)',
 'Broken Sword (UC)',
 'Ancient Plate (UC)',
 'Shining Rock (UC)'
]

const itemsR = [
 'Golden Pot (R)',
 'Shooms Towel (R)',
 'Live Shroom (R)',
 'Barney Fossils (R)',
 'Shooms Pillow (R)'
]

const itemsE = [
 'Shroom4 (E)',
 'Shroom11 (E)',
 'Shooms Bedsheet (E)',
 'Shooms Blanket (E)',
 'Shroom0 Cane (E)'
]

const rarity = [
  'C',
  'C',
  'C',
  'C',
  'C',
  'UC',
  'UC',
  'UC',
  'UC',
  'R',
  'R',
  'R',
  'E'
]

const profitC = [
  '2',
  '4',
  '7',
  '11',
  '14',
  '17'
]

const profitUC = [
  '48',
  '59',
  '73',
  '82',
  '61',
  '54'
]

const profitR = [
  '100',
  '133',
  '169',
  '182',
  '114',
  '126'
]

const profitE = [
  '199',
  '243',
  '284',
  '338',
  '367',
  '269'
]

if(!xp[item.author.id]){
  xp[item.author.id] = {
    bal: 1000,
    Stone : 0,
    Jagged__Rock : 0,
    Mud__Ball : 0,
    Broken__Plate : 0,
    Stick : 0,
    Old__Vase : 0, // UC
    Fossil : 0,
    Broken__Sword : 0,
    Ancient__Plate : 0,
    Shining__Rock : 0,
    Golden__Pot : 0, // R
    Shooms__Towel : 0,
    Live__Shroom : 0,
    Barney__Fossils : 0,
    Shooms__Pillow : 0,
    Shroom4 : 0, // E
    Shroom11 : 0,
    Shooms__Bedsheet : 0,
    Shooms__Blanket : 0,
    Shroom0__Cane : 0,
    paydue : 0,
    ItemRTY : 'None',
    booster1 : 0,
    booster2 : 0
};
}

var ItmSldC = '0'
var ItmSldU = '0'
var ItmSldR = '0'
var ItmSldE = '0'
var ItemGVNC = 'None'
var ItemGVNU = 'None'
var ItemGVNR = 'None'
var ItemGVNE = 'None'
var totbal = xp[item.author.id].bal;

if (xp[item.author.id].booster1 === 1) {
  profitC * 50%;
}

if (msg.content === "y-item") {
  xp[item.author.id].ItemRTY = rarity[Math.floor(Math.random() * rarity.length)];
  xp[item.author.id].paydue = 1;
  if (xp[item.author.id].ItemRTY === "C") {
    msg.reply("You found an unidentified object, pay 10ß to identify?\ny-item ID to identify | y-item cancel to cancel");
  } else if (xp[item.author.id].ItemRTY === "UC") {
    msg.reply("You found an unidentified object, pay 50ß to identify?\ny-item ID to identify | y-item cancel to cancel");
  } else if (xp[item.author.id].ItemRTY === "R") {
    msg.reply("You found an unidentified object, pay 120ß to identify?\ny-item ID to identify | y-item cancel to cancel");
  } else if (xp[item.author.id].ItemRTY === "E") {
    msg.reply("You found an unidentified object, pay 250ß to identify?\ny-item ID to identify | y-item cancel to cancel");
  }
}

if (msg.content === "y-shop") {
  const embed = new Discord.RichEmbed()
  .setColor(0x49ffbc)
  .setTitle("The Shroomshop")
  .setDescription("The shop for all of your item needs, for the lowest price!")
  .addField("`1` Random Rare item : 140ß", "_ _")
  .addField("`2` Random Epic item : 280ß", "_ _")
  .addField("`3` The Key of Legends : 1100ß", "Amazing right? This unlocks items called Legendary items (LND).")
  .addField("`4` Fragment of the Omega : 1500ß", "I'm not sure about where this item comes from, but it has an suspicious aura.")
  .addField("`5` Shard of the Omega : 1500ß", "This is a bigger part of that Omega fragment, they look like a key when put together.")
  .addField("`6` Key of the Omega : Fragment and Shard of the Omega", "The price you pay for this is well spent, this key unlocks Omega items (OMEGA).")
  .addField("`7` World Crest : 5200ß", "A beauty this item is, I heard that there 3 World items and they seek the bearer of this crest. I'm not sure how I got it though, or even any item I have here that I comment about.")
  msg.channel.send({embed});
}

if (msg.content === "y-shop 1") {
  const embed = new Discord.RichEmbed()
  .setColor(0x49ffbc)
  .setTitle("The Booster Shoomster")
  .setDescription("Income comes easy with these one of kind boosters! 1 type of booster only, get more boosters by buying different types!")
  .addField("`A` Movere (0.5x / 50% Income Booster) : 500ß", "This one is weighted due to it's plating, it has enough *momentum* to swing around in your pocket. 10ß will become 15ß.")
  .addField("`B` Vagari (1.2x / 120% Income Booster) : 980ß", "*Extravagant* how these boosters work, multiplying the money you recieve can prove useful. 10ß will become 22ß.")
  .addField("`C` Lavere (2.2x / 220% Income Booster) : 1500ß", "Expensive indeed, but to live *lavish*ly would cost a few pennies, am I wrong? 10ß will become 32ß.")
  .addField("`D` Purus (3.5x / 350% Income Booster) : 3000ß", "This is Purus, a *pure* booster like this one holds great power. 10ß will become 45ß.")
  .addField("`E` Ainos (4.8x / 480% Income Booster) : 5000ß", "Ainos, *enigma*tic how much power it has. 10ß will become 58ß.")
  msg.channel.send({embed});
}

if (msg.content.startsWith("y-buy")) {
  if (msg.content === "y-buy 1") {
    if (xp[item.author.id].bal > 140) {
        xp[item.author.id].bal -= 140;
        ItemGVNR = itemsR[Math.floor(Math.random() * itemsR.length)]
        msg.reply("Item added to inventory : " + ItemGVNR)

      if (ItemGVNR.includes("Live Shroom")) {
         xp[item.author.id].Live__Shroom += 1;
        } else if (ItemGVNR.includes("Golden Pot")) {
         xp[item.author.id].Golden__Pot += 1;
        } else if (ItemGVNR.includes("Shooms Towel")) {
         xp[item.author.id].Shooms__Towel += 1;
        } else if (ItemGVNR.includes("Barney Fossils")) {
         xp[item.author.id].Barney__Fossils += 1;
        } else if (ItemGVNR.includes("Shooms Pillow")) {
         xp[item.author.id].Shooms__Pillow += 1;
        }
      }
  } else if (msg.content === "y-buy 2") {
    if (xp[item.author.id].bal > 280) {
        xp[item.author.id].bal -= 280;
        ItemGVNE = itemsE[Math.floor(Math.random() * itemsE.length)]
        msg.reply("Item added to inventory : " + ItemGVNE)

      if (ItemGVNE.includes("Shroom4")) {
         xp[item.author.id].Shroom4 += 1;
        } else if (ItemGVNE.includes("Shroom11")) {
         xp[item.author.id].Shroom11 += 1;
        } else if (ItemGVNE.includes("Shooms Bedsheet")) {
         xp[item.author.id].Shooms__Bedsheet += 1;
        } else if (ItemGVNE.includes("Shooms Blanket")) {
         xp[item.author.id].Shooms__Blanket += 1;
        } else if (ItemGVNE.includes("Shroom0 Cane")) {
         xp[item.author.id].Shroom0__Cane += 1;
        }
      }
  }

  // Booster shop

  if (msg.content === "y-buy A") {
    if (xp[item.author.id].bal > 500) {
        xp[item.author.id].bal -= 500;
        xp[item.author.id].booster1 = 1;
        msg.reply("Movere has been linked into your income.")
     }
   }
}

if (msg.content.startsWith("y-sell")) {
  // Common
   if (msg.content.includes("stone")) {
     if (xp[item.author.id].Stone > 0) {
      ItmSldC = profitC[Math.floor(Math.random() * profitC.length)]
      xp[item.author.id].bal = xp[item.author.id].bal += +ItmSldC;
      xp[item.author.id].Stone -= 1;

      msg.reply("Item sold for " + ItmSldC + "ß");
     }
   } else if (msg.content.includes("jagged rock")) {
     if (xp[item.author.id].Jagged__Rock > 0) {
      ItmSldC = profitC[Math.floor(Math.random() * profitC.length)]
      xp[item.author.id].bal = xp[item.author.id].bal += +ItmSldC;
      xp[item.author.id].Jagged__Rock -= 1;

      msg.reply("Item sold for " + ItmSldC + "ß");
     }
   } else if (msg.content.includes("mud ball")) {
     if (xp[item.author.id].Mud__Ball > 0) {
      ItmSldC = profitC[Math.floor(Math.random() * profitC.length)]
      xp[item.author.id].bal = xp[item.author.id].bal += +ItmSldC;
      xp[item.author.id].Mud__Ball -= 1;

      msg.reply("Item sold for " + ItmSldC + "ß");
     }
   } else if (msg.content.includes("broken plate")) {
     if (xp[item.author.id].Broken__Plate > 0) {
      ItmSldC = profitC[Math.floor(Math.random() * profitC.length)]
      xp[item.author.id].bal = xp[item.author.id].bal += +ItmSldC;
      xp[item.author.id].Broken__Plate -= 1;

      msg.reply("Item sold for " + ItmSldC + "ß");
     }
   } else if (msg.content.includes("stick")) {
     if (xp[item.author.id].Stick > 0) {
      ItmSldC = profitC[Math.floor(Math.random() * profitC.length)]
      xp[item.author.id].bal = xp[item.author.id].bal += +ItmSldC;
      xp[item.author.id].Stick -= 1;

      msg.reply("Item sold for " + ItmSldC + "ß");
     }
   } else
 // Uncommon
   if (msg.content.includes("old vase")) {
     if (xp[item.author.id].Old__Vase > 0) {
      ItmSldU = profitUC[Math.floor(Math.random() * profitUC.length)]
      xp[item.author.id].bal = xp[item.author.id].bal += +ItmSldU;
      xp[item.author.id].Old__Vase -= 1;

      msg.reply("Item sold for " + ItmSldU + "ß");
     }
   } else if (msg.content.includes("fossil")) {
     if (xp[item.author.id].Fossil > 0) {
      ItmSldU = profitUC[Math.floor(Math.random() * profitUC.length)]
      xp[item.author.id].bal = xp[item.author.id].bal += +ItmSldU;
      xp[item.author.id].Fossil -= 1;

      msg.reply("Item sold for " + ItmSldU + "ß");
     }
   } else if (msg.content.includes("broken sword")) {
     if (xp[item.author.id].Broken__Sword > 0) {
      ItmSldU = profitUC[Math.floor(Math.random() * profitUC.length)]
      xp[item.author.id].bal = xp[item.author.id].bal += +ItmSldU;
      xp[item.author.id].Broken__Sword -= 1;

      msg.reply("Item sold for " + ItmSldU + "ß");
     }
   } else if (msg.content.includes("ancient plate")) {
     if (xp[item.author.id].Ancient__Plate > 0) {
      ItmSldU = profitUC[Math.floor(Math.random() * profitUC.length)]
      xp[item.author.id].bal = xp[item.author.id].bal += +ItmSldU;
      xp[item.author.id].Ancient__Plate -= 1;

      msg.reply("Item sold for " + ItmSldU + "ß");
     }
   } else if (msg.content.includes("shining rock")) {
     if (xp[item.author.id].Shining__Rock > 0) {
      ItmSldU = profitUC[Math.floor(Math.random() * profitUC.length)]
      xp[item.author.id].bal = xp[item.author.id].bal += +ItmSldU;
      xp[item.author.id].Shining__Rock -= 1;

      msg.reply("Item sold for " + ItmSldU + "ß");
     }
   } else 
// Rare
   if (msg.content.includes("golden pot")) {
     if (xp[item.author.id].Golden__Pot > 0) {
      ItmSldR = profitR[Math.floor(Math.random() * profitR.length)]
      xp[item.author.id].bal = xp[item.author.id].bal += +ItmSldR;
      xp[item.author.id].Golden__Pot -= 1;

      msg.reply("Item sold for " + ItmSldR + "ß");
     }
   } else if (msg.content.includes("shooms towel")) {
     if (xp[item.author.id].Shooms__Towel > 0) {
      ItmSldR = profitR[Math.floor(Math.random() * profitR.length)]
      xp[item.author.id].bal = xp[item.author.id].bal += +ItmSldR;
      xp[item.author.id].Shooms__Towel -= 1;

      msg.reply("Item sold for " + ItmSldR + "ß");
     }
   } else if (msg.content.includes("live shroom")) {
     if (xp[item.author.id].Live__Shroom > 0) {
      ItmSldR = profitR[Math.floor(Math.random() * profitR.length)]
      xp[item.author.id].bal = xp[item.author.id].bal += +ItmSldR;
      xp[item.author.id].Live__Shroom -= 1;

      msg.reply("Item sold for " + ItmSldR + "ß");
     }
   } else if (msg.content.includes("Barney__Fossils")) {
     if (xp[item.author.id].Barney__Fossils > 0) {
      ItmSldR = profitR[Math.floor(Math.random() * profitR.length)]
      xp[item.author.id].bal = xp[item.author.id].bal += +ItmSldR;
      xp[item.author.id].Barney__Fossils -= 1;

      msg.reply("Item sold for " + ItmSldR + "ß");
     }
   } else if (msg.content.includes("shooms pillow")) {
     if (xp[item.author.id].Shooms__Pillow > 0) {
      ItmSldR = profitR[Math.floor(Math.random() * profitR.length)]
      xp[item.author.id].bal = xp[item.author.id].bal += +ItmSldR;
      xp[item.author.id].Shooms__Pillow -= 1;

      msg.reply("Item sold for " + ItmSldR + "ß");
     }
   } else
// Epic
   if (msg.content.includes("Shroom4")) {
     if (xp[item.author.id].Shroom4 > 0) {
      ItmSldE = profitE[Math.floor(Math.random() * profitE.length)]
      xp[item.author.id].bal = xp[item.author.id].bal += +ItmSldE;
      xp[item.author.id].Shroom4 -= 1;

      msg.reply("Item sold for " + ItmSldE + "ß");
     }
   } else if (msg.content.includes("Shroom11")) {
     if (xp[item.author.id].Shroom11 > 0) {
      ItmSldE = profitE[Math.floor(Math.random() * profitE.length)]
      xp[item.author.id].bal = xp[item.author.id].bal += +ItmSldE;
      xp[item.author.id].Shroom11 -= 1;

      msg.reply("Item sold for " + ItmSldE + "ß");
     }
   } else if (msg.content.includes("shooms bedsheet")) {
     if (xp[item.author.id].Shooms__Bedsheet > 0) {
      ItmSldE = profitE[Math.floor(Math.random() * profitE.length)]
      xp[item.author.id].bal = xp[item.author.id].bal += +ItmSldE;
      xp[item.author.id].Shooms__Bedsheet -= 1;

      msg.reply("Item sold for " + ItmSldE + "ß");
     }
   } else if (msg.content.includes("shooms blanket")) {
     if (xp[item.author.id].Shooms__Blanket > 0) {
      ItmSldE = profitE[Math.floor(Math.random() * profitE.length)]
      xp[item.author.id].bal = xp[item.author.id].bal += +ItmSldE;
      xp[item.author.id].Shooms__Blanket -= 1;

      msg.reply("Item sold for " + ItmSldE + "ß");
     }
   } else if (msg.content.includes("shroom0 cane")) {
     if (xp[item.author.id].Shroom0__Cane > 0) {
      ItmSldE = profitE[Math.floor(Math.random() * profitE.length)]
      xp[item.author.id].bal = xp[item.author.id].bal += +ItmSldE;
      xp[item.author.id].Shroom0__Cane -= 1;

      msg.reply("Item sold for " + ItmSldE + "ß");
     }
   }
}
// ITEM ID
if (xp[item.author.id].paydue !== 0) {
 if (msg.content === "y-item cancel") {
  xp[item.author.id].paydue = 0;
  msg.reply("Canceled");
 }

 if (msg.content === "y-item ID") {
    xp[item.author.id].paydue = 0;
  if (xp[item.author.id].ItemRTY === "C") {
  xp[item.author.id].bal = xp[item.author.id].bal -= 10;
  ItemGVNC = itemsC[Math.floor(Math.random() * itemsC.length)]
  msg.reply("You found an item of barely any value : " + ItemGVNC)

  if (ItemGVNC.includes("Stone")) {
    xp[item.author.id].Stone += 1;
  } else if (ItemGVNC.includes("Jagged Rock")) {
    xp[item.author.id].Jagged__Rock += 1;
  } else if (ItemGVNC.includes("Mud Ball")) {
    xp[item.author.id].Mud__Ball += 1;
  } else if (ItemGVNC.includes("Broken Plate")) {
    xp[item.author.id].Broken__Plate += 1;
  } else if (ItemGVNC.includes("Stick")) {
    xp[item.author.id].Stick += 1;
  }
  } else if (xp[item.author.id].ItemRTY === "UC") {
  xp[item.author.id].bal = xp[item.author.id].bal -= 50;
  ItemGVNU = itemsUC[Math.floor(Math.random() * itemsUC.length)]
  msg.reply("You found an item of little value : " + ItemGVNU)

  if (ItemGVNU.includes("Old Vase")) {
    xp[item.author.id].Old__Vase += 1;
  } else if (ItemGVNU.includes("Fossil")) {
    xp[item.author.id].Fossil += 1;
  } else if (ItemGVNU.includes("Broken Sword")) {
    xp[item.author.id].Broken__Sword += 1;
  } else if (ItemGVNU.includes("Ancient Plate")) {
    xp[item.author.id].Ancient__Plate += 1;
  } else if (ItemGVNU.includes("Shining Rock")) {
    xp[item.author.id].Shining__Rock += 1;
  }
  } else if (xp[item.author.id].ItemRTY === "R") {
  xp[item.author.id].bal = xp[item.author.id].bal -= 120;
  ItemGVNR = itemsR[Math.floor(Math.random() * itemsR.length)]
  msg.reply("You found an item of some value : " + ItemGVNR)

  if (ItemGVNR.includes("Live Shroom")) {
    xp[item.author.id].Live__Shroom += 1;
  } else if (ItemGVNR.includes("Golden Pot")) {
    xp[item.author.id].Golden__Pot += 1;
  } else if (ItemGVNR.includes("Shooms Towel")) {
    xp[item.author.id].Shooms__Towel += 1;
  } else if (ItemGVNR.includes("Barney Fossils")) {
    xp[item.author.id].Barney__Fossils += 1;
  } else if (ItemGVNR.includes("Shooms Pillow")) {
    xp[item.author.id].Shooms__Pillow += 1;
  }
  } else if (xp[item.author.id].ItemRTY === "E") {
  xp[item.author.id].bal = xp[item.author.id].bal -= 250;
  ItemGVNE = itemsE[Math.floor(Math.random() * itemsE.length)]
  msg.reply("You found an item of high value : " + ItemGVNE)

  if (ItemGVNE.includes("Shroom4")) {
    xp[item.author.id].Shroom4 += 1;
  } else if (ItemGVNE.includes("Shroom11")) {
    xp[item.author.id].Shroom11 += 1;
  } else if (ItemGVNE.includes("Shooms Bedsheet")) {
    xp[item.author.id].Shooms__Bedsheet += 1;
  } else if (ItemGVNE.includes("Shooms Blanket")) {
    xp[item.author.id].Shooms__Blanket += 1;
  } else if (ItemGVNE.includes("Shroom0 Cane")) {
    xp[item.author.id].Shroom0__Cane += 1;
  }
  }
 }
}

if (msg.content === "y-inv") {
  const embed = new Discord.RichEmbed()
  .setColor(purple)
  .setTitle("Balance : " + xp[item.author.id].bal, "_ _")
  .addField("(C) Stone : " + xp[item.author.id].Stone, "_ _")
  .addField("(C) Jagged Rock : " + xp[item.author.id].Jagged__Rock, "_ _")
  .addField("(C) Mud Ball : " + xp[item.author.id].Mud__Ball, "_ _")
  .addField("(C) Broken Plate : " + xp[item.author.id].Broken__Plate, "_ _")
  .addField("(C) Stick : " + xp[item.author.id].Stick, "_ _")
  .setFooter("Inventory belonging to " + msg.author.username + " | Page 0")
  msg.channel.send({embed});
} else if (msg.content === "y-inv 1") {
  const embed = new Discord.RichEmbed()
  .setColor(purple2)
  .setTitle("Balance : " + xp[item.author.id].bal, "_ _")
  .addField("(UC) Old Vase : " + xp[item.author.id].Old__Vase, "_ _")
  .addField("(UC) Fossil : " + xp[item.author.id].Fossil, "_ _")
  .addField("(UC) Broken Sword : " + xp[item.author.id].Broken__Sword, "_ _")
  .addField("(UC) Ancient Plate : " + xp[item.author.id].Ancient__Plate, "_ _")
  .addField("(UC) Shining Rock : " + xp[item.author.id].Shining__Rock, "_ _")
  .setFooter("Inventory belonging to " + msg.author.username + " | Page 1")
  msg.channel.send({embed});
} else if (msg.content === "y-inv 2") {
  const embed = new Discord.RichEmbed()
  .setColor(purple3)
  .setTitle("Balance : " + xp[item.author.id].bal, "_ _")
  .addField("(R) Golden Pot : " + xp[item.author.id].Golden__Pot, "_ _")
  .addField("(R) Shooms Towel : " + xp[item.author.id].Shooms__Towel, "_ _")
  .addField("(R) Live Shroom : " + xp[item.author.id].Live__Shroom, "_ _")
  .addField("(R) Barney Fossils : " + xp[item.author.id].Barney__Fossils, "_ _")
  .addField("(R) Shooms Pillow : " + xp[item.author.id].Shooms__Pillow, "_ _")
  .setFooter("Inventory belonging to " + msg.author.username + " | Page 2")
  msg.channel.send({embed});
} else if (msg.content === "y-inv 3") {
  const embed = new Discord.RichEmbed()
  .setColor(purple4)
  .setTitle("Balance : " + xp[item.author.id].bal, "_ _")
  .addField("(E) Shroom4 : " + xp[item.author.id].Shroom4, "_ _")
  .addField("(E) Shroom11 : " + xp[item.author.id].Shroom11, "_ _")
  .addField("(E) Shooms Bedsheet : " + xp[item.author.id].Shooms__Bedsheet, "_ _")
  .addField("(E) Shooms Blanket : " + xp[item.author.id].Shooms__Blanket, "_ _")
  .addField("(E) Shroom0 Cane : " + xp[item.author.id].Shroom0__Cane, "_ _")
  .setFooter("Inventory belonging to " + msg.author.username + " | Page 3")
  msg.channel.send({embed});
}

});

/*

let curxp = xp[item.author.id].xp;
let hiddenxp = xp[item.author.id].oxp;
let curlvl = xp[item.author.id].level;
let nxtLvl = xp[item.author.id].level * 120;
let dispLvl = xp[item.author.id].level + 1;

if (xp[item.author.id].xp !== 0) {
talkedRecently.add(item.author.id);
setTimeout(() => {
  // Removes the user from the set after 25 seconds
  xp[item.author.id].xp = curxp += xpAdd;
  //xp[item.author.id].oxp = hiddenxp += xpAd; 

  talkedRecently.delete(item.author.id);
}, 600);
}

if (msg.content.startsWith(prefix + "prestige")) {
  if (msg.content === prefix + "prestige info") {
    const embed = new Discord.RichEmbed()
    .setColor(0xbcffc3)
    .setTitle("About Prestige")
    .setDescription("Doing a prestige will multiply your income and add more jobs. But you must gain a high amount of money to prestige, you can't simply breeze through a prestige.")
    .addField("Income Boosts", "Prestige 1 : 0.5x\nPrestige 2 : 2.0x\nPrestige 3 : 3.5x\nPrestige 4 : 5.5x")
    .addField("Cost", "Prestige 1 : 50,000\nPrestige 2 : 175,000\nPrestige 3 : 500,000\nPrestige 4 : 1,000,000")
    .addField("Jobs","Prestige 1 : 1 new job\nPrestige 2 : 2 new jobs\nPrestige 3 : 3 new jobs\nPrestige 4 : 4 new jobs")
    msg.channel.send({embed})
  }
}

if (msg.content.startsWith(prefix + "buy")) {
  if (msg.content === prefix + "buy") {
    const embed = new Discord.RichEmbed()
    .setColor(0xbcffc3)
    .setTitle("Job list")
    .setDescription("`1` : Fast food worker\n`2` : Supermarket worker\n `3` : Nursery worker")
    .setFooter("You can only choose 1 job unless you prestige")
    msg.channel.send({embed})
  }
 if (xp[item.author.id].employment === 0) {
  if (msg.content === prefix + "buy 1") {
    if (xp[item.author.id].xp > 150) {
      xp[item.author.id].employment = 1;
      xp[item.author.id].job = 1;
      msg.reply(xp[item.author.id].employment + "Emp val. / " + xp[item.author.id].job + "Jb val.")
    } else if (!xp[item.author.id].xp > 100) {
      msg.reply("You need at least £150 to get this job.")
    }
  } else if (msg.content === prefix + "buy 2") {
    if (xp[item.author.id].xp > 150) {
      xp[item.author.id].employment = 2;
      xp[item.author.id].job = 1;
      msg.reply(xp[item.author.id].employment + "Emp val. / " + xp[item.author.id].job + "Jb val.")
    } else if (!xp[item.author.id].xp > 100) {
      msg.reply("You need at least £150 to get this job.")
    }
  } else if (msg.content === prefix + "buy 3") {
    if (xp[item.author.id].xp > 150) {
      xp[item.author.id].employment = 3;
      xp[item.author.id].job = 1;
      msg.reply(xp[item.author.id].employment + "Emp val. / " + xp[item.author.id].job + "Jb val.")
    } else if (!xp[item.author.id].xp > 100) {
      msg.reply("You need at least £150 to get this job.")
    }
  }
 } else if (xp[item.author.id].employment !== 0) {
    msg.channel.send("Remember, You have to prestige in order change your job, do **y-prestige info** to see the details.")
 }
}

if (msg.content.startsWith(prefix + "bal")) {
  if (xp[item.author.id].employment === 0) {
    const embed = new Discord.RichEmbed()
    .setColor(0xbcffc3)
    .setTitle(msg.author.username + "'s account")
    .setDescription("• Current balance : £" + xp[item.author.id].xp + "\n• Current job : none\n• Job type : none")
    msg.channel.send({embed})
  } else if (xp[item.author.id].employment === 1) {
    if (xp[item.author.id].job === 1) {
      const embed = new Discord.RichEmbed()
      .setColor(0xbcffc3)
      .setTitle(msg.author.username + "'s account")
      .setDescription("• Current balance : £" + xp[item.author.id].xp + "\n• Current job : Fast food worker\n• Job type : Food")
      msg.channel.send({embed})
    }
  } else if (xp[item.author.id].employment === 2) {
    if (xp[item.author.id].job === 1) {
      const embed = new Discord.RichEmbed()
      .setColor(0xbcffc3)
      .setTitle(msg.author.username + "'s account")
      .setDescription("• Current balance : £" + xp[item.author.id].xp + "\n• Current job : Supermarket worker\n• Job type : Service")
      msg.channel.send({embed})
    }
  } else if (xp[item.author.id].employment === 3) {
    if (xp[item.author.id].job === 1) {
      const embed = new Discord.RichEmbed()
      .setColor(0xbcffc3)
      .setTitle(msg.author.username + "'s account")
      .setDescription("• Current balance : £" + xp[item.author.id].xp + "\n• Current job : Nursery worker\n• Job type : Health")
      msg.channel.send({embed})
    }
  }
}*/

/*.then(function (msg) {
              msg.react("🗣")
              msg.react("📨")
            }).catch(function() {
              //Something
             });*/

client.login(process.env.BOT_TOKEN);
