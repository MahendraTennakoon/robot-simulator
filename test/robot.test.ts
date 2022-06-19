import Robot from "../src/robot";

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
        expect(err.message).toBe(`Position 6 is out of bounds`);
      }
    });

    it("should throw an error if x is less than zero", () => {
      expect.assertions(1);
      const robot = new Robot();
      try {
        robot.setPositionX(-1);
      } catch (err: any) {
        expect(err.message).toBe(`Position -1 is out of bounds`);
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
        expect(err.message).toBe(`Position 6 is out of bounds`);
      }
    });

    it("should throw an error if y is less than zero", () => {
      expect.assertions(1);
      const robot = new Robot();
      try {
        robot.setPositionY(-1);
      } catch (err: any) {
        expect(err.message).toBe(`Position -1 is out of bounds`);
      }
    });
  });
});
