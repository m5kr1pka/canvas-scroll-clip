/*
* No operation type of function
*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NoopFunction = (args?: any) => any;

/**
 * Input data
 * 
 * @export
 * @interface IInput
 */
export interface IUserInputs {
  identifier?: string,
  framePath: string,
  frameCount: string | number,
  scrollArea?: string | number | undefined
}

/**
 * Viewport
 * 
 * @export
 * @interface IScreenViewport
 */
export interface IScreenViewport {
  width: number,
  height: number
}

/**
 * Canvas Viewport
 * 
 * @export
 * @interface ICanvasViewport
 */
export interface ICanvasViewport {
  width: number,
  height: number,
  top: number,
  bottom: number,
  screen: IScreenViewport
}

/**
 * Frame Sequence interface.
 *
 * @export
 * @interface IFrameSequence
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
