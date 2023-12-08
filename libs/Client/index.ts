import {
  ApplicationCommandResolvable,
  Client,
  ClientEvents,
  ClientOptions,
  Collection,
  Events,
  REST,
  Routes,
} from "discord.js";
import { SlashCommand } from "../Interfaces/SlashCommand";
import { readdirSync } from "fs";

export class Bot extends Client {
  constructor(Options: ClientOptions) {
    super(Options);

    this.on(Events.ClientReady, () => {
      this.deployApplicationCommands();
    });
    this.ReadEventFiles();
    this.ChatInputCommandInteractionHandler();
  }

  public commands = new Collection<string, SlashCommand>();
  public slashCommands = new Array<ApplicationCommandResolvable>();

  private async deployApplicationCommands() {
    const rest = new REST({ version: "10" }).setToken(
      process.env.DISCORD_TOKEN,
    );

    const commandFiles = readdirSync("./src/commands/");
    for (const file of commandFiles) {
      const command = await import(`../../src/commands/${file}`);
      this.slashCommands.push(command.default.data);
      this.commands.set(command.default.data.name, command.default);
    }

    await rest.put(Routes.applicationCommands(this.user!.id), {
      body: this.slashCommands,
    });
  }

  private ChatInputCommandInteractionHandler() {
    this.on(Events.InteractionCreate, (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      const command = this.commands.get(interaction.commandName);

      if (!command) {
        console.log("?....");
        return;
      }

      command.execute(this, interaction);
    });
  }

  private async ReadEventFiles() {
    interface Event {
      default: {
        name: string[];
        once?: Boolean[];
        execute: (...args: any) => any;
      };
    }

    const files = readdirSync("./src/events/");
    for (const file of files) {
      const event: Event = await import(`../../src/events/${file}`);

      this[event.default.once ? "once" : "on"](
        `${event.default.name}`,
        (...args: any[]) => event.default.execute(...args),
      );
    }
  }
}
