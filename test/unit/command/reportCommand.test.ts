import ReportCommand from "../../../src/command/reportCommand";
import { Direction } from "../../../src/direction";
import Robot from "../../../src/robot";

describe("test reportCommand", () => {
  describe("test execute", () => {
    it("should call robot.report", () => {
      const robot = new Robot();
      robot.place(0, 0, Direction.North);
      const robotSpy = jest.spyOn(robot, "report");
      const reportCommand = new ReportCommand(robot);
      reportCommand.execute();

      expect(robotSpy).toHaveBeenCalled();
    });
  });
});
