export interface Logger {
  log(message: string): void;
  warn(message: string): void;
}

export class ConsoleLogger extends Error implements Logger {

  constructor(message?: string) {

    if (!message) {
      message = `message is not defined.`;
    }

    super(`${message}`);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, Object.getPrototypeOf(this));

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ConsoleLogger);
    }
  }

  // constructor name
  get name(): string {
    return this.constructor.name
  }

  // Log message to console
  public log(message: string): void {
    console.log(`${this.name}: ${message}`);
  }

  // Warning message to console
  public warn(message: string): void {
    console.warn(`${this.name}: ${message}`);
  }
}