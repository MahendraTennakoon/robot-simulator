import LeftCommand from "../command/leftCommand";
import MoveCommand from "../command/moveCommand";
import PlaceCommand from "../command/placeCommand";
import ReportCommand from "../command/reportCommand";
import RightCommand from "../command/rightCommand";
import CommandType from "../command/commandType";
import { Direction } from "../direction";
import Robot from "../robot";
import Command from "../command/command";

class StringCommandParser {
  parse(rawCommands: string, delimiter: RegExp) {
    const commandArray = rawCommands.split(delimiter);
    const factoryFunctions = [];

    for (const command of commandArray) {
      try {
        factoryFunctions.push(this.parseCommand(command));
      } catch (err) {
        console.error(err);
      }
    }

    return factoryFunctions;
  }

  parseCommand(command: string) {
    if (command.startsWith(CommandType.Place)) {
      const [x, y, dir] = command.replace("PLACE ", "").split(",");
      return (robot: Robot) =>
        new PlaceCommand(Number(x), Number(y), dir as Direction, robot);
    } else if (command === CommandType.Move) {
      return (robot: Robot) => new MoveCommand(robot);
    } else if (command === CommandType.Left) {
      return (robot: Robot) => new LeftCommand(robot);
    } else if (command === CommandType.Right) {
      return (robot: Robot) => new RightCommand(robot);
    } else if (command === CommandType.Report) {
      return (robot: Robot) => new ReportCommand(robot);
    } else {
      throw new Error(`Unknown command: ${command}`);
    }
  }
}

export default StringCommandParser;
