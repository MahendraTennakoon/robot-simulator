import Command from "../command/command";
import LeftCommand from "../command/leftCommand";
import MoveCommand from "../command/moveCommand";
import PlaceCommand from "../command/placeCommand";
import ReportCommand from "../command/reportCommand";
import RightCommand from "../command/rightCommand";
import CommandType from "../command/commandType";
import { Direction } from "../direction";
import Robot from "../robot";

class StringCommandParser {
  parse(rawCommands: string, delimiter: RegExp) {
    const commandArray = rawCommands.split(delimiter);
    const factoryFunctions = [];

    for (const command of commandArray) {
      if (command.startsWith(CommandType.Place)) {
        // TODO: handle invalid command params
        const [x, y, dir] = command.replace("PLACE ", "").split(",");
        factoryFunctions.push(
          (robot: Robot) =>
            new PlaceCommand(Number(x), Number(y), dir as Direction, robot)
        );
      } else if (command === CommandType.Move) {
        factoryFunctions.push((robot: Robot) => new MoveCommand(robot));
      } else if (command === CommandType.Left) {
        factoryFunctions.push((robot: Robot) => new LeftCommand(robot));
      } else if (command === CommandType.Right) {
        factoryFunctions.push((robot: Robot) => new RightCommand(robot));
      } else if (command === CommandType.Report) {
        factoryFunctions.push((robot: Robot) => new ReportCommand(robot));
      } else {
        console.error(`Unknown command: ${command}`);
      }
    }

    return factoryFunctions;
  }
}

export default StringCommandParser;
