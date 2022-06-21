import MoveCommand from "./moveCommand";
import PlaceCommand from "./placeCommand";

class Invoker {
  private moveCommand: MoveCommand;
  private placeCommad: PlaceCommand;

  constructor(moveCommand: MoveCommand, placeCommad: PlaceCommand) {
    this.moveCommand = moveCommand;
    this.placeCommad = placeCommad;
  }

  move(): void {
    this.moveCommand.execute();
  }

  place(): void {
    this.placeCommad.execute();
  }
}

export default Invoker;
