const fetch = require("node-fetch");
const Discord = require("discord.js");
const bot = new Discord.Client();
const auth = require('./config.json')
const token = auth.token;
const site = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/CjVoLPfQ22SjJNcnwJfo0Ucx0TX4-5-vjPENNxIXkEPiOVM?api_key=" + auth.key
const prefix = "!";

// Constants
// const api = `?api_key=${auth.key}`;
// const protocol = "https://";
// const regions = {
//   BR1: "br1.api.riotgames.com",
//   EUN1: "eun1.api.riotgames.com",
//   EUW1: "euw1.api.riotgames.com",
//   JP1: "jp1.api.riotgames.com",
//   KR: "kr.api.riotgames.com",
//   LA1: "la1.api.riotgames.com",
//   LA2: "la2.api.riotgames.com",
//   NA1: "na1.api.riotgames.com",
//   OC1: "oc1.api.riotgames.com",
//   TR1: "tr1.api.riotgames.com",
//   RU: "ru.api.riotgames.com"
// }


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

// One Time Fetch 
// let onLoadFetch = async () => {
//   let result = {};
//   result.queueIds = await fetch("http://static.developer.riotgames.com/docs/lol/queues.json");
//   result.seasons = await fetch("http://static.developer.riotgames.com/docs/lol/seasons.json");
//   result.maps = await fetch("http://static.developer.riotgames.com/docs/lol/maps.json");
//   result.gameModes = await fetch("http://static.developer.riotgames.com/docs/lol/gameModes.json");
//   result.gameTypes = await fetch("http://static.developer.riotgames.com/docs/lol/gameTypes.json");
//   result.champions = await fetch("http://ddragon.leagueoflegends.com/cdn/10.9.1/data/en_US/champion.json");
//   result.profileIcons = await fetch("http://ddragon.leagueoflegends.com/cdn/10.9.1/data/en_US/profileicon.json");
//   return result;
// }


// let getData = async () => {
//   // Test Case
//   // let summonerName = "Kyle";
//   // let region = "NA1";

//   // if(region in regions){
//   //     region = regions[region]
//   // } else {
//   //     console.log("error")
//   //     return;
//   // }

//   let result = {};

//   // Get summoner data
//   result.summonerData = await fetch(`${protocol}${region}/lol/summoner/v4/summoners/by-name/${summonerName}${api}`)
//     .then(response => response.json())
//     .then(result => result);

//   console.log(result.summonerData)
//   result.encryptedSummonerId = result.summonerData.id;
//   result.encryptedAccountId = result.summonerData.accountId;

//   // Use summoner data to query for more data
//   let query = {
//     matchHistory: `${protocol}${region}/lol/match/v4/matchlists/by-account/${encryptedAccountId}${api}`,
//     leagueData: `${protocol}${region}/lol/league/v4/entries/by-summoner/${encryptedSummonerId}${api}`,
//     championMastery: `${protocol}${region}/lol/champion-mastery/v4/champion-masteries/by-summoner/${encryptedSummonerId}${api}`,
//   }

//   result.matchHistory = await fetch(query.matchHistory)
//     .then(response => response.json());

//   result.leagueData = await fetch(query.leagueData)
//     .then(response => response.json())
//     .then(result =>  result[0]);

//   result.championMastery = await fetch(query.championMastery)
//     .then(response => response.json())
//     .then(result => result.slice(0,5));

//   return result
// }


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
