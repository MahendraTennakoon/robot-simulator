import PlaceCommand from "../../../src/command/placeCommand";
import { Direction } from "../../../src/direction";
import Robot from "../../../src/robot";

describe("test placeCommand", () => {
  describe("test execute", () => {
    it("should call robot.place", () => {
      const robot = new Robot();
      const robotSpy = jest.spyOn(robot, "place");
      const placeCommand = new PlaceCommand(1, 2, Direction.North, robot);
      placeCommand.execute();

      expect(robotSpy).toHaveBeenCalledWith(1, 2, Direction.North);
    });
  });
});
