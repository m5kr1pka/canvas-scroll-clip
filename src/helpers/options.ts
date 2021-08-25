import { RegExpLastDigitsMatch } from '@/helpers/utils'
import { IOptions, IFrame, IFrameSequence } from '@/helpers/intefaces'
import { BoomerangError } from '@/helpers/error';

/**
 * Boomerang options.
 *
 * @export
 * @class Options
 * @implements {IOptions}
 */
export class Options implements IFrame {

  // public frame: IFrame;
  public path: string;
  public count: number;
  public image: IFrameSequence;

  /**
   * Creates an instance of Options.
   * @param {IOptions} [options] Options to copy properties.
   * @memberof Options
   */
  constructor(options: IOptions) {

    if (!options.framePath) {
      throw new BoomerangError('Frame path is not defined.');
    }

    if (!options.frameCount) {
      throw new BoomerangError('Frame count is not defined.');
    }

    this.count = options.frameCount;
    this.path = this.getImageBasePath(options.framePath);
    this.image = this.getImageStructure(options.framePath, this.count)
  }

  /**
   * Get image base path
   * 
   * @param firstFramePath 
   * @returns 
   */
  private getImageBasePath(firstFramePath: string): string {
    const path = firstFramePath.split('/');

    path.pop();

    return `${path.join('/')}/`;
  }

  /**
   * Get frame image structure
   * 
   * @param {string} firstFramePath 
   * @param {number} frameCount 
   * @returns 
   */
  private getImageStructure(firstFramePath: string, frameCount: number): IFrameSequence {
    const img = this.getPathEnding(firstFramePath);
    const ext = this.getImageExtension(img);
    const seq = this.getImageSequence(img);

    if (frameCount.toString().length > seq.length) {
      throw new BoomerangError(`Leading zeros in first frame path has to be more than the frame count and sequence at the end.`);
    }

    return {
      start: img.slice(0, img.indexOf(seq)),
      sequence: parseInt(seq),
      padStart: seq.length,
      ending: img.slice(img.indexOf(seq) + seq.length),
      extension: ext,
    };
  }

  /**
   * Get image sequence with leading zeros
   * 
   * @param {string} imageName 
   * @returns {string}
   * @throws {BoomerangError} image sequence format not supported
   */
  private getImageSequence(imageName: string): string {
    const match = imageName.match(RegExpLastDigitsMatch);
    const sequence = (match && match[0] !== null) ? match[0] : "";

    if (sequence.length < 2) {
      throw new BoomerangError('Bad image sequence format. Should start with 0 and be longer than 2 numbers, f.e. "frame_01.jpg"')
    }

    return sequence;
  }

  /**
   * Get image extension
   * 
   * @param imageName 
   * @returns {string}
   * @throws {BoomerangError} Unsupported image
   */
  private getImageExtension(imageName: string): string {
    const ext = imageName.split('.').pop() || ' ';

    if (!['jpg', 'jpeg', 'png'].includes(ext)) {
      throw new BoomerangError(`Image with extension ['${ext}'] is not supported.`);
    }

    return `.${ext}`;
  }

  /**
   * Get ending of a url
   * 
   * @param path 
   * @returns 
   */
  private getPathEnding(path: string): string {
    const splitted = path.split('/');

    return splitted.pop() || '';
  }
}

/**
 * @export
 */
export default Options;