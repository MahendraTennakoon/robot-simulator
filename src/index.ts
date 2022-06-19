import CommandType from "./commandType";
import Direction from "./direction";
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
          // TODO: simplify
          let direction: Direction = Direction.North;
          if (dir === Direction.North) {
            direction = Direction.North;
          } else if (dir === Direction.East) {
            direction = Direction.East;
          } else if (dir === Direction.South) {
            direction = Direction.South;
          } else if (dir === Direction.West) {
            direction = Direction.West;
          }
          robot.place(Number(x), Number(y), direction);
        }
      }

      switch (commandType) {
        case CommandType.Move:
          robot.move();
          break;
        case CommandType.Turn:
          // TODO: simplify
          let direction: Direction = Direction.North;
          if (command === Direction.North) {
            direction = Direction.North;
          } else if (command === Direction.East) {
            direction = Direction.East;
          } else if (command === Direction.South) {
            direction = Direction.South;
          } else if (command === Direction.West) {
            direction = Direction.West;
          }
          robot.setDirection(direction);
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
