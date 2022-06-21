import CommandType from "./commandType";
import { Direction } from "./direction";
import { parseCommands } from "./commandParser";
import ScannerFactory from "./scanner/scannerFactory";
import Robot from "./robot";
import Invoker from "./command/invoker";
import MoveCommand from "./command/moveCommand";
import PlaceCommand from "./command/placeCommand";
import LeftCommand from "./command/leftCommand";
import RightCommand from "./command/rightCommand";
import ReportCommand from "./command/reportCommand";

const getCommandtype = (command: string) => {
  if (command.startsWith(CommandType.Place)) return CommandType.Place;
  if (command === CommandType.Move) return CommandType.Move;
  if (command === CommandType.Left) return CommandType.Left;
  if (command === CommandType.Right) return CommandType.Right;
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
            new PlaceCommand(Number(x), Number(y), dir as Direction, robot),
            new LeftCommand(robot),
            new RightCommand(robot),
            new ReportCommand(robot)
          );
          invoker.place();
        }
      }

      switch (commandType) {
        case CommandType.Move:
          try {
            invoker?.move();
          } catch (err) {
            console.error(err);
          }
          break;
        case CommandType.Left:
          invoker?.left();
          break;
        case CommandType.Right:
          invoker?.right();
          break;
        case CommandType.Report:
          invoker?.report();
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
