import Robot from "../robot";
import Command from "./command";

class LeftCommand implements Command {
  private robot: Robot;

  constructor(robot: Robot) {
    this.robot = robot;
  }

  execute(): void {
    this.robot.left();
  }
}

export default LeftCommand;
