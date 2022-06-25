import FileScanner from "../../src/scanner/fileScanner";
import ScannerFactory from "../../src/scanner/scannerFactory";
import run from "../../src/app";
import fs from "fs";

describe("test index.ts", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("should print the correct output for a series of valid commands", (done) => {
    expect.assertions(1);
    const logSpy = jest.spyOn(console, "log");
    const mockReadStream = fs.createReadStream(
      __dirname + "/mock-data/validCommands.txt",
      {
        encoding: "utf8",
      }
    );

    const mockFileScanner = new FileScanner("commands.txt");
    mockFileScanner.scan = jest.fn().mockReturnValue(mockReadStream);
    jest.spyOn(ScannerFactory, "getScanner").mockReturnValue(mockFileScanner);

    run().then(() => {
      expect(logSpy).toHaveBeenCalledWith("Report: 0,1,EAST");
      done();
    });
  });

  it("should print the correct output by ignoring invalid commands in a series of commands", (done) => {
    expect.assertions(1);
    const logSpy = jest.spyOn(console, "log");
    const mockReadStream = fs.createReadStream(
      __dirname + "/mock-data/validAndInvalidCommands.txt",
      {
        encoding: "utf8",
      }
    );

    const mockFileScanner = new FileScanner("commands.txt");
    mockFileScanner.scan = jest.fn().mockReturnValue(mockReadStream);
    jest.spyOn(ScannerFactory, "getScanner").mockReturnValue(mockFileScanner);

    run().then(() => {
      expect(logSpy).toHaveBeenCalledWith("Report: 0,1,NORTH");
      done();
    });
  });

  it("should ignore all commands before the PLACE command", (done) => {
    expect.assertions(1);
    const logSpy = jest.spyOn(console, "log");
    const mockReadStream = fs.createReadStream(
      __dirname + "/mock-data/validCommandsBeforePlace.txt",
      {
        encoding: "utf8",
      }
    );

    const mockFileScanner = new FileScanner("commands.txt");
    mockFileScanner.scan = jest.fn().mockReturnValue(mockReadStream);
    jest.spyOn(ScannerFactory, "getScanner").mockReturnValue(mockFileScanner);

    run().then(() => {
      expect(logSpy).toHaveBeenCalledWith("Report: 0,1,EAST");
      done();
    });
  });

  it("should print the correct output when there are multiple place commands", (done) => {
    expect.assertions(1);
    const logSpy = jest.spyOn(console, "log");
    const mockReadStream = fs.createReadStream(
      __dirname + "/mock-data/multiplePlaceCommands.txt",
      {
        encoding: "utf8",
      }
    );

    const mockFileScanner = new FileScanner("commands.txt");
    mockFileScanner.scan = jest.fn().mockReturnValue(mockReadStream);
    jest.spyOn(ScannerFactory, "getScanner").mockReturnValue(mockFileScanner);

    run().then(() => {
      expect(logSpy).toHaveBeenCalledWith("Report: 0,0,NORTH");
      done();
    });
  });
});
