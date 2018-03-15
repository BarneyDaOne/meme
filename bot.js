const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ game: { name: client.users.size + "users. z!help", type: 3 } })
});

let prefix = "z!"

client.on('guildMemberAdd', member => {
    if (item.guild.id === "423124275554418699") {
       client.channels.get("423124275554418701").send(`Welcome to the server, ${member}!`);
       member.addRole("423125708416745474")
       console.log(`${member.user.username} has joined`);
} else if (item.guild.id === "416052765480189952") {
       client.channels.get("418885860449189888").send(`Welcome to the server, ${member}!`);
       member.addRole("416053252585684994")
       console.log(`${member.user.username} has joined`);
}
// 416053252585684994
});

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
var u = `Create role command!\nEdit role command!\nDelete role command!`
// Constant Variables
const owner = 240488610955132929
// Say
if (item.content.startsWith(prefix + "SAY ") || item.content.startsWith(prefix + "say ")) {
  item.channel.send(args.join(" "))
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
  .addField("Prefix", "z!")
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
      item.react(":ZB:422919167893831701")
      const embed = new Discord.RichEmbed()
      .setColor(0x1b8F98)
      .addField("Fun Commands", "**z!kiss** : Kiss someone ;)\n**z!egg** : Egg someone ;)\n**z!cb** : Put something in a code block.\n")
      .addField("Informative Commands", "**z!help** : Displays this\n**z!avatar** : Shows the avatar of you or a mentioned user \n**z!id** : Gets the id of you or a mentioned user\n**z!info** : Get my info\n**z!userinfo** : Get your own info\n**z!serverinfo** : Get the info of the server\n")
      .addField("Other Commands", "**z!poll** : Create a poll.\n**z!invite** : Sends a bot invite so you can add me to other servers\n**z!request** : Request a command\n")
      .addField("Mod Commands", "**z!purge** : Delete a certain amount of messages\n**z!kick** : Kick a member\n**z!ban** : Ban a member\n**z!unban** : Unban a member\n**z!create-role** : Create a role\n**z!remove-role** : Delete a role\n**z!edit-role** : Edit a role")
      item.author.send({embed})
    }
}
});

client.login(process.env.BOT_TOKEN);
