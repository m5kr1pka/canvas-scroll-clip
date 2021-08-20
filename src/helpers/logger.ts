export interface iLogger {
  log(message: string): void;
  warn(message: string): void;
}

/**
 * ConsoleLogger class.
 *
 * @export
 * @class ConsoleLogger
 * @extends {Error}
 * @implements {iLogger}
 */
export class ConsoleLogger extends Error implements iLogger {

  /**
   * Creates an instance of ConsoleLogger.
   * @param {string} warning message.
   * @memberof ConsoleLogger
   */
  constructor(message?: string) {

    if (!message) {
      message = `Error message is not defined.`;
    }

    super(`${message}`);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, Object.getPrototypeOf(this));

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ConsoleLogger);
    }
  }

  /**
   * Name of the property [of "this" or one of its prototypes] that holds
   * the current function
   *
   * @memberof ConsoleLogger
   */
  get name(): string {
    return this.constructor.name
  }

  /**
   * wrapper logger for console.log
   *
   * @param {string}
   * @memberof ConsoleLogger
   */
  public log(message: string): void {
    console.log(`${this.name}: ${message}`);
  }

  /**
   * wrapper logger for console.warn
   *
   * @param {string}
   * @memberof ConsoleLogger
   */
  public warn(message: string): void {
    console.warn(`${this.name}: ${message}`);
  }
}