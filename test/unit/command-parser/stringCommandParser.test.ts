import StringCommandParser from "../../../src/command-parser/stringCommandParser";
import LeftCommand from "../../../src/command/leftCommand";
import MoveCommand from "../../../src/command/moveCommand";
import PlaceCommand from "../../../src/command/placeCommand";
import ReportCommand from "../../../src/command/reportCommand";
import RightCommand from "../../../src/command/rightCommand";
import { Direction } from "../../../src/direction";
import Robot from "../../../src/robot";

describe("test stringCommandParser", () => {
  describe("test parse", () => {
    it("should return an empty array if rawCommands is an empty string", () => {
      const rawCommands = "";
      const parsedCommands = new StringCommandParser().parse(
        rawCommands,
        /\r?\n/
      );
      expect(parsedCommands).toEqual([]);
    });

    it("should return an array of command factory functions by splitting the the rawString by the delimiter", () => {
      const rawCommands = "PLACE 1,2,NORTH\nMOVE\nREPORT\nLEFT\nRIGHT";
      const parsedCommands = new StringCommandParser().parse(
        rawCommands,
        /\r?\n/
      );
      const robot = new Robot();
      expect(parsedCommands[0](robot)).toStrictEqual(
        new PlaceCommand(1, 2, Direction.North, robot)
      );
      expect(parsedCommands[1](robot)).toStrictEqual(new MoveCommand(robot));
      expect(parsedCommands[2](robot)).toStrictEqual(new ReportCommand(robot));
      expect(parsedCommands[3](robot)).toStrictEqual(new LeftCommand(robot));
      expect(parsedCommands[4](robot)).toStrictEqual(new RightCommand(robot));
    });

    it("should exclude invalid commands in the rawString", () => {
      const rawCommands = "PLACE 1,2,NORTH\nMOVO\nREPORT";
      const parsedCommands = new StringCommandParser().parse(
        rawCommands,
        /\r?\n/
      );
      expect(parsedCommands.length).toBe(2);
      const robot = new Robot();
      expect(parsedCommands[0](robot)).toStrictEqual(
        new PlaceCommand(1, 2, Direction.North, robot)
      );
      expect(parsedCommands[1](robot)).toStrictEqual(new ReportCommand(robot));
    });
  });
});
