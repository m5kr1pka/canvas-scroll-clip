import Canvas from "./canvas";
import { AppError } from "../helpers/error"
import { AppEvent } from "../helpers/utils";

describe('Canvas', () => {
  const defaultOptions = {
    framePath: '/frames/App_0001.jpg',
    frameCount: 121,
    scrollArea: 1000,
    identifier: 'App'
  }

  beforeEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  test('verify when element not defined', () => {
    const mock = jest.spyOn(document, 'querySelector');
    const container = document.querySelector('.test-container') as HTMLElement;
    const fn = () => {
      new Canvas(container, defaultOptions);
    }

    expect(document.querySelector).toBeCalledTimes(1);
    expect(fn).toThrowError(AppError);
    expect(fn).toThrowError(new RegExp('not defined'));

    mock.mockRestore();
  });

  test('verify App template initialized properly', () => {
    document.body.innerHTML = '<div class="canvas-container"></div>';
    const container = document.querySelector('.canvas-container') as HTMLElement;
    new Canvas(container, defaultOptions);

    expect(container).toBeDefined();
    expect(container.classList.contains(`${defaultOptions.identifier}-container`)).toBe(true);
    expect(container.style.height).toBe(`${defaultOptions.scrollArea}px`);
    expect(container.firstElementChild).toBeDefined();
    expect(container.firstElementChild?.classList.contains(`App`)).toBe(true);
    expect(container.firstElementChild?.firstElementChild).toBeDefined();
    expect(container.firstElementChild?.firstElementChild?.nodeName.toUpperCase()).toBe('CANVAS');
    expect(container.firstElementChild?.firstElementChild?.classList.contains(`App-canvas`)).toBe(true);
  });

  test('verify preload', () => {
    document.body.innerHTML = '<div class="canvas-container"></div>';
    const container = document.querySelector('.canvas-container') as HTMLElement;
    const canvas = new Canvas(container, defaultOptions);
    const cb = jest.fn((progress) => {
      return progress;
    });

    canvas.events.on(AppEvent.images.progress, cb);

    canvas.events.on(AppEvent.images.loaded, () => {
      expect(cb).toHaveBeenCalledTimes(defaultOptions.frameCount);
    });
  });
});