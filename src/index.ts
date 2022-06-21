import ScannerFactory from "./scanner/scannerFactory";
import Robot from "./robot";
import StringCommandParser from "./command-parser/stringCommandParser";
import Command from "./command/command";

const run = async () => {
  console.info("Initialized application");
  try {
    console.info("Reading commands");
    const scanner = ScannerFactory.getScanner("file");
    const rawCommands = await scanner.scan();
    const robot = new Robot();
    const commandFactoryFunctions = new StringCommandParser().parse(
      rawCommands,
      /\r?\n/
    );

    console.info("Executing commands");
    commandFactoryFunctions.forEach((factory) => {
      const command: Command = factory(robot);
      try {
        command.execute();
      } catch (err) {
        console.error(err);
      }
    });
    console.info("Finished executing commands");
  } catch (error) {
    console.error(error);
  }
};

run();
