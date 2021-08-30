import { IUserInputs, IFrame } from '@/helpers/intefaces'
import { BoomerangError } from '@/helpers/error';
import { Frame } from './frame';
import Base from './base';

/**
 * Boomerang options.
 *
 * @export
 * @class Options
 * @implements {IOptions}
 */
export class Options extends Base {

  // User inputs
  public inputs: IUserInputs;

  // Identifier for appended elements
  public identifier: string;

  // Animation Height
  public scrollArea: number = 0;

  // Frame
  protected frame: IFrame;

  /**
   * Creates an instance of Options.
   * @param {IUserInputs} [options] Options to copy properties.
   * @memberof Options
   */
  constructor(options: IUserInputs) {
    super();

    // test framePath is defined
    if (!options.framePath) {
      throw new BoomerangError('Frame path is not defined.');
    }

    // test frameCount is defined
    if (!options.frameCount) {
      throw new BoomerangError('Frame count is not defined.');
    }

    // Set user inputs
    this.inputs = options;

    // Set identifier
    this.identifier = options.identifier || 'boomerang';

    // Set frame
    this.frame = new Frame(options);

    // Set Container Height if defined
    if (options.scrollArea) {
      this.scrollArea = parseInt(options.scrollArea, 10);
    }
  }

  /**
   * Set scrollable area height
   */
  public set setScrollableArea(height: number) {
    if (this.scrollArea)
      return

    this.scrollArea = height;
  }
}

/**
 * @export
 */
export default Options;