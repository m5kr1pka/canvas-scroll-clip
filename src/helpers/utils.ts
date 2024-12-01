import { AppError } from "./error";
import { ICanvasViewport, IFrame, IFrameSequence } from "./intefaces";

/**
 * RegExp expression to find last digits in a string
 */
export const RegExpLastDigitsMatch = /\d+(?!.*\d+)/;

/** 
* Available events
**/
export const AppEvent = {
  viewport: {
    resize: 'viewport.resize',
    scroll: 'viewport.scroll'
  },
  images: {
    progress: "images.progress",
    loaded: 'images.loaded'
  }
}

/** 
* List of events
**/
export const EventList = Object.values(AppEvent).map((e: Record<string, unknown>) => Object.values(e)).flat();

/**
 * Debounce ot throttle function
 * 
 * @param {func} 
 * @param {threshold} 
 * @returns 
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <F extends ((...args: any) => any)>(func: F, threshold = 0): any => {
  let timeout: ReturnType<typeof setTimeout>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debounced = (...args: any): void => {
    if (timeout)
      clearTimeout(timeout)

    timeout = setTimeout(() => func(...args), threshold)
  }

  return debounced as (...args: Parameters<F>) => ReturnType<F>
}

/**
 * Preload images
 * 
 * @param {imagesList} Array of strings
 * @param {callback} CallbackFunction
 */
export async function getImage(imageLink: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image: HTMLImageElement = new Image();

    image.onload = () => {
      resolve(image);
    }

    image.src = imageLink;

    image.onerror = () => {
      reject(new AppError(`Image with name '...${imageLink.slice(-20)}' was not found.`));
    }
  })
}

/**
 * Preloading image list
 * 
 * @returns Promise<HTMLImageElement>[]
 */
export function preloadImages(frameOptions: IFrame): Promise<HTMLImageElement>[] {
  return new Array(frameOptions.count).fill(0).map((_elem, index) => {
    return getImage(getFramePathByIndex(frameOptions, index + 1));
  });
  // console.log(arrayOfImages);
  // return new Promise()
  // // return Promise.all(arrayOfImages);
}

/**
 * Get scroll top position 
 * 
 * @returns number
 */
export function getScrollTop(): number {
  return window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
}

/**
 * Get scroll top position 
 * 
 * @param {scrollTop}
 * @param {ICanvasViewport}
 * @returns number
 */
export function getScrollFraction(cViewport: ICanvasViewport, scrollTop = getScrollTop()): number {
  return (scrollTop - cViewport.top) / (cViewport.bottom - cViewport.screen.height - cViewport.top);
}

/**
 * Get frame URL by frame number
 * 
 * @param {IFrame} frameOptions 
 * @param {number} frameNumber 
 * @returns {string}
 */
export function getFramePathByIndex(frameOptions: IFrame, frameNumber = 1): string {
  return [
    frameOptions.path,
    frameOptions.image.start,
    frameNumber.toString().padStart(frameOptions.image.padStart, "0"),
    frameOptions.image.ending
  ].join("");
}

/**
   * Get image base path
   * 
   * @param firstFramePath 
   * @returns 
   */
export function getImageBasePath(firstFramePath: string): string {
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
   * @throws {AppError}
   */
export function getImageStructure(firstFramePath: string, frameCount: number): IFrameSequence {
  const img = getPathEnding(firstFramePath);
  const ext = getFileSuffix(img);
  const seq = getImageSequence(img);

  if (frameCount.toString().length > seq.length) {
    throw new AppError(`Leading zeros in first frame path has to be more than the frame count and sequence at the end.`);
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
 * @throws {AppError} image sequence format not supported
 */
export function getImageSequence(imageName: string): string {
  const match = imageName.match(RegExpLastDigitsMatch);
  const sequence = (match && match[0] !== null) ? match[0] : "";

  if (sequence.length < 2) {
    throw new AppError('Bad image sequence format. Should start with 0 and be longer than 2 numbers, f.e. "frame_01.jpg"')
  }

  return sequence;
}

/**
 * Get file extension/suffix 
 * Test whether is within supported extension/suffixes list
 * 
 * @param fileName 
 * @returns {string}
 * @throws {AppError} Unsupported image
 */
export function getFileSuffix(fileName: string): string {
  const ext = fileName.split('.').pop() || ' ';

  if (!['jpg', 'jpeg', 'png', 'webp', 'avif'].includes(ext)) {
    throw new AppError(`Image with extension ['${ext}'] is not supported.`);
  }

  return `.${ext}`;
}

/**
 * Get ending of a url
 * 
 * @param path 
 * @returns 
 */
export function getPathEnding(path: string): string {
  const splitted = path.split('/');

  return splitted.pop() || '';
}
