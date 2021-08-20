import { BoomerangError } from "@/helpers/error";
import { EventEmitter } from "@/helpers/events";
import { CallbackFunction } from "@/helpers/utils"
import { IOptions, Options } from '@/helpers/options';

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
  public selector: keyof HTMLElementTagNameMap;

  /**
   * Queried ```HTMLElement``` based on selector.
   */
  public element: HTMLElement;

  private options: Options;

  /**
   * Events 
   */
  public events: EventEmitter;

  /**
   * This callback is called when the class is loaded
   * 
   * @callback CallbackFunction
   */
  public callback: CallbackFunction;

  /**
   * Creates an instance of Boomerang.
   * @constructor
   * @param {String} class name of an HTML element | default '.boomerang'.
   * @param {function} Callback function
   * @memberof Main
   */
  constructor(selector: keyof HTMLElementTagNameMap, options: IOptions, callback?: CallbackFunction) {

    try {
      // CSS class of a HTML element
      this.selector = selector;

      // Query document for element
      this.element = document.querySelector(this.selector) as HTMLElement;

      // Set options
      this.options = new Options(options);

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

    const getByFrameNumber = (frameNumber: number = 1): string => {
      const frameOptions = this.options.frame;
      const frameNumberStr = frameNumber.toString();

      return [
        `${frameOptions.path}/`,
        frameOptions.image.start,
        frameNumberStr.toString().padStart(frameOptions.image.padStart, "0"),
        frameOptions.image.ending
      ].join("");
    }

    console.log(getByFrameNumber());
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
