import StringCommandParser from "../../../src/command-parser/stringCommandParser";
import MoveCommand from "../../../src/command/moveCommand";
import PlaceCommand from "../../../src/command/placeCommand";
import ReportCommand from "../../../src/command/reportCommand";
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
      const rawCommands = "PLACE 1,2,NORTH\nMOVE\nREPORT";
      const parsedCommands = new StringCommandParser().parse(
        rawCommands,
        /\r?\n/
      );
      expect(parsedCommands.length).toBe(3);
      const robot = new Robot();
      expect(parsedCommands[0](robot)).toEqual(
        new PlaceCommand(1, 2, Direction.North, robot)
      );
      expect(parsedCommands[1](robot)).toEqual(new MoveCommand(robot));
      expect(parsedCommands[2](robot)).toEqual(new ReportCommand(robot));
    });

    it("should exclude invalid commands in the rawString", () => {
      const rawCommands = "PLACE 1,2,NORTH\nMOVO\nREPORT";
      const parsedCommands = new StringCommandParser().parse(
        rawCommands,
        /\r?\n/
      );
      expect(parsedCommands.length).toBe(2);
      const robot = new Robot();
      expect(parsedCommands[0](robot)).toEqual(
        new PlaceCommand(1, 2, Direction.North, robot)
      );
      expect(parsedCommands[1](robot)).toEqual(new ReportCommand(robot));
    });
  });
});
