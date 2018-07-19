/* const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs")
let xp = require("./xp.json");
let oxp = require("./oxp.json");
let coins = require("./coins.json");
let items = require("./items.json");
let ixp = require("./ixp.json");
let imt = require("./imt.json");
let purple = 0xF291F9
const talkedRecently = new Set();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ game: { name: client.users.size + ' users. (p!help)', type: 3 } });
});

let prefix = "p!"

// 416053252585684994


client.on('message', msg => {

// Let commands
let item = msg
let args = item.content.split(" ").slice(1)
let dynamPoll = item.content.startsWith(prefix + "POLL") || item.content.startsWith(prefix + "poll")
let dynRandom = random5 = Math.floor((Math.random() * 6));
// Vars
var mentioned = 1
var nomention = 0
var bot = 417334712697356318
var u = `New level system! (WIP)`
// Constant Variables
const owner = 240488610955132929
if (item.channel.type === "dm") return;
// Say
if (item.content.startsWith(prefix + "SAY ") || item.content.startsWith(prefix + "say ")) {
  if (item.member.hasPermission("MANAGE_SERVER")) {
   item.channel.send(args.join(" "))
  }
}
// Create-Role
if (item.content.startsWith(prefix + "CREATE-ROLE #") || item.content.startsWith(prefix + "create-role #")) {
  if (item.member.hasPermission("ADMINISTRATOR")) {
    const embed = new Discord.RichEmbed()
    .setDescription(`Role created on ${item.createdAt}`)
    .setColor("9dff4e")
    .addField(`The role has been created by ${item.author.username}.`, ";)")
    item.channel.send({embed});
    item.guild.createRole({
      name: args.slice(1).join(' '),
      color: args[0],
      mentionable: true
    });
  } else if (!item.member.hasPermission("ADMINISTRATOR")) {
    item.reply("Lacking permission : Administrator")
  }
}


// Remove-Role
if (item.content.startsWith(prefix + "REMOVE-ROLE") || item.content.startsWith(prefix + "remove-role")) {
  if (item.member.hasPermission("ADMINISTRATOR")) {
    if (item.mentions.roles.size === 1) {
      const embed = new Discord.RichEmbed()
      .setDescription(`Role deleted on ${item.createdAt}`)
      .setColor("9dff4e")
      .addField(`The role has been deleted by ${item.author.username}.`, ";)")
      item.channel.send({embed});

      const roleToDelete = item.mentions.roles.first() || item.guild.roles.find('name', args[0])
      if (!roleToDelete) return item.reply(`The role ${args[0]} doesnt exist`);
      roleToDelete.delete();
    } else if (item.mentions.roles.size === 0) {
      item.reply("Please mention a role to delete.")
    } else if (!item.member.hasPermission("ADMINISTRATOR")) {
      item.reply("Lacking permission : Administrator")
  }
}
}

// Edit-Role
if (item.content.startsWith(prefix + "EDIT-ROLE") || item.content.startsWith(prefix + "edit-role")) {
  if (item.member.hasPermission("ADMINISTRATOR")) {
   if (!item.mentions.roles.size === 1) {
    if (item.content.startsWith(prefix + "edit-role color") || item.content.startsWith(prefix + "EDIT-ROLE color")) {
      if (!item.mentions.roles.first() || item.guild.roles.find('name', args[0])) return item.reply(`The role ${args[0]} doesnt exist`);
      item.mentions.roles.first().setColor(args[2]);
    }

    if (item.content.startsWith(prefix + "edit-role mentionable") || item.content.startsWith(prefix + "EDIT-ROLE mentionable")) {
      if (item.content.includes("yes")) {
        if (!item.mentions.roles.first() || item.guild.roles.find('name', args[0])) return item.reply(`The role ${args[0]} doesnt exist`);
        item.mentions.roles.first().setMentionable(true);
      } else if (item.content.includes("no")) {
        if (!item.mentions.roles.first() || item.guild.roles.find('name', args[0])) return item.reply(`The role ${args[0]} doesnt exist`);
        item.mentions.roles.first().setMentionable(false);
      }
    }

    if (item.content.startsWith(prefix + "edit-role hoist") || item.content.startsWith(prefix + "EDIT-ROLE hoist")) {
      if (item.content.includes("yes")) {
        if (!item.mentions.roles.first() || item.guild.roles.find('name', args[0])) return item.reply(`The role ${args[0]} doesnt exist`);
        item.mentions.roles.first().setHoist(true);
      } else if (item.content.includes("no")) {
        if (!item.mentions.roles.first() || item.guild.roles.find('name', args[0])) return item.reply(`The role ${args[0]} doesnt exist`);
        item.mentions.roles.first().setHoist(false);
      }
    }

    if (item.content.startsWith(prefix + "edit-role name") || item.content.startsWith(prefix + "EDIT-ROLE name")) {
      if (!item.mentions.roles.first() || item.guild.roles.find('name', args[0])) return item.reply(`The role ${args[0]} doesnt exist`);
      item.mentions.roles.first().setName(args[2]);
    }

    if (item.content.startsWith(prefix + "edit-role pos") || item.content.startsWith(prefix + "EDIT-ROLE pos")) {
      if (!item.mentions.roles.first() || item.guild.roles.find('name', args[0])) return item.reply(`The role ${args[0]} doesnt exist`);
      item.mentions.roles.first().setPosition(args[2]);
    }
    const embed = new Discord.RichEmbed()
    .setDescription(`Role edited on ${item.createdAt}`)
    .setColor("9dff4e")
    .addField(`The role has been edited by ${item.author.username}.`, ";)")
    item.channel.send({embed});

  }
} else if (item.mentions.roles.size === 0) {
    item.reply("Please mention a role to edit.")
  } else if (!item.member.hasPermission("ADMINISTRATOR")) {
    item.reply("Lacking permission : Administrator")
  }
}
// Z-Update
if (item.content.startsWith(prefix + "U ")) {
    client.channels.get("423131100974678052").send("Hey guys, I've been updated!")
}
if (item.content === "Hey guys, I've been updated!") {
    msg.delete(2)
    const embed = new Discord.RichEmbed()
    .setDescription("Zotabot Update " + "2")
    .setColor(0xcc9fff)
    .addField("Update contents", u)
    item.channel.send({embed})
}
// Ping
if (item.content === prefix + "PING" || item.content === prefix + "ping") {
  item.reply(`Doot doot. Latency is ${msg.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
}
// Kick
if (item.content.startsWith(prefix + "kick") || item.content.startsWith(prefix + "KICK")) {
  if (!item.member.hasPermissions('KICK_MEMBERS')) return item.reply("You dont have the Permission <KICK-MEMBERS>");
  if (!item.guild.member(client.user).hasPermissions('KICK_MEMBERS')) return item.reply("I dont have the Permission to kick Members");
  let toKick = item.mentions.members.first() || item.guild.members.get(args[0]);
  if (!toKick) return item.reply("Please mention a Member to Kick, or provide their Client ID");
  let reason = args.slice(1).join(' ');
  if (!reason) reason = 'No reason provided';
  if (!toKick.kickable) return item.reply('This Member isnt kickable');

  toKick.kick({reason: reason});

  const embed = new Discord.RichEmbed()
  .setDescription("User has been kicked on " + item.createdAt)
  .setColor("9dff4e")
  .addField(`${toKick.user.username} got kicked by ${item.author.username}`, `User was kicked for : ${reason}`)
  item.channel.send({embed});
}
// Ban
if (item.content.startsWith(prefix + "ban") || item.content.startsWith(prefix + "BAN")) {
  if (!item.member.hasPermissions('BAN_MEMBERS')) return item.reply("You dont have the Permission <BAN-MEMBERS>");
  if (!item.guild.member(client.user).hasPermissions('BAN_MEMBERS')) return item.reply("I dont have the Permission to Ban Members");
  let toBan = item.mentions.members.first() || item.guild.members.get(args[0]);
  if (!toBan) return item.reply("Please mention a Member to Ban, or provide their Client ID");
  let reason = args.slice(1).join(' ');
  if (!reason) reason = 'No reason provided';
  if (!toBan.bannable) return item.reply('This Member isnt bannable');

  toBan.ban({reason: reason});

  const embed = new Discord.RichEmbed()
  .setDescription("User has been banned on " + item.createdAt)
  .setColor("9dff4e")
  .addField(`${toBan.user.username} got banned by ${item.author.username}`, `User was banned for : ${reason}`)
  item.channel.send({embed});
}
// Ban
if (item.content.startsWith(prefix + "unban") || item.content.startsWith(prefix + "UNBAN")) {
  if (!item.member.hasPermissions('BAN_MEMBERS')) return item.reply("You dont have the Permission <BAN-MEMBERS>");
  if (!item.guild.member(client.user).hasPermissions('BAN_MEMBERS')) return item.reply("I dont have the Permission to Ban Members");

  item.guild.unban(args.join(" "));

  const embed = new Discord.RichEmbed()
  .setDescription("User has been unbanned on " + item.createdAt)
  .setColor("9dff4e")
  .addField(`A user got unbanned by ${item.author.username}`, `User was unbanned.`)
  item.channel.send({embed});
}
// Purge
if (item.content.startsWith(prefix + "PURGE ") || item.content.startsWith(prefix + "purge ")) {
  if (item.member.hasPermission("KICK_MEMBERS")) {
    const deleteCount = parseInt(args[0], 10);
    const words = parseInt(!args[0], 10);
    if(!deleteCount || deleteCount < 1 || deleteCount > 100) {
      return item.reply("Please provide a number between 1 and 100 for the number of messages to delete");
    }
    item.channel.bulkDelete(deleteCount)
    const embed = new Discord.RichEmbed()
    .setColor(0x00ff51)
    .addField(deleteCount + " messages have been deleted.", ";)")
    item.channel.send({embed})
  } else if (!item.member.hasPermission("KICK_MEMBERS")) {
    item.reply("Permission <Kick-Members> missing.")
  }
}
// ServerInfo
if (item.content.startsWith(prefix + "SERVERINFO") || item.content.startsWith(prefix + "serverinfo")) {
  const embed = new Discord.RichEmbed()
  .setColor(0xff9696)
  .addField("Server Name", item.guild.name)
  .addField("Member Count", item.guild.members.size)
  .addField("Server Owner", item.guild.owner)
  .addField("Verification Level", item.guild.verificationLevel)
  .addField("Created On", item.guild.createdAt)
  .addField("If Large (Over 250 Members)", item.guild.large)
  .addField("ID", item.guild.id)
  .addField("Region of Server", item.guild.region)
  item.channel.send({embed})
}
// Food
if (item.content === prefix + "FOOD" || item.content === prefix + "food") {
  const embed = new Discord.RichEmbed()
  .setColor(0x680001)
  .setDescription('I bet your gonna love this dish, I call it *Trash*!')
  .setImage("https://cdn.discordapp.com/attachments/415698146111258628/419569560811995171/Unknown-2.jpeg")
  item.channel.send({embed})
}
// CB
if (item.content.startsWith(prefix + "CB") || item.content.startsWith(prefix + "cb")) {
  if (item.content === prefix + "CB" || item.content === prefix + "cb") {
    item.channel.send("Incorrect Usage. `Example` : `z!cb hello` || `Output` : ```Hello```")
  } else if (item.content.startsWith(prefix + "CB ") || item.content.startsWith(prefix + "cb ")) {
    item.channel.send("```" + args.join(" ") + "```")
  }
}

// USERINFO
if (item.content.startsWith(prefix + "USERINFO") || item.content.startsWith(prefix + "userinfo")) {
    if (item.mentions.users.size === 0) {
      const embed = new Discord.RichEmbed()
      .setColor(0xcdff69)
      .addField("Username", item.author.username)
      .addField("ID", item.author.id)
      .addField("Joined on", item.member.joinedAt)
      .addField("Human", "Probably")
      .addField("Registered at", item.member.user.createdAt)
      .setThumbnail(item.author.avatarURL)
      .setFooter("Bot created by potapo")
      item.channel.send({embed})
  } else if (item.mentions.users.size === 1) {
      const embed = new Discord.RichEmbed()
      .setColor(0xcdff69)
      .addField("Username", item.mentions.members.first().user.username)
      .addField("ID", item.mentions.members.first().id)
      .addField("Joined on", item.mentions.members.first().joinedAt)
      .addField("Human", "Probably")
      .addField("Registered at", item.mentions.members.first().user.createdAt)
      .setThumbnail(item.mentions.members.first().user.avatarURL)
      .setFooter("Bot created by potapo")
      item.channel.send({embed})
    }
}
// SUGGEST
if (item.content.startsWith(prefix + "REQUEST") || item.content.startsWith(prefix + "request")) {
  if (item.content === prefix + "REQUEST" || item.content === prefix + "request") {
    item.channel.send("`Please send a message with your suggestion.`")
  } else if (item.content.startsWith(prefix + "REQUEST") || item.content.startsWith(prefix + "request")) {
    client.users.get("240488610955132929").send("```" + msg.author.tag + " Requested: " + args.join(" ") + "```")
  }
}
// INVITE
if (item.content.startsWith(prefix + "INVITE") || item.content.startsWith(prefix + "invite")) {
  const embed = new Discord.RichEmbed()
  .setColor(0xcc97ff)
  .addField("Bot invite link", "https://discordapp.com/api/oauth2/authorize?client_id=419229555857817601&permissions=8&scope=bot")
  item.channel.send({embed})
}
// INFO
if (item.content.startsWith(prefix + "INFO") || item.content.startsWith(prefix + "info")) {
  const embed = new Discord.RichEmbed()
  .setColor(0xffca00)
  .addField("Servers On", client.guilds.size)
  .addField("ID", bot)
  .addField("Prefix", "p!")
  .addField("Language", "English")
  .addField("Coding Language", "Node.js")
  .addField("Official Server", "https://discord.gg/U6mU9ak")
  .setFooter("Created by 🥔 Potapo🥔  on " + client.user.createdAt)
  .setThumbnail(client.user.avatarURL)
  item.channel.send({embed})
}
// Kiss
if (item.content.startsWith(prefix + "KISS ") || item.content.startsWith(prefix + "kiss ")) {
  if (item.mentions.users.size === nomention) {
    const embed = new Discord.RichEmbed()
    .setColor(0x12F20b)
    .addField(msg.author.username + " just kissed " + args.join(" ") + "!", "...")
    .setFooter("._.")
    item.channel.send({embed})
  } else if (item.mentions.users.size === mentioned) {
    const embed = new Discord.RichEmbed()
    .setColor(0x12F20b)
    .addField(msg.author.username + " just kissed " + item.mentions.members.first().user.username + "!", "Wowie! Actual contact!")
    .setFooter("hmHmhMHmhHhmhmh")
    item.channel.send({embed})
  }
}
// Egg
if (item.content.startsWith(prefix + "EGG ") || item.content.startsWith(prefix + "egg ")) {
  if (item.mentions.users.size === nomention) {
    const embed = new Discord.RichEmbed()
    .setColor(0x5F16b1)
    .addField("Incorrect Usage", "Example : z!egg @Potapo")
    item.channel.send({embed})
  } else if (item.mentions.users.size === mentioned) {
    const embed = new Discord.RichEmbed()
    .setColor(0x17ff00)
    .addField(item.author.username + " just egged " + item.mentions.members.first().user.username + "!", "🄴 🄶 🄶 🄴 🄳")
    .setImage("https://cdn.discordapp.com/attachments/418482983020920853/421703721756393495/images-2.jpeg")
    item.channel.send({embed})
  }

}
// Avatar
if (item.content.startsWith(prefix + "AVATAR") || item.content.startsWith(prefix + "avatar")) {
  if (item.mentions.users.size === mentioned) {
    const embed = new Discord.RichEmbed()
    .setColor(0x1F98b1)
    .addField(item.mentions.members.first().user.username, "This is his avatar.")
    .setImage(item.mentions.members.first().user.avatarURL)
    item.channel.send({embed})
  } else if (item.mentions.users.size === nomention) {
    const embed = new Discord.RichEmbed()
    .setColor(0x1F98b1)
    .addField(msg.author.username, "This is your avatar.")
    .setImage(item.author.avatarURL)
    item.channel.send({embed})
  }
}
// ID
if (item.content.startsWith(prefix + "ID") || item.content.startsWith(prefix + "id")) {
  if (item.mentions.users.size === nomention) {
    item.channel.send("`" + item.author.id +"`")
  } else if (item.mentions.users.size === mentioned) {
    item.channel.send("`" + item.mentions.members.first().user.id + "`")
  }
}
// POLL
if (dynamPoll) {
  item.react("👍")
  item.react("👎")
}
// HELP
if (item.content.startsWith(prefix + "HELP") || item.content.startsWith(prefix + "help")) {
    if (item.content === prefix + "HELP" || item.content === prefix + "help") {
      item.react(":Sent:424022425080954888")
      const embed = new Discord.RichEmbed()
      .setColor(0x1b8F98)
      .addField("Fun Commands", `**${prefix}kiss** : Kiss someone ;)\n**${prefix}egg** : Egg someone ;)\n**${prefix}cb** : Put something in a code block.\n`)
      .addField("Level Commands (WIP)", `**${prefix}profile** : Displays your level and xp`)
      .addField("Informative Commands", `**${prefix}help** : Displays this\n**${prefix}avatar** : Shows the avatar of you or a mentioned user \n**${prefix}id** : Gets the id of you or a mentioned user\n**${prefix}info** : Get my info\n**${prefix}userinfo** : Get your own info\n**${prefix}serverinfo** : Get the info of the server\n`)
      .addField("Other Commands", `**${prefix}poll** : Create a poll.\n**${prefix}invite** : Sends a bot invite so you can add me to other servers\n**${prefix}request** : Request a command\n`)
      .addField("Mod Commands", `**${prefix}purge** : Delete a certain amount of messages\n**${prefix}kick** : Kick a member\n**${prefix}ban** : Ban a member\n**${prefix}unban** : Unban a member\n**${prefix}create-role** : Create a role\n**${prefix}remove-role** : Delete a role\n**${prefix}edit-role** : Edit a role`)
      item.channel.send({embed}).then(item => {item.delete(15000)})
    }
}


// XP

let xpAdd = 13;
console.log(xpAdd);
let xpAd = 13;
console.log(xpAdd);
let coinAdd = Math.floor(Math.random() * 2) + 3;
console.log(xpAdd);
let shardCrt = args[1]
console.log(shardCrt)

if(!xp[item.guild.id + item.author.id]){
  xp[item.guild.id + item.author.id] = {
    xp: 0,
    level: 1,
    oxp: 0,
    ixp: 0,
    imt: 0
};
}

let curxp = xp[item.guild.id + item.author.id].xp;
let hiddenxp = xp[item.guild.id + item.author.id].oxp;
let curlvl = xp[item.guild.id + item.author.id].level;
let nxtLvl = xp[item.guild.id + item.author.id].level * 300;
let curoinAmt = xp[item.guild.id + item.author.id].ixp;
let itemAmt = xp[item.guild.id + item.author.id].imt;

talkedRecently.add(item.author.id);
setTimeout(() => {
  // Removes the user from the set after 25 seconds
  xp[item.guild.id + item.author.id].xp = curxp += xpAdd;
  xp[item.guild.id + item.author.id].oxp = hiddenxp += xpAd;
  talkedRecently.delete(item.author.id);
}, 25000);

if (nxtLvl < xp[item.author.id || item.guild.id].oxp) {
  xp[item.guild.id + item.author.id].oxp = 0;

  xp[item.guild.id + item.author.id].level = curlvl + 1;

  const embed = new Discord.RichEmbed()
  .setTitle("Level Up!")
  .setDescription("New Level : " + curlvl + 1 + " Coins added : 200")
  .setColor(purple)
  item.channel.send({embed}).then(msg => {msg.delete(50000)});
}

  let coinAmt = Math.floor(Math.random() * 15) + 1;
  let baseAmt = Math.floor(Math.random() * 15) + 1;
console.log(`${coinAmt} ; ${baseAmt}`);fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
  if (err) console.log(err)
});

fs.writeFile("./items.json", JSON.stringify(items), (err) => {
  if (err) console.log(err)
});

fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
  if(err) console.log(err)
});

fs.writeFile("./oxp.json", JSON.stringify(oxp), (err) => {
  if(err) console.log(err)
});

if (item.content === prefix + "profile" || item.content === prefix + "PROFILE" || item.content === prefix + "pf" || item.content === prefix + "PF") {
   const embed = new Discord.RichEmbed()
   .setAuthor(item.author.username)
   .setColor(purple)
   .addField("Level", curlvl, true)
   .addField("Potapo Points", hiddenxp + "/" + nxtLvl + " (" + curxp + " tot.)", true)
   .addField("Next Level", curlvl + 1, true)
   .addField("Points Needed", nxtLvl, true)
   .setThumbnail(item.author.avatarURL)
   item.channel.send({embed})
  }

if (item.content === prefix + "bal" || item.content === prefix + "BAL") {
    const embed = new Discord.RichEmbed()
    .setAuthor(item.author.username)
    .setColor(0x9dff90)
    .addField("Potads", curoinAmt)
    .addField("Items", itemAmt)
    .setThumbnail(item.author.avatarURL)
    item.channel.send({embed})
  }

// 🤔 👌 👍 ❤ 📱 ⏱ 💎 💵 💴 💶 💷 ⚛ 🌟

if (item.content === prefix + "shop" || item.content === prefix + "SHOP") {
    const embed = new Discord.RichEmbed()
    .setColor(0x2F192F)
    .addField("Shop", "`1` : 🤔 | 200 Potads\n`2` : 👌 | 400 Potads\n`3` : 👍 | 600 Potads\n`4` : ❤ | 800 Potads\n`5` : 📱 | 1000 Potads\n`6` : ⏱ | 1200 Potads\n`7` : 💎 | 1400 Potads\n`8` : 💵 | 1600 Potads\n`9` : 💴 | 1800 Potads\n`10` : 💶 | 2000 Bits\n`11` : 💷 | 2200 Potads\n`12` : ⚛ | 2400 Potads\n`13` : 🌟 | 2600 Potads\n")
    .setThumbnail(item.author.avatarURL)
    item.channel.send({embed})
}

if (item.content.startsWith(prefix + "buy") || item.content.startsWith(prefix + "BUY")) {
  if (item.content === prefix + "buy 1" ||item.content === prefix + "BUY 1") {
    if (curoinAmt > 200 - 1) {
    xp[item.guild.id + item.author.id].ixp -= 200
    item.reply("ok")
    xp[item.guild.id + item.author.id].imt += 1
   } else if (curoinAmt < 200) return msg.reply("You dont have enough Potads to buy this item.")
  } else if (item.content === prefix + "buy 2" ||item.content === prefix + "BUY 2") {
    if (curoinAmt > 400 - 1) {
    xp[item.guild.id + item.author.id].ixp -= 400
    item.reply("ok")
    xp[item.guild.id + item.author.id].imt += 1
  } else if (curoinAmt < 400) return msg.reply("You dont have enough Potads to buy this item.")
  } else if (item.content === prefix + "buy 3" ||item.content === prefix + "BUY 3") {
    if (curoinAmt > 600 - 1) {
    xp[item.guild.id + item.author.id].ixp -= 600
   item.reply("ok")
    xp[item.guild.id + item.author.id].imt += 1
   } else if (curoinAmt < 600) return msg.reply("You dont have enough Potads to buy this item.")
  } else if (item.content === prefix + "buy 4" ||item.content === prefix + "BUY 4") {
    if (curoinAmt > 800 - 1) {
    xp[item.guild.id + item.author.id].ixp -= 800
    item.reply("ok")
    xp[item.guild.id + item.author.id].imt += 1
   } else if (curoinAmt < 800) return msg.reply("You dont have enough Potads to buy this item.")
  } else if (item.content === prefix + "buy 5" ||item.content === prefix + "BUY 5") {
    if (curoinAmt > 1000 - 1) {
    xp[item.guild.id + item.author.id].ixp -= 1000
    item.reply("ok")
    xp[item.guild.id + item.author.id].imt += 1
   } else if (curoinAmt < 1000) return msg.reply("You dont have enough Potads to buy this item.")
  } else if (item.content === prefix + "buy 6" ||item.content === prefix + "BUY 6") {
    if (curoinAmt > 1200 - 1) {
    xp[item.guild.id + item.author.id].ixp -= 1200
   item.reply("ok")
    xp[item.guild.id + item.author.id].imt += 1
   } else if (curoinAmt < 1200) return msg.reply("You dont have enough Potads to buy this item.")
  } else if (item.content === prefix + "buy 7" ||item.content === prefix + "BUY 7") {
    if (curoinAmt > 1400 - 1) {
    xp[item.guild.id + item.author.id].ixp -= 1400
   item.reply("ok")
    xp[item.guild.id + item.author.id].imt += 1
    } else if (curoinAmt < 1400) return msg.reply("You dont have enough Potads to buy this item.")
  } else if (item.content === prefix + "buy 8" ||item.content === prefix + "BUY 8") {
    if (curoinAmt > 1600 - 1) {
    xp[item.guild.id + item.author.id].ixp -= 1600
   item.reply("ok")
    xp[item.guild.id + item.author.id].imt += 1
   } else if (curoinAmt < 1600) return msg.reply("You dont have enough Potads to buy this item.")
  } else if (item.content === prefix + "buy 9" ||item.content === prefix + "BUY 9") {
    if (curoinAmt > 1800 - 1) {
     xp[item.guild.id + item.author.id].ixp -= 1800
    item.reply("ok")
    xp[item.guild.id + item.author.id].imt += 1
    } else if (curoinAmt < 1800) return msg.reply("You dont have enough Potads to buy this item.")
  } else if (item.content === prefix + "buy 10" ||item.content === prefix + "BUY 10") {
    if (curoinAmt > 2000 - 1) {
    xp[item.guild.id + item.author.id].ixp -= 2000
    item.reply("ok")
    xp[item.guild.id + item.author.id].imt += 1
    } else if (curoinAmt < 2000) return msg.reply("You dont have enough Potads to buy this item.")
  } else if (item.content === prefix + "buy 11" ||item.content === prefix + "BUY 11") {
    if (curoinAmt > 2200 - 1) {
    xp[item.guild.id + item.author.id].ixp -= 2200
    item.reply("ok")
    xp[item.guild.id + item.author.id].imt += 1
   } else if (curoinAmt < 2200) return msg.reply("You dont have enough Potads to buy this item.")
  } else if (item.content === prefix + "buy 12" ||item.content === prefix + "BUY 12") {
    if (curoinAmt > 2400 - 1) {
    xp[item.guild.id + item.author.id].ixp -= 2400
    item.reply("ok")
    xp[item.guild.id + item.author.id].imt += 1
    } else if (curoinAmt < 2400 - 1) return msg.reply("You dont have enough Potads to buy this item.")
  } else if (item.content === prefix + "buy 13" ||item.content === prefix + "BUY 13") {
    if (curoinAmt > 2600 - 1) {
    xp[item.guild.id + item.author.id].ixp -= 2600
    item.reply("ok")
    xp[item.guild.id + item.author.id].imt += 1
    } else if (curoinAmt < 2600) return msg.reply("You dont have enough Potads to buy this item.")
  }
}
});*/

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
  .setTitle("Important Announcement")
  .addField("Listen up! Y'all are 'ere because this Potapo Mine was created! Y'all better celebrate!", "Basically this server was created today, enjoy.")
  .addField("Oi lads! We also managed to get some automatic robo-toys for ye miners to have more fun 'ere!", "In short, we have bots in this server. Why can't this bot talk normally?")
  .addField("So ye miners better get to work soon or else yer gonna feel Ol' Espresso's wrath!", "You actually don't work here, just chat. Don't mind his threat, it's just a bluff.")
  msg.channel.send({embed});
}

let warned = msg.mentions.members.first().user.username
let args = msg.content.split(" ").slice(1)
let reason = args.slice(1).join(' ');

if (msg.content.startsWith(prefix + "warn")) {
  msg.delete();

  const embed = new Discord.RichEmbed()
  .setColor(0xff4d4f)
  .setTitle("⚠ **Member Warned** ⚠")
  .addField('Violater', warned)
  .addField('Reason', reason)
  .addField('Warn Placer', msg.author.username)
  msg.channel.send({embed});
}

});

client.login(process.env.BOT_TOKEN);
