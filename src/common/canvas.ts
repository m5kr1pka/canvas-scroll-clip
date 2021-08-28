import { Base } from "./base";
import { IUserInputs } from "@/helpers/intefaces";
import { BoomerangError } from "@/helpers/error";
import { Options } from "@/helpers/options";
import { BoomerangEvent } from "@/helpers/events";
import * as utils from "@/helpers/utils";

/**
 * Canvas
 *
 * @export
 * @class Canvas
 */
export class Canvas extends Base {

  /**
   * Loading
   */
  public loading: boolean = true;

  /**
   * Selector class name of an HTML element.
   */
  public selector: string;

  /**
   * Options
   */
  public options: Options;

  /**
   * Wrapper HTML element
   */
  public container: HTMLElement;

  /**
   * HTML element 
   */
  public wrapper: HTMLElement;

  /**
   * Images
   */
  public images: HTMLImageElement[] = [];

  /**
   * Canvas DOM element
   */
  public canvas: HTMLCanvasElement;

  /**
   * Canvas context
   */
  public context: CanvasRenderingContext2D;

  /**
   * Canvas viewport
   */
  private _width: number = 0;
  private _height: number = 0;

  /**
   * Creates an instance of Canvas.
   * 
   * @constructor
   * @param {HTMLElement} HTML element.
   * @memberof Canvas
   */
  constructor(element: HTMLElement, options: IUserInputs) {
    super();

    // Check if HTMLCanvasElement exists
    if (typeof element === undefined) {
      throw new BoomerangError('HTML element is not defined.');
    }

    // Set container
    this.container = element;

    // Set options
    this.options = new Options(options);

    // CSS class of a HTML element
    this.selector = this.options.identifier || 'boomerang';

    // Append canvas and loader to an element
    this.container.classList.add(`${this.selector}-container`);

    // Create canvas element
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add(`${this.selector}-canvas`);

    // Create wrapper container
    this.wrapper = document.createElement('div')
    this.wrapper.classList.add(this.selector);
    this.wrapper.appendChild(this.canvas);

    // Output template
    this.container.appendChild(this.wrapper);

    // Get context
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    // Bind scroll event
    this.events.on(BoomerangEvent.viewport.scroll, (scrollTop) => {
      if (!this.loading)
        this.drawImageByScrollTop(scrollTop);
    });

    // Preload Images
    this.preload();
  }

  /**
   * Preload images
   * 
   * @returns 
   */
  private async preload() {
    // TODO: should I refactor this
    return await utils.preloadImages(this.options).then(images => {
      this.images = images;

      // Set Canvas viewport
      this.width = this.images[0]?.width;
      this.height = this.images[0]?.height;

      // Set canvas size
      // TODO async/await for first image earlier
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.options.setScrollableArea = this.height * 2;
      this.container.style.setProperty('height', `${this.options.scrollArea}px`);

      // Initial image load
      this.drawImageByScrollTop();

      // Add loaded classes
      this.container.classList.add(`${this.selector}--loaded`);

      // Images loaded
      this.loading = false;

      // Emit images loaded event
      this.events.emit(BoomerangEvent.images.loaded);
    });
  }

  /**
   * Canvas viewport
   */
  // height
  public set width(width: number) {
    this._width = width;
  }

  public get width(): number {
    return this._width
  }

  // width
  public set height(height: number) {
    this._height = height;
  }

  public get height(): number {
    return this._height
  }

  /**
   * Draw image in Canvas Element
   * 
   * @param image 
   */
  public drawImage(image: HTMLImageElement): void {
    this.context.drawImage(image, 0, 0, this.width, this.height);
  }

  /**
   * Draw image in canvas by frame number
   * @param {scrollTop} number
   * @private
   * 
   * Hidden in order to not display this method in docs
   * @hidden
   */
  public drawImageByFrameNumber(frameNumber = 0): void {
    this.drawImage(this.images[frameNumber]);
  }

  /**
   * Draw image in canvas by scroll top position.
   * 
   * @param {scrollTop} number
   */
  public drawImageByScrollTop(scrollTop?: number): void {
    const scrollFraction = utils.getScrollFraction(scrollTop);
    let frameIndex;

    frameIndex = Math.min(
      this.options.count - 1, // Due to array index
      Math.ceil(scrollFraction * this.options.count)
    );

    if (frameIndex <= 0)
      frameIndex = 0;

    this.drawImageByFrameNumber(frameIndex);
  }
}

export default Canvas;