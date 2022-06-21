import CommandType from "./commandType";
import { Direction } from "./direction";
import { parseCommands } from "./commandParser";
import ScannerFactory from "./scanner/scannerFactory";
import Robot from "./robot";
import Invoker from "./command/invoker";
import MoveCommand from "./command/moveCommand";
import PlaceCommand from "./command/placeCommand";

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
    let invoker;
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
          invoker = new Invoker(
            new MoveCommand(robot),
            new PlaceCommand(Number(x), Number(y), dir as Direction, robot)
          );
          invoker.place();
        }
      }

      switch (commandType) {
        case CommandType.Move:
          try {
            invoker && invoker.move(); //TODO: remove if possible
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
