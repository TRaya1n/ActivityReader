import {
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Get the ping of the bot"),
  execute: async (client: Client, interaction: ChatInputCommandInteraction) => {
    await interaction.deferReply({ ephemeral: true });

    const ping = client.ws.ping,
      pingS = client.ws.ping / 1000;

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `${client.user?.username}`,
        iconURL: client.user?.displayAvatarURL(),
      })
      .setDescription(`${codeBlok("/")} **${ping}ms** (${pingS}s)`)
      .setTimestamp()
      .setColor("Aqua");

    interaction.editReply({ embeds: [embed] });
  },
};

function codeBlok(s) {
  return `\`${s}\``;
}
