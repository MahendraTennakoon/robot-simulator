import { Direction } from "./direction";
import config from "../config.json";

class Robot {
  private positionX: number = 0;
  private positionY: number = 0;
  private direction: Direction = Direction.North;
  private isPlaced: boolean = false;

  setPositionX(position: number): void {
    // TODO: remove tight coupling with configs
    if (position > config.TABLE_WIDTH - 1 || position < 0) {
      throw new Error(`Position ${position} is out of bounds on X axis`);
    }
    this.positionX = position;
  }

  getPositionX(): number {
    return this.positionX;
  }

  setPositionY(position: number): void {
    if (position > config.TABLE_HEIGHT - 1 || position < 0) {
      throw new Error(`Position ${position} is out of bounds on Y axis`);
    }
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

  place(x: number, y: number, direction: Direction): void {
    this.setPositionX(x);
    this.setPositionY(y);
    this.setDirection(direction);
    this.setIsPlaced(true);
  }

  move(): void {
    switch (this.direction) {
      case Direction.North:
        this.setPositionY(this.positionY + 1);
        break;
      case Direction.East:
        this.setPositionX(this.positionX + 1);
        break;
      case Direction.South:
        this.setPositionY(this.positionY - 1);
        break;
      case Direction.West:
        this.setPositionX(this.positionX - 1);
        break;
      default:
        break;
    }
  }

  report(): string {
    if (!this.getIsPlaced()) return "Robot has not been placed on the table";
    return `${this.positionX},${this.positionY},${this.direction}`;
  }
}

export default Robot;
