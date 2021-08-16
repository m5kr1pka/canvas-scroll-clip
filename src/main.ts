import BoomerangError from "@/helpers/error";
import { Event, EventEmitter } from "@/helpers/events";
import { NoopFunction, BoomerangInterface } from "./main.d"

/**
 * Boomerang.js main
 *
 * ```
 * const instance = new Boomerang('.selector');
 * ```
 */
export class Main implements BoomerangInterface {

  public selector;

  public container;

  public callback: NoopFunction;

  private events: any;

  /**
   * Creates an instance of Boomerang.
   * @constructor
   * @param {string} HTML element class name.
   * @param callback function
   */
  constructor(selector: string, callback?: NoopFunction) {

    try {
      // CSS class of a HTML element
      this.selector = selector;

      // HTMLElement 
      this.container = <NodeList>document.querySelectorAll(this.selector);

      // Callback function if defined
      this.callback = callback || (() => {
        // eslint - do nothing. 
      });

      // Event bus
      this.events = new EventEmitter();

      this.events.emit(Event.resize);

      // Initialitze
      this.init();

    } catch (e) {
      // Global error wrapper
      throw new BoomerangError(e)
    }
  }

  private init(): void {

    if (typeof window !== 'object') {
      throw new BoomerangError('Window object not found.');
    }

    if (!this.container.length) {
      throw new BoomerangError(`Element with class name ${this.selector} not found.`);
    }

    this.callback();

    setTimeout(() => {
      this.events.on(Event.resize, () => {
        console.log(`${Event.resize} triggered`)
      });
    }, 100)
  }
}

export default Main;
