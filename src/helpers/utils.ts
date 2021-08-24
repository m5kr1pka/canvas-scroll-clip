import { IFrame } from "./intefaces";

/*
* No operation type of function
*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NoopFunction = (args?: any) => any;

/**
 * RegExp expression to find last digits in a string
 */
export const RegExpLastDigitsMatch = /\d+(?!.*\d+)/;

/**
 * Debouncing function
 * 
 * @param {func} 
 * @param {threshold} 
 * @param {execAsap} 
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
 * TODO: Should I refactor
 * 
 * @param {imagesList} Array of strings
 * @param {callback} CallbackFunction
 */
export function preloadImages(imagesList: [string], callback: NoopFunction): void {
  const numImages = imagesList.length;
  const images = new Array(numImages).fill({ 'src': undefined });
  let loadedImages = 0;

  imagesList.forEach((src, index) => {
    images[index] = new Image();
    images[index].onload = function () {

      if (++loadedImages >= numImages) {
        callback(images);
      }
    }

    images[index].src = src;
  })
}

/**
 * Get frame URL by frame number
 * 
 * @param {IFrame} frameOptions 
 * @param {number} frameNumber 
 * @returns {string}
 */
export function getFrameByNumber(frameOptions: IFrame, frameNumber = 1): string {
  const frameNrStr = frameNumber.toString();

  return [
    frameOptions.path,
    frameOptions.image.start,
    frameNrStr.toString().padStart(frameOptions.image.padStart, "0"),
    frameOptions.image.ending
  ].join("");
}