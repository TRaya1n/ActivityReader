import { Bot } from '../libs/index.ts';
import { GatewayIntentBits as Intents, Partials } from 'discord.js';

module.exports = (start) => {
  const client = new Bot({
    intents: [Intents.Guilds, Intents.GuildMessages, Intents.MessageContent],
    partials: [Partials.GuildMember, Partials.Channel]
  });
  


  client.start();
  client.loggedIn = Date.now() - start;
};
