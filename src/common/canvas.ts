import { ICanvasViewport, IUserInputs } from "../helpers/intefaces";
import { AppError } from "../helpers/error";
import * as utils from "../helpers/utils";
import Options from "../common/options";

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
    if (!element) {
      throw new AppError('HTML element is not defined.');
    }

    // Set container
    this._container = element;
    this._container.innerHTML = "";

    // Append canvas and loader to an element
    this._container.classList.add(`${this.identifier}-container`);
    this._container.style.setProperty('height', `${this.scrollArea}px`);

    // Create canvas element
    this._canvas = document.createElement('canvas');
    this._canvas.classList.add(`${this.identifier}-canvas`);
    this._canvas.style.setProperty('display', 'block');
    this._canvas.style.setProperty('max-height', '100%');
    this._canvas.style.setProperty('max-width', '100%');
    this._canvas.style.setProperty('object-fit', 'cover');
    this._canvas.style.setProperty("height", "100vh");
    this._canvas.style.setProperty("width", "100%");

    // Create wrapper container
    this._wrapper = document.createElement('div')
    this._wrapper.classList.add(this.identifier);
    this._wrapper.style.setProperty('position', 'sticky');
    this._wrapper.style.setProperty('top', '0');
    this._wrapper.appendChild(this._canvas);

    // Output template
    this._container.appendChild(this._wrapper);

    // Get context
    this.context = this._canvas.getContext("2d") as CanvasRenderingContext2D;

    // Set viewport default
    this.viewport = {
      width: this.screen.width,
      height: this.screen.height,
      top: 0,
      bottom: this.screen.height,
      screen: this.screen
    };

    // Bind scroll event
    this.events.on(utils.AppEvent.viewport.scroll, (scrollTop) => {
      if (!this.loading)
        this.drawImageByScrollFraction(utils.getScrollFraction(this.viewport, scrollTop));
    });

    // Preload Images
    this.preload();
  }

  /**
   * Preload images
   * 
   * @returns 
   */
  public async preload() {
    const progress = {
      total: this.frame.count,
      loaded: 0
    }

    // Create array of promises and raise loading event
    const imageList = utils.preloadImages(this.frame).map(p => {
      return p.then((image) => {
        progress.loaded = ++progress.loaded

        this.events.emit(utils.AppEvent.images.progress, progress);

        return image
      })
    })

    // TODO: should I refactor this
    return await Promise.all(imageList).then(images => {
      this.images = images;

      // Set Canvas viewport
      this.viewport = {
        ...this.viewport,
        width: this.images[0]?.width,
        height: this.images[0]?.height,
        top: this._container.getBoundingClientRect().top + utils.getScrollTop() || 0,
        bottom: this._container.getBoundingClientRect().bottom + utils.getScrollTop() || this.screen.height
      };

      // Set canvas size
      // TODO async/await for first image earlier
      this._canvas.width = this.viewport.width;
      this._canvas.height = this.viewport.height;
      this.setScrollableArea = this.viewport.height * 2;
      this._container.style.setProperty('height', `${this.scrollArea}px`);

      // Initial image load
      this.drawImageByScrollFraction(utils.getScrollFraction(this.viewport));

      // Add loaded classes
      this._container.classList.add(`${this.identifier}--loaded`);

      // Images loaded
      this.loading = false;

      // Emit images loaded event
      // End of everything
      this.events.emit(utils.AppEvent.images.loaded);
    });
  }

  /**
   * Draw image in Canvas Element
   * 
   * @param image 
   */
  public drawImage(image: HTMLImageElement): void {
    if (!image) {
      return
    }

    this.context.clearRect(0, 0, this.viewport.width, this.viewport.height);
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
  public drawImageByScrollFraction(scrollFraction: number): void {
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