/**
 * This class can be modified to maintain a history of commands and to support undo operations
 */
import LeftCommand from "./leftCommand";
import MoveCommand from "./moveCommand";
import PlaceCommand from "./placeCommand";
import ReportCommand from "./reportCommand";
import RightCommand from "./rightCommand";

class Invoker {
  private moveCommand: MoveCommand;
  private placeCommad: PlaceCommand;
  private leftCommand: LeftCommand;
  private rightCommand: RightCommand;
  private reportCommand: ReportCommand;

  constructor(
    moveCommand: MoveCommand,
    placeCommad: PlaceCommand,
    leftCommand: LeftCommand,
    rightCommand: RightCommand,
    reportCommand: ReportCommand
  ) {
    this.moveCommand = moveCommand;
    this.placeCommad = placeCommad;
    this.leftCommand = leftCommand;
    this.rightCommand = rightCommand;
    this.reportCommand = reportCommand;
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

  report(): void {
    this.reportCommand.execute();
  }
}

export default Invoker;
