import { Bot } from "../libs/Client/index";
import { GatewayIntentBits as Intents, Partials } from "discord.js";
import { Logger } from "./functions/logger";

const client = new Bot({
  intents: [Intents.Guilds, Intents.GuildMessages, Intents.MessageContent],
  partials: [Partials.GuildMember, Partials.Channel],
});

const logger = new Logger({ date: true });
console.log = logger.log;
console.error = logger.error;

client.login();
