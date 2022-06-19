interface Robot {
  id: string;
  positionX: number;
  positionY: number;
  direction: string;
}

interface BaseRecord {
  id: string;
}

interface Database<T extends BaseRecord> {
  set(newValue: T): void;
  get(id: string): T | undefined;
}

function createDatabase<T extends BaseRecord>() {
  class InMemoryDatabase implements Database<T> {
    private db: Record<string, T> = {};

    public set(newValue: T): void {
      this.db[newValue.id] = newValue;
    }
    public get(id: string): T {
      return this.db[id];
    }
  }

  return InMemoryDatabase;
}

const RobotDB = createDatabase<Robot>();
const robotDB = new RobotDB();

robotDB.set({
  id: "001",
  direction: "NORTH",
  positionX: 0,
  positionY: 0,
});

console.log(robotDB.get("001"));
