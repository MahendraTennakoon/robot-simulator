import LeftCommand from "./leftCommand";
import MoveCommand from "./moveCommand";
import PlaceCommand from "./placeCommand";
import RightCommand from "./rightCommand";

class Invoker {
  private moveCommand: MoveCommand;
  private placeCommad: PlaceCommand;
  private leftCommand: LeftCommand;
  private rightCommand: RightCommand;

  constructor(
    moveCommand: MoveCommand,
    placeCommad: PlaceCommand,
    leftCommand: LeftCommand,
    rightCommand: RightCommand
  ) {
    this.moveCommand = moveCommand;
    this.placeCommad = placeCommad;
    this.leftCommand = leftCommand;
    this.rightCommand = rightCommand;
  }

  move(): void {
    this.moveCommand.execute();
  }

  place(): void {
    this.placeCommad.execute();
  }

  left(): void {
    this.leftCommand.execute();
  }

  right(): void {
    this.rightCommand.execute();
  }
}

export default Invoker;
