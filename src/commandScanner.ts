import { promises as fs } from "fs";

export const readCommands = async (): Promise<Buffer> => {
  const commands = await fs.readFile("./commands.txt");
  return commands;
};
