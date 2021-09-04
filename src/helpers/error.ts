/**
 * AppError class.
 *
 * @export
 * @class AppError
 * @extends {Error}
 */
export class CanvasScrollClipError extends Error {

  /**
   * Creates an instance of AppError.
   * @param {string} warning message.
   * @memberof CanvasScrollClipError
   */
  constructor(message?: string) {

    if (!message) {
      message = `Whoops! Something went wrong.`;
    }

    super(`${message}`);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, Object.getPrototypeOf(this));

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CanvasScrollClipError);
    }
  }

  /**
   * Name of the property [of "this" or one of its prototypes] that holds
   * the current function
   *
   * @memberof CanvasScrollClipError
   */
  get name(): string {
    return this.constructor.name
  }
}

/**
 * AppError decorator class.
 *
 * @export
 * @class AppError
 * @extends {AppError}
 */
export class AppError extends CanvasScrollClipError {

  get name(): string {
    return 'CanvasScrollClipError';
  }
}

/**
 * AppLogger class.
 *
 * @export
 * @class AppLogger
 * @extends {AppError}
 */
export class AppLogger extends CanvasScrollClipError {

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
 * AppWarning class.
 *
 * @export
 * @class AppWarning
 * @extends {AppLogger}
 */
export class AppWarning extends AppLogger {

  /**
   * Creates an instance of AppWarning.
   * @param {string} warning message.
   * @memberof AppWarning
   */
  constructor(message: string) {
    super(message);

    this.warn(message);
  }
}
