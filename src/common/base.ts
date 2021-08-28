import { IViewport } from "@/helpers/intefaces";
import { BoomerangEvent, EventEmitter } from "@/common/events";
import { BoomerangError } from "@/helpers/error";
import * as utils from "@/helpers/utils";

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

    // Test window is defined
    if (!window) {
      throw new BoomerangError("window is not found.");
    }

    // Test document is defined
    if (!document) {
      throw new BoomerangError("document is not found.");
    }

    // Event bus
    this.events = new EventEmitter();

    // Set viewport
    this.viewport = this.getViewport();

    // Bind events
    this.bind()
  }

  /**
   * Bind events
   */
  private bind(): void {
    // Bind window events
    window.addEventListener("resize", utils.debounce(this.handleResize.bind(this)));
    window.addEventListener("scroll", utils.debounce(this.handleScroll.bind(this)));

    // on viewport resize event
    this.events.on(BoomerangEvent.viewport.resize, (viewport: IViewport) => {
      // Update vieport
      this.viewport = viewport;
    });
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