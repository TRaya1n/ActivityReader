import { ApplicationCommandResolvable, Client, Collection, REST, Routes } from "discord.js";
import { SlashCommand } from "../Interfaces/SlashCommand";

class Bot {
  public commands = new Collection<string, SlashCommand>();
  public slashCommands = new Array<ApplicationCommandResolvable>;
  public readonly prefix = "a8;";

  public constructor(public readonly client: Client) {
    this.client.login(process.env.DISCORD_TOKEN);


  }

  private deployApplicationCommands() {
    const rest = new REST({ version: 'v10' }).setToken(process.env.DISCORD_TOKEN);

    rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: Array
    })
  }
}

module.exports = Bot;