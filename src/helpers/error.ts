import { ConsoleLogger } from "@/helpers/logger";

/**
 * BoomerangError class.
 *
 * @export
 * @class BoomerangError
 * @extends {ConsoleLogger}
 */
export class BoomerangError extends ConsoleLogger {

  /**
   * Creates an instance of BoomerangError.
   * @param {string} warning message.
   * @memberof BoomerangError
   */
  constructor(message: string) {
    super(message);
  }
}

/**
 * BoomerangWarning class.
 *
 * @export
 * @class BoomerangWarning
 * @extends {ConsoleLogger}
 */
export class BoomerangWarning extends ConsoleLogger {

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