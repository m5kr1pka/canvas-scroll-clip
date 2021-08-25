import { IViewport } from "@/helpers/intefaces";
import { BoomerangEvent, EventEmitter } from "@/helpers/events";
import { BoomerangError } from "@/helpers/error";

export class Base {

  /**
   * EventEmitter 
   */
  public events: EventEmitter;

  /**
   * Viewport
   */
  public viewport: IViewport;

  /**
   * Creates an instance.
   * 
   * @constructor
   * @memberof Base
   * @throws
   */
  constructor() {

    if (!window) {
      throw new BoomerangError("window is not found.");
    }

    if (!document) {
      throw new BoomerangError("document is not found.");
    }

    // Event bus
    this.events = new EventEmitter();

    // Viewport listener
    this.events.on(BoomerangEvent.viewport.resize, (viewport: IViewport) => {
      this.viewport = viewport;
    });

    // Set viewport
    this.viewport = this.getViewport();
  }

  /**
   * Get window viewport size
   * 
   * @returns {IViewport}
   */
  private getViewport(): IViewport {
    return {
      x: window.innerWidth || document.documentElement?.clientWidth,
      y: window.innerHeight || document.documentElement?.clientHeight
    };
  }

  /**
   * Set Viewport sizes on window resize event
   */
  public handleResize(): void {
    this.events.emit(BoomerangEvent.viewport.resize, this.getViewport());
  }

  /**
   * Set scrolltop on window scroll event
   */
  public handleScroll(): void {
    // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    this.events.emit(BoomerangEvent.viewport.scroll, scrollTop)
  }
}

export default Base;