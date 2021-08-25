import { BoomerangError } from "@/helpers/error";
// import { Event } from "@/helpers/events";

export class Canvas {

  /**
   * Canvas
   */
  public element: HTMLCanvasElement;

  /**
   * Canvas context
   */
  public context: CanvasRenderingContext2D;

  /**
   * Creates an instance of Canvas.
   * 
   * @constructor
   * @param {keyof HTMLElementTagNameMap} selector of an HTML element.
   * @memberof Canvas
   */
  constructor(selector: keyof HTMLElementTagNameMap) {

    // Query document for element
    this.element = document.querySelector(selector) as HTMLCanvasElement || undefined;

    // Check if HTMLCanvasElement exists
    if (!this.element) {
      throw new BoomerangError(`Canvas Element with class name "${selector}" not found.`)
    }

    // Set css to preserve aspect ratio
    // this.element.style.setProperty('object-fit', 'contain');

    // Get context
    this.context = this.element.getContext("2d") as CanvasRenderingContext2D;
    this.context.imageSmoothingEnabled = true;
  }

  /**
   * Draw image in Canvas Element
   * 
   * @param image 
   */
  public drawImage(image: HTMLImageElement): void {
    this.context.drawImage(image, 0, 0);
  }
}

export default Canvas;