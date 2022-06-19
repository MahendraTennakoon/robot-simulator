import FileScanner from "./fileScanner";
import Scanner from "./scanner";

class ScannerFactory {
  static getScanner = (scannerType: string): Scanner => {
    if (scannerType === "file") {
      return new FileScanner();
    }

    throw new Error("Unsupported scanner type");
  };
}
