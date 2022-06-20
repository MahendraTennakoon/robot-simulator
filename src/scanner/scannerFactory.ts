import FileScanner from "./fileScanner";
import Scanner from "./scanner";

class ScannerFactory {
  static getScanner = (scannerType: string): Scanner => {
    if (scannerType === "file") {
      // TODO: use a type map instead of string
      return new FileScanner();
    }

    throw new Error("Unsupported scanner type");
  };
}

export default ScannerFactory;
