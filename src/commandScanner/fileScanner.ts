import { promises as fs } from "fs";

import Scanner from "./scanner";

class FileScanner implements Scanner {
  async scan(): Promise<string> {
    const commands = await fs.readFile("./commands.txt");
    return commands.toString();
  }
}

export default FileScanner;
