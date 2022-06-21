import Robot from "../robot";
import Command from "./command";

class RightCommand implements Command {
  private robot: Robot;

  constructor(robot: Robot) {
    this.robot = robot;
  }

  execute(): void {
    this.robot.right();
  }
}

export default RightCommand;
