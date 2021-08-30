import { ICanvasViewport, IUserInputs } from "@/helpers/intefaces";
import { BoomerangError } from "@/helpers/error";
import { Options } from "@/common/options";
import * as utils from "@/helpers/utils";

/**
 * Canvas
 *
 * @export
 * @class Canvas
 */
export class Canvas extends Options {

  /**
   * Loading
   */
  private loading: boolean = true;

  /**
   * Wrapper HTML element
   */
  private _container: HTMLElement;

  /**
   * HTML element 
   */
  private _wrapper: HTMLElement;

  /**
   * Canvas DOM element
   */
  private _canvas: HTMLCanvasElement;

  /**
   * Images
   */
  private images: HTMLImageElement[] = [];

  /**
   * Canvas context
   */
  private context: CanvasRenderingContext2D;

  /**
   * Canvas viewport
   */
  protected viewport: ICanvasViewport;

  /**
   * Creates an instance of Canvas.
   * 
   * @constructor
   * @param {HTMLElement} HTML element.
   * @memberof Canvas
   */
  constructor(element: HTMLElement, options: IUserInputs) {
    super(options);

    // Check if HTMLCanvasElement exists
    if (typeof element === undefined) {
      throw new BoomerangError('HTML element is not defined.');
    }

    // Set container
    this._container = element;

    // Append canvas and loader to an element
    this._container.classList.add(`${this.identifier}-container`);
    this._container.style.setProperty('height', `${this.scrollArea}px`);

    // Create canvas element
    this._canvas = document.createElement('canvas');
    this._canvas.classList.add(`${this.identifier}-canvas`);

    // Create wrapper container
    this._wrapper = document.createElement('div')
    this._wrapper.classList.add(this.identifier);
    this._wrapper.appendChild(this._canvas);

    // Output template
    this._container.appendChild(this._wrapper);

    // Get context
    this.context = this._canvas.getContext("2d") as CanvasRenderingContext2D;

    // Set viewport default
    this.viewport = {
      width: this.screen.x,
      height: this.screen.y,
      top: 0,
      bottom: this.screen.y
    };

    // Bind scroll event
    this.events.on(utils.BoomerangEvent.viewport.scroll, (scrollTop) => {
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
    return await utils.preloadImages(this.frame).then(images => {
      this.images = images;

      // Set Canvas viewport
      this.viewport = {
        width: this.images[0]?.width,
        height: this.images[0]?.height,
        top: this._container.getBoundingClientRect().top + utils.getScrollTop() || 0,
        bottom: this._container.getBoundingClientRect().bottom + utils.getScrollTop() || 0
      };

      // Set canvas size
      // TODO async/await for first image earlier
      this._canvas.width = this.viewport.width;
      this._canvas.height = this.viewport.height;
      this.setScrollableArea = this.viewport.height * 2;
      this._container.style.setProperty('height', `${this.scrollArea}px`);

      // Initial image load
      this.drawImageByScrollTop();

      // Add loaded classes
      this._container.classList.add(`${this.identifier}--loaded`);

      // Images loaded
      this.loading = false;

      // Emit images loaded event
      // End of everything
      this.events.emit(utils.BoomerangEvent.images.loaded);
    });
  }

  /**
   * Draw image in Canvas Element
   * 
   * @param image 
   */
  public drawImage(image: HTMLImageElement): void {
    this.context.drawImage(image, 0, 0, this.viewport.width, this.viewport.height);
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
      this.frame.count - 1, // Due to array index
      Math.ceil(scrollFraction * this.frame.count)
    );

    if (frameIndex <= 0)
      frameIndex = 0;

    this.drawImageByFrameNumber(frameIndex);
  }
}

export default Canvas;