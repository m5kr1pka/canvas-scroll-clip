import { IUserInputs, IFrame } from '../helpers/intefaces'
import Base from './base';
import Frame from './frame';

/**
 * Plugin options.
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

    // Set user inputs
    this.inputs = options;

    // Set identifier
    this.identifier = options.identifier || 'csc';

    // Set frame
    this.frame = new Frame(options);

    // Set Container Height if defined
    if (options.scrollArea) {
      this.scrollArea = parseInt(options.scrollArea as unknown as string, 10);
    }
  }

  /**
   * Set scrollable area height
   */
  public set setScrollableArea(height: number) {
    if (this.scrollArea)
      return

    this.scrollArea = parseInt(height as unknown as string);
  }
}

/**
 * @export
 */
export default Options;