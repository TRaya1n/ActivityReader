import { Bot } from "../libs/Client/index";
import { GatewayIntentBits as Intents, Partials } from "discord.js";

const client = new Bot({
  intents: [Intents.Guilds, Intents.GuildMessages, Intents.MessageContent],
  partials: [Partials.GuildMember, Partials.Channel],
});

client.login();
