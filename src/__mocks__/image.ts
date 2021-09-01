import { debounce } from "../helpers/utils";

class ImageMock {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _src: any;

  public get src() {
    return this._src;
  }

  public set src(source: string) {
    this._src = source
    this.onload();
  }

  onload() {
    return debounce(() => {
      // eslint no-empty-arrow-function
    }, 100)
  }

  onerror() {
    return debounce(() => {
      // eslint no-empty-arrow-function
    }, 100)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global.Image as any) = ImageMock;