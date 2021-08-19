import { BoomerangError } from "@/helpers/error";
import { EventEmitter } from "@/helpers/events";
import { NoopFunction } from "@/helpers/utils"

/**
 * Main class.
 *
 * @export
 * @class Main
 * @extends {EventEmitter}
 */
export default class {

  public selector: string;
  public element: HTMLElement;
  public events: EventEmitter;
  public callback: NoopFunction;

  /**
   * Creates an instance of Boomerang.
   * @constructor
   * @param {string} class name of an HTML element || default '.boomerang'.
   * @param {function} Callback function
   * @memberof Main
   */
  constructor(selector?: string, callback?: NoopFunction) {

    try {

      // CSS class of a HTML element
      this.selector = selector || '.boomerang';

      // Query document for element
      this.element = document.querySelector(this.selector) as HTMLElement;

      // Callback function if defined
      this.callback = callback || (() => {
        // eslint - do nothing.
      });

      // Event bus
      this.events = new EventEmitter();

      // Initialitze
      this.init();

    } catch (e) {
      // Global error wrapper
      throw new BoomerangError(e.message)
    }
  }

  init(): void {

    if (!this.element) {
      throw new Error(`Element with class name "${this.selector}" not found.`)
    }

    // setTimeout(() => {
    //   // console.log(this.events);
    //   this.events.emit(Event.resize);
    // }, 100)

    // Next tick of instance
    setTimeout(() => {
      this.callback();
    }, 0);
  }
}
