import Robot from "../robot";
import Command from "./command";

class MoveCommand implements Command {
  private robot: Robot;

  constructor(robot: Robot) {
    this.robot = robot;
  }

  execute(): void {
    this.robot.move();
  }
}

export default MoveCommand;
