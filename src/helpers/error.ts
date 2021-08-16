/**
 * BoomerangError class.
 *
 * @export
 * @class BoomerangWarning
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
      message = `message is not defined.`;
    }

    super(`${message}`);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, Object.getPrototypeOf(this));

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BoomerangError);
    }
  }

  get name(): string { return `${this.constructor.name}` }
}

/**
 * BoomerangWarning class.
 *
 * @export
 * @class BoomerangWarning
 * @extends {BoomerangError}
 */
export class BoomerangWarning extends BoomerangError {

  /**
   * Creates an instance of BoomerangWarning.
   * @param {string} warning message.
   * @memberof BoomerangWarning
   */
  constructor(message?: string) {
    super(message);

    console.warn(`${this}`);
  }
}