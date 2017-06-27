/* Startup */

const Discord = require("discord.js");
const config = require("./resources/config.json")
const moment = require("moment");

var args = process.argv.slice(2);

const client = new Discord.Client();
client.login(config.token);

client.on("ready", () => {
  console.log(`Eggplant Bot connected at ${moment().format("h:mm a")}.`);
});

/* Message Triggers */

const triggers = [
  "🍆",
  "😩",
  "💦",
  "eggplant",
  "cum",
  "penis",
  "daddy",
  "thicc"
]

function react(input) {
  input.react("🍆").then( () => input.react("💦") );
}

client.on("message", (message) => {
  if (triggers.some(triggers => message.content.toLowerCase().includes(triggers))) {
    react(message);
    if (args.includes("-d")) console.log(`[${moment().format("h:mm a")}] Reacted to a new message.`);
  }
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  if (triggers.some(triggers => newMessage.content.toLowerCase().includes(triggers))) {
    react(newMessage);
    if (args.includes("-d")) console.log(`[${moment().format("h:mm a")}] Reacted to edited message.`);
  }

  if (!triggers.some(triggers => newMessage.content.toLowerCase().includes(triggers))) {
    newMessage.clearReactions();
    if (args.includes("-d")) console.log(`[${moment().format("h:mm a")}] Removed reaction to edited message.`);
  }
})

/* Debug */ 

client.on("debug", (info) => {
  if (args.includes("-d")) console.log(info);
})