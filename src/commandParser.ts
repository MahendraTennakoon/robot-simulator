export const parseCommands = (commands: Buffer) => {
  return commands.toString("utf-8").split(/\r?\n/);
};
