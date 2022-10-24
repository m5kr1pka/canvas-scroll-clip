import { AppError } from "../helpers/error";
import { IFrame, IFrameSequence, IUserInputs } from "../helpers/intefaces";
import * as utils from "../helpers/utils"

export class Frame implements IFrame {

  // Image base path
  public path: string;

  // Sequence frame count
  public count: number;

  // Sequence image structure
  public image: IFrameSequence;

  /**
   * Creates an instance of Options.
   * @param {IUserInputs} [options] Options to copy properties.
   * @memberof Options
   */
  constructor({ framePath, frameCount }: IUserInputs) {

    // test framePath is defined
    if (!framePath?.length) {
      throw new AppError('Frame path is not defined.');
    }

    // test frameCount is defined
    if (!frameCount) {
      throw new AppError('Frame count is not defined.');
    }

    // Set frame count
    this.count = parseInt(frameCount as unknown as string);

    // Set frame base path
    this.path = utils.getImageBasePath(framePath);

    // Set frame sequence structure
    this.image = utils.getImageStructure(framePath, this.count)
  }
}

export default Frame;