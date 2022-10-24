import { NoopFunction, IUserInputs } from "./helpers/intefaces";
import { debounce, AppEvent } from "./helpers/utils";
import Canvas from "./common/canvas";

/**
 * @module
 * CanvasClip.js
 */

interface IMain {
  callback: NoopFunction;
}

/**
 * @class Main class
 */
class Main extends Canvas implements IMain {

  /**
   * This callback is called when the class is loaded
   * 
   * @callback CallbackFunction
   */
  public callback: NoopFunction;

  /**
   * An instance of App.js.
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
   */
  private init(): void {

    // Bind images loaded event
    this.events.on(AppEvent.images.loaded, () => {
      // Next tick of instance
      debounce(this.callback());
    });
  }
}

export default Main;