import { promises as fs } from "fs";

import Scanner from "./scanner";

class FileScanner implements Scanner {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async scan(): Promise<string> {
    const commands = await fs.readFile(this.filePath);
    return commands.toString();
  }
}

export default FileScanner;
