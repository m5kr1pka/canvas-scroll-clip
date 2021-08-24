import { Base } from "@/base";
import { IViewport, IOptions } from "@/helpers/intefaces";
import { NoopFunction, debounce } from "@/helpers/utils";
import { BoomerangError } from "@/helpers/error";
import { Options } from '@/helpers/options';

/**
 * @module
 * Boomerang.js
 *
 * @export
 * @class Main
 */
export class Main extends Base {

  /**
   * Selector class name of an HTML element || ```default '.boomerang'```.
   */
  public selector: keyof HTMLElementTagNameMap;

  /**
   * Queried <HTMLElement> based on selector.
   */
  public element: HTMLElement;

  /**
   * Options
   */
  public options: Options;

  /**
   * Viewport
   */
  public viewport: IViewport;

  /**
   * This callback is called when the class is loaded
   * 
   * @callback CallbackFunction
   */
  public callback: NoopFunction;

  /**
   * Creates an instance of Boomerang.
   * @constructor
   * @param {String} class name of an HTML element | default '.boomerang'.
   * @param {function} Callback function
   * @memberof Main
   */
  constructor(selector: string, options: IOptions, callback?: NoopFunction) {
    super();

    // CSS class of a HTML element
    this.selector = selector as keyof HTMLElementTagNameMap;

    // Query document for element
    this.element = document.querySelector(this.selector) as HTMLElement;

    // Test if HTMLElement exists
    if (!this.element) {
      throw new BoomerangError(`Element with class name "${this.selector}" not found.`)
    }

    // Set options
    this.options = new Options(options);

    // Set viewport
    this.viewport = this.getViewport();

    // Callback function if defined
    this.callback = callback || (() => {
      // eslint - do nothing.
    });

    // Bind window events
    window.addEventListener("resize", debounce(this.handleResize.bind(this)));
    window.addEventListener("scroll", debounce(this.handleScroll.bind(this)));

    // Next tick of instance
    debounce(this.callback())

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
    // console.log('init')
  }
}

export default Main;