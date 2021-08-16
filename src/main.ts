import { BoomerangInterface } from "./main.d";
import { BoomerangError } from "@/helpers/error";
import { Event, EventEmitter } from "@/helpers/events";
import { NoopFunction } from "@/helpers/utils"

/**
 * Base carousel class.
 *
 * @export
 * @class Main
 * @implements {BoomerangInterface}
 * @extends {EventEmitter}
 */
export default class implements BoomerangInterface {

  public element;

  public callback: NoopFunction;

  public events: EventEmitter;

  /**
   * Creates an instance of Boomerang.
   * @constructor
   * @param {HTMLElement} An HTML element.
   * @param callback function
   * @memberof Main
   */
  constructor(element: HTMLElement, callback?: NoopFunction) {

    try {
      // CSS class of a HTML element
      this.element = element;

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

    if (typeof window !== 'object') {
      throw new Error('Browser object not found.');
    }

    if (!(this.element instanceof HTMLElement)) {
      throw new Error('The required input must be an HTMLElement');
    }

    setTimeout(() => {
      // console.log(this.events);
      this.events.emit(Event.resize);
    }, 100)

    // Next tick of instance
    setTimeout(() => {
      this.callback();
    }, 10)
  }
}
