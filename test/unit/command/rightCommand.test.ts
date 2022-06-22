import RightCommand from "../../../src/command/rightCommand";
import { Direction } from "../../../src/direction";
import Robot from "../../../src/robot";

describe("test rightCommand", () => {
  describe("test execute", () => {
    it("should call robot.right", () => {
      const robot = new Robot();
      robot.place(0, 0, Direction.North);
      const robotSpy = jest.spyOn(robot, "right");
      const rightCommand = new RightCommand(robot);
      rightCommand.execute();

      expect(robotSpy).toHaveBeenCalled();
    });
  });
});
