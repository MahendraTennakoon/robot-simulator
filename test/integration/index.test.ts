import FileScanner from "../../src/scanner/fileScanner";
import ScannerFactory from "../../src/scanner/scannerFactory";
import run from "../../src/index";

describe("test index.ts", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("should print the correct output for a series of valid commands", async () => {
    const mockFileScanner = new FileScanner("commands.txt");
    mockFileScanner.scan = jest
      .fn()
      .mockResolvedValue("PLACE 0,0,NORTH\nMOVE\nRIGHT\nREPORT");
    jest.spyOn(ScannerFactory, "getScanner").mockReturnValue(mockFileScanner);

    const logSpy = jest.spyOn(console, "log");
    await run();
    expect(logSpy).toHaveBeenCalledWith("Report: 0,1,EAST");
  });

  it("should print the correct output by ignoring invalid commands in a series of commands", async () => {
    const mockFileScanner = new FileScanner("commands.txt");
    mockFileScanner.scan = jest
      .fn()
      .mockResolvedValue("PLACE 0,0,NORTH\nMOVE\nLIIGHT\nREPORT");
    jest.spyOn(ScannerFactory, "getScanner").mockReturnValue(mockFileScanner);

    const logSpy = jest.spyOn(console, "log");
    await run();
    expect(logSpy).toHaveBeenCalledWith("Report: 0,1,NORTH");
  });

  it("should ignore all commands before the PLACE command", async () => {
    const mockFileScanner = new FileScanner("commands.txt");
    mockFileScanner.scan = jest
      .fn()
      .mockResolvedValue(
        "MOVE\nRIGHT\nREPORT\nPLACE 0,0,NORTH\nMOVE\nRIGHT\nREPORT"
      );
    jest.spyOn(ScannerFactory, "getScanner").mockReturnValue(mockFileScanner);

    const logSpy = jest.spyOn(console, "log");
    await run();
    expect(logSpy).toHaveBeenCalledWith("Report: 0,1,EAST");
  });

  it("print the correct output when there are multiple place commands", async () => {
    const mockFileScanner = new FileScanner("commands.txt");
    mockFileScanner.scan = jest
      .fn()
      .mockResolvedValue(
        "PLACE 0,0,NORTH\nMOVE\nRIGHT\nPLACE 0,0,NORTH\nREPORT"
      );
    jest.spyOn(ScannerFactory, "getScanner").mockReturnValue(mockFileScanner);

    const logSpy = jest.spyOn(console, "log");
    await run();
    expect(logSpy).toHaveBeenCalledWith("Report: 0,0,NORTH");
  });
});
