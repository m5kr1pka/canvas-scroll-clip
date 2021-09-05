/**
 * Mock Canvas / Context2D calls
 * 
 * @param window 
 */
// eslint-disable-next-line
export function mockCanvas(window: any): void {

  window.HTMLCanvasElement.prototype.getContext = (): CanvasRenderingContext2D => {
    return {
      // @ts-expect-error Let's ignore a compile error like this unreachable code
      canvas: (): HTMLCanvasElement => {
        // eslint - do nothing.
      },
      fillRect: function (): void {
        // eslint - do nothing.
      },
      clearRect: function (): void {
        // eslint - do nothing.
      },
      getImageData: function (x: number, y: number, w: number, h: number): ImageData {
        return {
          data: new Uint8ClampedArray(x * y * w * h),
          height: 800,
          width: 600
        } as ImageData;
      },
      putImageData: function (): void {
        // eslint - do nothing.
      },
      setTransform: function (): void {
        // eslint - do nothing.
      },
      drawImage: function (): void {
        // eslint - do nothing.
      },
      save: function (): void {
        // eslint - do nothing.
      },
      fillText: function (): void {
        // eslint - do nothing.
      },
      restore: function (): void {
        // eslint - do nothing.
      },
      beginPath: function (): void {
        // eslint - do nothing.
      },
      moveTo: function (): void {
        // eslint - do nothing.
      },
      lineTo: function (): void {
        // eslint - do nothing.
      },
      closePath: function () {
        // eslint - do nothing.
      },
      stroke: function (): void {
        // eslint - do nothing.
      },
      translate: function (): void {
        // eslint - do nothing.
      },
      scale: function (): void {
        // eslint - do nothing.
      },
      rotate: function (): void {
        // eslint - do nothing.
      },
      arc: function (): void {
        // eslint - do nothing.
      },
      fill: function (): void {
        // eslint - do nothing.
      },
      measureText: function (): TextMetrics {
        // eslint-disable-next-line
        // @ts-ignore
        return {
          actualBoundingBoxAscent: 0,
          actualBoundingBoxDescent: 0,
          actualBoundingBoxLeft: 0,
          actualBoundingBoxRight: 0,
          width: 0
        }
      },
      transform: function (): void {
        // eslint - do nothing.
      },
      rect: function (): void {
        // eslint - do nothing.
      },
      clip: function (): void {
        // // eslint - do nothing.
      },
    };
  }

  window.HTMLCanvasElement.prototype.toDataURL = function () {
    return "";
  }
}