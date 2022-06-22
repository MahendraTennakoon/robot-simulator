import MoveCommand from "../../../src/command/moveCommand";
import { Direction } from "../../../src/direction";
import Robot from "../../../src/robot";

describe("test moveCommand", () => {
  describe("test execute", () => {
    it("should call robot.move", () => {
      const robot = new Robot();
      robot.place(0, 0, Direction.North);
      const robotSpy = jest.spyOn(robot, "move");
      const moveCommand = new MoveCommand(robot);
      moveCommand.execute();

      expect(robotSpy).toHaveBeenCalled();
    });
  });
});
