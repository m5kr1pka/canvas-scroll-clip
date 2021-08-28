import { BoomerangError } from "./error";
import { IFrame } from "./intefaces";

/**
 * RegExp expression to find last digits in a string
 */
export const RegExpLastDigitsMatch = /\d+(?!.*\d+)/;

/**
 * Debounce ot throttle function
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
      reject(new BoomerangError(`Image with name '...${imageLink.slice(-20)}' was not found.`));
    }
  })
}

/**
 * Preloading images
 * TODO: Maybe implement progress
 * 
 * @returns Promise<HTMLImageElement[]> 
 */
export function preloadImages(frameOptions: IFrame): Promise<HTMLImageElement[]> {
  const arrayOfImages = new Array(frameOptions.count).fill(0).map((_elem, index) => {
    return getImage(getFramePathByIndex(frameOptions, index + 1));
  });

  return Promise.all(arrayOfImages);
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
 * @returns number
 */
export function getScrollFraction(scrollTop = getScrollTop()): number {
  return scrollTop / (document.documentElement.scrollHeight - window.innerHeight) || 0;
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