import { IViewport } from "@/helpers/intefaces";
import { Event, EventEmitter } from "@/helpers/events";
import { BoomerangError } from "./helpers/error";

export class Base {

  /**
   * EventEmitter 
   */
  public events: EventEmitter;

  /**
   * Creates an instance.
   * 
   * @constructor
   * @memberof Base
   * @throws
   */
  constructor() {

    if (!window) {
      throw new BoomerangError("window not found.");
    }

    if (!document) {
      throw new BoomerangError("document not found.");
    }

    // Event bus
    this.events = new EventEmitter();
  }

  /**
   * Get window viewport size
   * 
   * @returns {IViewport}
   */
  public getViewport(): IViewport {
    return {
      x: window.innerWidth || document.documentElement?.clientWidth,
      y: window.innerHeight || document.documentElement?.clientHeight
    };
  }

  /**
   * Set Viewport sizes on window resize event
   */
  public handleResize(): void {
    this.events.emit(Event.viewport.resize, this.getViewport());
  }

  /**
   * Set scrolltop on window scroll event
   */
  public handleScroll(): void {
    // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    this.events.emit(Event.viewport.scroll, scrollTop)
  }
}

export default Base;