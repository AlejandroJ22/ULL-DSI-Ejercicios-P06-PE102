export type Log = {
  user: string;
  action: string;
  date: Date;
};

interface LoggerInterface {
  addLog(log: Log): void;
  userLogs(username: string): string[];
  actionsLogs(action: string): string[];
  actionsOnDate(firstDate: Date, secondDate: Date): string[];
}

export class Logger implements LoggerInterface, Iterable<Log> {
  private numberOfProcces: number;
  private logs: Map<number, Log>;

  private static loggerInstance: Logger;

  private constructor() {
    this.numberOfProcces = 0;
    this.logs = new Map<number, Log>();
  }

  public static getLoggerInstance(): Logger {
    if (!Logger.loggerInstance) {
      Logger.loggerInstance = new Logger();
    }
    return Logger.loggerInstance;
  }

//   getLogs(): Map<number, Log> {
//   }

  addLog(log: Log): void {
    Logger.loggerInstance.logs.set(this.numberOfProcces, log);
    ++this.numberOfProcces;
  }

  userLogs(username: string): string[] {
    let coincidences: string[] = [];
    Logger.loggerInstance.logs.forEach((log) => {
      if (log.user === username) {
        coincidences.push(
          log.user,
          ": ",
          log.action,
          " [",
          log.date.toLocaleDateString(),
          "]",
        );
      }
    });
    return coincidences;
  }

  actionsLogs(action: string): string[] {
    let coincidences: string[] = [];
    Logger.loggerInstance.logs.forEach((log) => {
      if (log.action.toLowerCase().includes(action.toLowerCase())) {
        coincidences.push(
          log.user,
          ": ",
          log.action,
          " [",
          log.date.toLocaleDateString(),
          "]",
        );
      }
    });
    return coincidences;
  }

  actionsOnDate(firstDate: Date, secondDate: Date): string[] {
    let coincidences: string[] = [];
    if (firstDate > secondDate) {
      Logger.loggerInstance.logs.forEach((log) => {
        if (log.date > firstDate && log.date < secondDate) {
          coincidences.push(
            log.user,
            ": ",
            log.action,
            " [",
            log.date.toLocaleDateString(),
            "]",
          );
        }
      });
    } else {
      Logger.loggerInstance.logs.forEach((log) => {
        if (log.date < firstDate && log.date > secondDate) {
          coincidences.push(
            log.user,
            ": ",
            log.action,
            " [",
            log.date.toLocaleDateString(),
            "]",
          );
        }
      });
    }
    return coincidences;
  }

  [Symbol.iterator](): IterableIterator<Log> {
    return Logger.loggerInstance.logs.values();
  }
}
