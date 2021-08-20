/**
 * BoomerangError class.
 *
 * @export
 * @class BoomerangError
 * @extends {Error}
 */
export class BoomerangError extends Error {

  /**
   * Creates an instance of BoomerangError.
   * @param {string} warning message.
   * @memberof BoomerangError
   */
  constructor(message?: string) {

    if (!message) {
      message = `Error message is not defined.`;
    }

    super(`${message}`);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, Object.getPrototypeOf(this));

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BoomerangError);
    }
  }

  /**
   * Name of the property [of "this" or one of its prototypes] that holds
   * the current function
   *
   * @memberof BoomerangError
   */
  get name(): string {
    return this.constructor.name
  }
}

/**
 * BoomerangLogger class.
 *
 * @export
 * @class BoomerangLogger
 * @extends {BoomerangError}
 */
export class BoomerangLogger extends BoomerangError {

  /**
   * wrapper logger for console.log
   *
   * @param {string}
   * @memberof Logger
   */
  public log(message: string): void {
    console.log(`${this.name}: ${message}`);
  }

  /**
   * wrapper logger for console.warn
   *
   * @param {string}
   * @memberof Logger
   */
  public warn(message: string): void {
    console.warn(`${this.name}: ${message}`);
  }
}

/**
 * BoomerangWarning class.
 *
 * @export
 * @class BoomerangWarning
 * @extends {BoomerangLogger}
 */
export class BoomerangWarning extends BoomerangLogger {

  /**
   * Creates an instance of BoomerangWarning.
   * @param {string} warning message.
   * @memberof BoomerangWarning
   */
  constructor(message: string) {
    super(message);

    this.warn(message);
  }
}
