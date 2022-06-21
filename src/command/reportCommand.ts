import Robot from "../robot";
import Command from "./command";

class ReportCommand implements Command {
  private robot: Robot;

  constructor(robot: Robot) {
    this.robot = robot;
  }

  execute(): void {
    this.robot.report();
  }
}

export default ReportCommand;
