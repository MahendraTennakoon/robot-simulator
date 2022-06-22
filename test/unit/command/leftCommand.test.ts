import LeftCommand from "../../../src/command/leftCommand";
import { Direction } from "../../../src/direction";
import Robot from "../../../src/robot";

describe("test leftCommand", () => {
  describe("test execute", () => {
    it("should call robot.left", () => {
      const robot = new Robot();
      robot.place(0, 0, Direction.North);
      const robotSpy = jest.spyOn(robot, "left");
      const leftCommand = new LeftCommand(robot);
      leftCommand.execute();

      expect(robotSpy).toHaveBeenCalled();
    });
  });
});
