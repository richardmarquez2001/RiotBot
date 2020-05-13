const fetch = require("node-fetch");
const Discord = require("discord.js");
const bot = new Discord.Client();
const auth = require('./config.json')
const token = auth.token;
const site = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/CjVoLPfQ22SjJNcnwJfo0Ucx0TX4-5-vjPENNxIXkEPiOVM?api_key=" + auth.key
const prefix = "!";

bot.on('ready', () =>{
  console.log("This bot is online!");
});

bot.on("message", async msg=>{

  if(msg.type !== 'DEFAULT') return;

    // CHECK MESSAGE IS VALID USER
    if(msg.author.bot) return;

    // CHECK MESSAGE STARTS WITH PREFIX
    if(msg.content.indexOf(prefix) !== 0) return;

    // COMMAND ARGUMENTS
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);

    if(args[0] == "stats"){
      msg.channel.startTyping();

      // Command for League of Legends
      if(args[1] == "lol"){

        try{

        info = await getData();
        embed = getEmbed(info);
        msg.channel.send(embed);

      }catch(err){msg.channel.send("Error Occured" + err); }

      }else{msg.channel.send("invalid response"); }

    }
    msg.channel.stopTyping();

});

// getes data from API, returns it into usable json
async function getData() {
  const response = await fetch(site);
  const data = await response.json();
  return data
}

// creates an embed page
function getEmbed(info){
  const embed = new Discord.MessageEmbed()

    .setColor(0x00AE86)
    .setTitle("Profile: " + info[0].summonerName)
    .setDescription("Here you go, summoner!")
    .addField('\u200b', '\u200b')
    .setThumbnail('https://i.imgur.com/wSTFkRM.png')
    .addFields(
      { name: 'Rank', value: info[0].tier + " " + info[0].rank, inline: true},
      { name: 'LP', value: info[0].leaguePoints, inline: true},
      { name: "W/L", value: info[0].wins + " W / " + info[0].losses + " L", inline: true},
      { name: '\u200B', value: '\u200B' },
     )
    .setFooter("Jon and Ric")
    .setTimestamp()

    return embed
}

bot.login(token);
