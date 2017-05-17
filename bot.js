const Discord = require("discord.js");
const config = require("./resources/config.json")
const moment = require("moment");

const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Eggplant Bot connected at ${moment().format("h:mm a")}.`);
});

client.on("disconnect", () => {
  console.log(`Eggplant Bot disconnected at ${moment().format("h:mm a")}`);
});

client.on("message", (message) => {
  if (message.content.includes("🍆")) {
    message.react("🍆").then( () => message.react("💦") )
  };
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  if (!oldMessage.content.includes("🍆") && newMessage.content.includes("🍆")) {
    newMessage.react("🍆").then( () => newMessage.react("💦") )
  }
});

client.login(config.token);