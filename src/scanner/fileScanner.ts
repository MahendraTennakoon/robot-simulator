import fs from "fs";

import Scanner from "./scanner";

class FileScanner implements Scanner {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  scan(): NodeJS.ReadableStream {
    const readStream = fs.createReadStream(this.filePath, {
      encoding: "utf8",
    });
    return readStream;
  }
}

export default FileScanner;
