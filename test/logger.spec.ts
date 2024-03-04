import "mocha";
import { expect } from "chai";

import { Log, Logger } from "../src/logger";

describe("Logger:", () => {
    let loggerInstance = Logger.getLoggerInstance();
    it("debería añadir logs correctamente", () => {
      let logToAdd: Log = ["Mario", "", new Date("2024-03-16")];
      let logs: Log[] = [];
      loggerInstance.addLog(logToAdd);
      expect();
      for (const log of loggerInstance) {
        log.print();
      }
      
    });
});