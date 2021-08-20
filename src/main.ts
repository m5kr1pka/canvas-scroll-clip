import { BoomerangError } from "@/helpers/error";
import { EventEmitter } from "@/helpers/events";
import { CallbackFunction } from "@/helpers/utils"

/**
 * @module
 * Boomerang.js
 *
 * @export
 * @class Main
 */
export default class {

  /**
   * Selector class name of an HTML element || ```default '.boomerang'```.
   */
  public selector: string;

  /**
   * Queried ```HTMLElement``` based on selector.
   */
  public element: HTMLElement;

  /**
   * Events 
   */
  public events: EventEmitter;

  /**
   * Callback function || ```undefined```
   */
  public callback: CallbackFunction;

  /**
   * Creates an instance of Boomerang.
   * @constructor
   * @param {string} class name of an HTML element | default '.boomerang'.
   * @param {function} Callback function
   * @memberof Main
   */
  constructor(selector?: string, callback?: CallbackFunction) {

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

      // Initialize
      this.init();

    } catch (e) {
      // Global error wrapper
      throw new BoomerangError(e.message)
    }
  }

  /**
   * Hidden in order not to display this method in docs
   * Initializes in constructor
   * 
   * @hidden
   */
  private init(): void {

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
