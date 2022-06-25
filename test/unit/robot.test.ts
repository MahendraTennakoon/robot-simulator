import { Direction } from "../../src/direction";
import Robot from "../../src/robot";

describe("test Robot", () => {
  describe("test Robot.setPositionX", () => {
    it("should set positionX if x is valid", () => {
      const robot = new Robot();
      robot.setPositionX(1);
      expect(robot.getPositionX()).toBe(1);
    });

    it("should throw an error if x is greater than the table width", () => {
      expect.assertions(1);
      const robot = new Robot();
      try {
        robot.setPositionX(6);
      } catch (err: any) {
        expect(err.message).toBe(`Position 6 is out of bounds on X axis`);
      }
    });

    it("should throw an error if x is less than zero", () => {
      expect.assertions(1);
      const robot = new Robot();
      try {
        robot.setPositionX(-1);
      } catch (err: any) {
        expect(err.message).toBe(`Position -1 is out of bounds on X axis`);
      }
    });
  });

  describe("test Robot.setPositionY", () => {
    it("should set positionY if y is valid", () => {
      const robot = new Robot();
      robot.setPositionY(1);
      expect(robot.getPositionY()).toBe(1);
    });

    it("should throw an error if y is greater than the table height", () => {
      expect.assertions(1);
      const robot = new Robot();
      try {
        robot.setPositionY(6);
      } catch (err: any) {
        expect(err.message).toBe(`Position 6 is out of bounds on Y axis`);
      }
    });

    it("should throw an error if y is less than zero", () => {
      expect.assertions(1);
      const robot = new Robot();
      try {
        robot.setPositionY(-1);
      } catch (err: any) {
        expect(err.message).toBe(`Position -1 is out of bounds on Y axis`);
      }
    });
  });

  describe("test Robot.left", () => {
    it("should throw an error if the robot is not placed on the table", () => {
      expect.assertions(1);
      const robot = new Robot();
      try {
        robot.left();
      } catch (err: any) {
        expect(err.message).toBe(
          "Cannot execute command: LEFT because the robot has not been placed"
        );
      }
    });

    it("should set direction to West if direction is North", () => {
      const robot = new Robot();
      robot.setIsPlaced(true);
      robot.setDirection(Direction.North);
      robot.left();
      expect(robot.getDirection()).toBe(Direction.West);
    });

    it("should set direction to South if direction is West", () => {
      const robot = new Robot();
      robot.setIsPlaced(true);
      robot.setDirection(Direction.West);
      robot.left();
      expect(robot.getDirection()).toBe(Direction.South);
    });

    it("should set direction to East if direction is South", () => {
      const robot = new Robot();
      robot.setIsPlaced(true);
      robot.setDirection(Direction.South);
      robot.left();
      expect(robot.getDirection()).toBe(Direction.East);
    });

    it("should set direction to North if direction is East", () => {
      const robot = new Robot();
      robot.setIsPlaced(true);
      robot.setDirection(Direction.East);
      robot.left();
      expect(robot.getDirection()).toBe(Direction.North);
    });
  });

  describe("test Robot.right", () => {
    it("should throw an error if the robot is not placed on the table", () => {
      expect.assertions(1);
      const robot = new Robot();
      try {
        robot.right();
      } catch (err: any) {
        expect(err.message).toBe(
          "Cannot execute command: RIGHT because the robot has not been placed"
        );
      }
    });

    it("should set direction to East if direction is North", () => {
      const robot = new Robot();
      robot.setIsPlaced(true);
      robot.setDirection(Direction.North);
      robot.right();
      expect(robot.getDirection()).toBe(Direction.East);
    });

    it("should set direction to North if direction is West", () => {
      const robot = new Robot();
      robot.setIsPlaced(true);
      robot.setDirection(Direction.West);
      robot.right();
      expect(robot.getDirection()).toBe(Direction.North);
    });

    it("should set direction to West if direction is South", () => {
      const robot = new Robot();
      robot.setIsPlaced(true);
      robot.setDirection(Direction.South);
      robot.right();
      expect(robot.getDirection()).toBe(Direction.West);
    });

    it("should set direction to South if direction is East", () => {
      const robot = new Robot();
      robot.setIsPlaced(true);
      robot.setDirection(Direction.East);
      robot.right();
      expect(robot.getDirection()).toBe(Direction.South);
    });
  });

  describe("test Robot.move", () => {
    it("should throw an error if the robot is not placed on the table", () => {
      expect.assertions(1);
      const robot = new Robot();
      try {
        robot.move();
      } catch (err: any) {
        expect(err.message).toBe(
          "Cannot execute command: MOVE because the robot has not been placed"
        );
      }
    });

    it("should throw an error if the robot is trying to move out of the table", () => {
      expect.assertions(1);
      const robot = new Robot();
      robot.place(0, 4, Direction.North);
      try {
        robot.move();
      } catch (err: any) {
        expect(err.message).toBe("Position 5 is out of bounds on Y axis");
      }
    });

    it("should increment the positionY if the robot is facing North and is not trying to move out of the table", () => {
      const robot = new Robot();
      robot.place(0, 0, Direction.North);
      robot.move();
      expect(robot.getPositionY()).toBe(1);
    });

    it("should decrement the positionY if the robot is facing South and is not trying to move out of the table", () => {
      const robot = new Robot();
      robot.place(0, 4, Direction.South);
      robot.move();
      expect(robot.getPositionY()).toBe(3);
    });

    it("should increment the positionX if the robot is facing East and is not trying to move out of the table", () => {
      const robot = new Robot();
      robot.place(0, 0, Direction.East);
      robot.move();
      expect(robot.getPositionX()).toBe(1);
    });

    it("should decrement the positionX if the robot is facing West and is not trying to move out of the table", () => {
      const robot = new Robot();
      robot.place(4, 0, Direction.West);
      robot.move();
      expect(robot.getPositionX()).toBe(3);
    });
  });
});
