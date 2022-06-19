import CommandType from "./commandType";
import { Direction } from "./direction";
import { parseCommands } from "./commandParser";
import ScannerFactory from "./scanner/scannerFactory";
import Robot from "./robot";

const getCommandtype = (command: string) => {
  if (command.startsWith(CommandType.Place)) return CommandType.Place;
  if (command === CommandType.Move) return CommandType.Move;
  if (command === "LEFT" || command === "RIGHT") return CommandType.Turn;
  if (command === CommandType.Report) return CommandType.Report;
};

const run = async () => {
  console.info("Initialized application");
  try {
    console.info("Reading commands");
    const scanner = ScannerFactory.getScanner("file");
    const commands = await scanner.scan();
    const parsedCommands: string[] = parseCommands(commands);
    const robot = new Robot();

    console.info("Executing commands");
    for (let i = 0; i < parsedCommands.length; i++) {
      const command = parsedCommands[i];
      const commandType = getCommandtype(command);

      if (!robot.getIsPlaced()) {
        if (commandType !== CommandType.Place) {
          console.error(
            `Cannot execute command: ${command} because the robot has not been placed`
          );
          continue;
        } else {
          const [x, y, dir] = command.replace("PLACE ", "").split(",");
          robot.place(Number(x), Number(y), dir as Direction);
        }
      }

      switch (commandType) {
        case CommandType.Move:
          try {
            robot.move();
          } catch (err) {
            console.error(err);
          }
          break;
        case CommandType.Turn:
          robot.setDirection(command as Direction);
          break;
        case CommandType.Report:
          console.log(robot.report());
          break;
        default:
          break;
      }
    }
    console.info("Finished executing commands");
  } catch (error) {
    console.error(error);
  }
};

run();
