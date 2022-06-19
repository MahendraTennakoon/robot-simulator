import CommandType from "./commandType";
import Direction from "./direction";
import { parseCommands } from "./commandParser";
import ScannerFactory from "./scanner/scannerFactory";

let positionX: number = -1,
  positionY: number = -1,
  direction: string = "";

const getCommandtype = (command: string) => {
  if (command.startsWith(CommandType.Place)) return CommandType.Place;
  if (command === CommandType.Move) return CommandType.Move;
  if (command === "LEFT" || command === "RIGHT") return CommandType.Turn;
  if (command === CommandType.Report) return CommandType.Report;
};

const place = (command: string) => {
  const [x, y, dir] = command.replace("PLACE ", "").split(",");
  positionX = Number(x);
  positionY = Number(y);
  direction = dir;
};

const move = () => {
  switch (direction) {
    case Direction.North:
      positionY++;
      break;
    case Direction.East:
      positionX++;
      break;
    case Direction.South:
      positionY--;
      break;
    case Direction.West:
      positionX--;
      break;
    default:
      break;
  }
};

const turn = (command: string) => {
  direction = command;
};

const report = () => {
  console.log(`${positionX},${positionY},${direction}`);
};

const executeCommand = (command: string): void => {
  const commandType = getCommandtype(command);
  if (positionX === -1) {
    if (commandType !== CommandType.Place) {
      console.error(
        `Cannot execute command: ${command} because the robot has not been placed`
      );
      return;
    } else {
      place(command);
    }
  }

  switch (commandType) {
    case CommandType.Move:
      move();
      break;
    case CommandType.Turn:
      turn(command);
      break;
    case CommandType.Report:
      report();
      break;
    default:
      break;
  }
};

const init = async () => {
  console.info("Initialized application");
  try {
    console.info("Reading commands");
    const scanner = ScannerFactory.getScanner("file");
    const commands = await scanner.scan();
    const parsedCommands: string[] = parseCommands(commands);

    console.info("Executing commands");
    for (let i = 0; i < parsedCommands.length; i++) {
      executeCommand(parsedCommands[i]);
    }
    console.info("Finished executing commands");
  } catch (error) {
    console.error(error);
  }
};

init();
