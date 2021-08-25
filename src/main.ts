import { Base } from "@/common/base";
import { NoopFunction, IOptions } from "@/helpers/intefaces";
// import { BoomerangError } from "@/helpers/error";
import { Canvas } from "@/common/canvas";
import { Options } from '@/helpers/options';
import { BoomerangEvent } from "@/helpers/events";
import { debounce, getFrameNumber, preloadImages } from "@/helpers/utils";

/**
 * @module
 * Boomerang.js
 *
 * @export
 * @class Main
 */
export class Main extends Base {

  /**
   * Selector class name of an HTML element.
   */
  public selector: keyof HTMLElementTagNameMap;

  /**
   * Canvas
   */
  public canvas: Canvas;

  /**
   * Options
   */
  public options: Options;

  /**
   * Images
   */
  public images: HTMLImageElement[] = [];

  /**
   * This callback is called when the class is loaded
   * 
   * @callback CallbackFunction
   */
  public callback: NoopFunction;

  /**
   * Creates an instance of Boomerang.
   * @constructor
   * @param {String} class name of an HTML element.
   * @param {function} Callback function
   * @memberof Main
   */
  constructor(selector: string, options: IOptions, callback?: NoopFunction) {
    super();

    // CSS class of a HTML element
    this.selector = selector as keyof HTMLElementTagNameMap;

    // Set Canvas
    this.canvas = new Canvas(this.selector);

    // Set options
    this.options = new Options(options);

    // Callback function if defined
    this.callback = callback || (() => {
      // eslint - do nothing.
    });

    // Initialize
    this.init();
  }

  /**
   * Hidden in order not to display this method in docs
   * Initializes in constructor
   * 
   * @hidden
   */
  private init(): void {

    // Preload Images
    preloadImages(this.options).then(images => {
      this.images = images;

      // Print first image
      this.canvas.drawImage(this.images[0]);

      // Bind window events
      window.addEventListener("resize", debounce(this.handleResize.bind(this)));
      window.addEventListener("scroll", debounce(this.handleScroll.bind(this)));

      // Raise images loaded event
      this.events.emit(BoomerangEvent.images.loaded);
    })

    this.events.on(BoomerangEvent.viewport.scroll, (scrollTop) => {
      const frameNumber = getFrameNumber(this.options.count, scrollTop);
      this.canvas.drawImage(this.images[frameNumber]);
    });

    // this.events.on(Event.viewport.resize, () => {
    //   console.log('resize')
    // });

    // this.events.on(Event.images.loaded, () => {
    //   console.log('loaded')
    // });

    // Next tick of instance
    debounce(this.callback());
  }
}

export default Main;