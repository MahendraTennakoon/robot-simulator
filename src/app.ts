import * as readline from "readline";
import ScannerFactory from "./scanner/scannerFactory";
import Robot from "./robot";
import StringCommandParser from "./command-parser/stringCommandParser";

const run = () => {
  return new Promise((resolve, reject) => {
    try {
      console.info("Reading commands");
      const scanner = ScannerFactory.getScanner("file", "commands.txt");
      const inputStream = scanner.scan();
      const robot = new Robot();

      const commandStream = readline.createInterface({
        input: inputStream,
        terminal: false,
      });

      console.info("Executing commands");

      commandStream.on("line", (line) => {
        const commandParser = new StringCommandParser();
        try {
          const commandFactory = commandParser.parseCommand(line);
          const command = commandFactory(robot);
          command.execute();
        } catch (err) {
          console.error(err);
        }
      });

      commandStream.on("close", resolve);
      commandStream.on("error", reject);
    } catch (err) {
      reject(err);
    }
  });
};

export default run;
