/**
 * Viewport
 */
export interface IViewport {
  x: number,
  y: number
}

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
