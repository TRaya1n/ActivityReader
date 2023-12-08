import { SlashCommandBuilder } from 'discord.js';

export interface SlashCommand {
  permissions?: string[];
  data: SlashCommandBuilder;
  execute: (...args: any) => any;
}