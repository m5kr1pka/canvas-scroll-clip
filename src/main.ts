import { NoopFunction, IUserInputs } from "@/helpers/intefaces";
import { Canvas } from "@/common/canvas";
import { BoomerangEvent } from "@/common/events";
import { debounce } from "@/helpers/utils";

/**
 * @module
 * Boomerang.js
 */

/**
 * @class Main class
 */
export class Main extends Canvas {

  /**
   * This callback is called when the class is loaded
   * 
   * @callback CallbackFunction
   */
  public callback: NoopFunction;

  /**
   * An instance of boomerang.js.
   * 
   * @constructor
   * @param {String} class name of an HTML element.
   * @param {function} Callback function
   * @memberof Main
   */
  constructor(element: HTMLElement, options: IUserInputs, callback?: NoopFunction) {
    // Instantiate Canvas Class
    super(element, options);

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

    // Bind images loaded event
    this.events.on(BoomerangEvent.images.loaded, () => {
      // Next tick of instance
      debounce(this.callback());
    });
  }
}

export default Main;
