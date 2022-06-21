interface CommandParser {
  parse(rawCommands: string, delimiter: string): [any];
}

export default CommandParser;
