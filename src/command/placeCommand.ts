import { Direction } from "../direction";
import Robot from "../robot";
import Command from "./command";

class PlaceCommand implements Command {
  private x: number;
  private y: number;
  private direction: Direction;
  private robot: Robot;

  constructor(x: number, y: number, direction: Direction, robot: Robot) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.robot = robot;
  }

  execute() {
    this.robot.place(this.x, this.y, this.direction);
  }
}

export default PlaceCommand;
