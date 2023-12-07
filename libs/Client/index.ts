import { Client, Options } from "discord.js";

class Bot extends Client {
  constructor(options: Options) {
    super(options);
  }

  public start() {
    this.login(
      process.env.DISCORD_TOKEN
    );
  }
}

module.exports = Bot;