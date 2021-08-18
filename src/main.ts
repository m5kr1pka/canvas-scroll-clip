import { BoomerangError } from "@/helpers/error";
import { Event, EventEmitter } from "@/helpers/events";
import { NoopFunction } from "@/helpers/utils"

/**
 * Base carousel class.
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
   * @param {HTMLElement} An HTML element.
   * @param callback function
   * @memberof Main
   */
  constructor(selector?: string | undefined, callback?: NoopFunction) {

    try {

      // CSS class of a HTML element
      this.selector = selector || '.boomerang';

      console.log(this.selector);
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

    if (typeof window !== 'object') {
      throw new Error('window not found.');
    }

    if (!this.element) {
      throw new Error(`Element with class name "${this.selector}" not found.`)
    }

    if (!(this.element instanceof HTMLElement)) {
      throw new Error(`Element with class name "${this.selector}" must be an HTMLElement'`);
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
