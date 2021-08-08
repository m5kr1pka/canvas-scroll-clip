import BoomerangError from "@/helpers/error";
import { Event, EventEmitter } from "@/helpers/events";

/*
* No operation type of function
*/
declare type NoopFunction = () => void;


class Boomerang extends EventEmitter {

  public container: HTMLElement;

  callback: NoopFunction;

  /**
   * Creates an instance of Boomerang.
   * @constructor
   * @param {string} HTML element class name.
   * @param callback function
   */
  constructor(selector: string, callback?: NoopFunction) {
    super();

    if (typeof window !== 'object') {
      throw new BoomerangError();
    }

    this.container = <HTMLElement>document.querySelector(selector);

    if (!this.container) {
      throw new BoomerangError(`Element with class name ${selector} not found.`);
    }

    this.callback = callback || (() => {
      // eslint - do nothing. 
    })

    this.init();
  }

  private init(): void {

    this.callback();

    this.emit(Event.resize);

    this.on(Event.resize, () => {
      console.log(`${Event.resize} triggered`)
    });
  }
}

export default Boomerang;