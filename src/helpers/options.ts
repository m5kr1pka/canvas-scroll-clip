/**
 * Boomerang.js options interface.
 *
 * @export
 * @interface IOptions
 */
export interface IOptions {
  framePath: string,
  frameCount: number;
}

/**
 * Frame Sequence interface.
 *
 * @export
 * @interface IFrame
 */
export interface IFrameSequence {
  start: string,
  sequence: number,
  padStart: number,
  ending: string,
  extension: string,
}

/**
 * Frame interface.
 *
 * @export
 * @interface IFrame
 */
export interface IFrame {
  path: string,
  count: number,
  image: IFrameSequence
}

/**
 * Boomerang options.
 *
 * @export
 * @class Options
 * @implements {IOptions}
 */
export class Options implements IOptions {

  public frame: IFrame
  public framePath = '';
  public frameCount = 1;

  /**
   * Creates an instance of Options.
   * @param {IOptions} [options] Options to copy properties.
   * @memberof Options
   */
  constructor(options: IOptions) {

    if (!options.framePath) {
      throw new Error('Frames path is not defined.');
    }

    if (!options.frameCount) {
      throw new Error('Frame count is not defined.')
    }

    // TODO: should I refactor this due to frame property?
    for (const prop in options) {
      if (options.hasOwnProperty(prop)) {
        (this as any)[prop] = (options as any)[prop];
      }
    }

    // Frame sequence options
    this.frame = {
      path: this.getImageBasePath(this.framePath),
      image: this.getImageStructure(this.framePath, this.frameCount),
      count: this.frameCount
    } as IFrame;
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

    return path.join('/');
  }

  /**
   * 
   * @param firstFramePath 
   * @returns 
   */
  private getImageStructure(firstFramePath: string, frameCount: number): IFrameSequence {
    const img = this.getPathEnding(firstFramePath);
    const seq = this.getImageSequence(firstFramePath)

    if (frameCount.toString().length > seq.length) {
      throw new Error(`Leading zeros in first frame path has to be more than the frame count and sequence at the end.`);
    }

    return {
      start: img.slice(0, img.indexOf(seq)),
      sequence: parseInt(seq),
      padStart: seq.length,
      ending: img.slice(img.indexOf(seq) + seq.length),
      extension: this.getImageExtension(firstFramePath),
    };
  }

  /**
   * Get image sequence
   * 
   * @param {string} firstFramePath 
   * @returns {Number}
   * @throws {Error} image sequence format not supported
   */
  private getImageSequence(firstFramePath: string): string {
    const ending = this.getPathEnding(firstFramePath);
    let sequence = '', numbers;

    if (!ending || !ending.length) {
      throw new Error('Image sequence format not supported.')
    }

    numbers = ending.replace(/[^0-9]/g, '');

    for (let i = 0; i < numbers.length; i++) {
      let slice = numbers.slice(i);

      if (ending.includes(slice)) {
        sequence = slice;

        break;
      }
    }

    if (sequence.length < 3) {
      throw new Error('Bad image sequence format. Should start with 0 and be more than 3.')
    }

    return sequence;
  }

  /**
   * Get image extension
   * 
   * @param firstFramePath 
   * @returns {string}
   * @throws {Error} Unsupported image
   */
  private getImageExtension(firstFramePath: string): string {
    const ending = this.getPathEnding(firstFramePath);
    const ext = ending.split('.').pop() || '';

    if (!['jpg', 'jpeg', 'png'].includes(ext)) {
      throw new Error(`Image with extension '${ext}' is not supported.`);
    }

    return `.${ext}`;
  }

  /**
   * 
   * @param path 
   * @returns 
   */
  private getPathEnding(path: string): string {
    const splitted = path.split('/');

    return splitted.pop() || '';
  }
}