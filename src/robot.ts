import Direction from "./direction";

class Robot {
  private positionX: number = 0;
  private positionY: number = 0;
  private direction: Direction = Direction.North; // TODO: should this be a type instead of an enum
  private isPlaced: boolean = false;

  setPositionX(position: number): void {
    this.positionX = position;
  }

  getPositionX(): number {
    return this.positionX;
  }

  setPositionY(position: number): void {
    this.positionY = position;
  }

  getPositionY(): number {
    return this.positionY;
  }

  setIsPlaced(isPlaced: boolean): void {
    this.isPlaced = isPlaced;
  }

  getIsPlaced(): boolean {
    return this.isPlaced;
  }

  setDirection(direction: Direction): void {
    this.direction = direction;
  }

  getDirection(): Direction {
    return this.direction;
  }
}

export default Robot;
