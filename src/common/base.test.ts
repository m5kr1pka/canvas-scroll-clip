import { AppEvent } from "../helpers/utils";
import { Base } from "./base"

describe('Base', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('verify screen viewport is defined', () => {
    const base = new Base();

    expect(base).toHaveProperty('screen', {
      width: 1024,
      height: 768
    });
  });

  test('verify resize and scroll events are attached', () => {
    const mock = jest.spyOn(window, 'addEventListener');

    new Base();

    expect(window.addEventListener).toBeCalledTimes(2);
    expect(window.addEventListener).toBeCalledWith('resize', expect.anything());
    expect(window.addEventListener).toBeCalledWith('scroll', expect.anything());

    mock.mockRestore();
  });

  test("verify resize event is triggered", () => {
    const callback = jest.fn();
    const base = new Base();

    expect(base).toHaveProperty('screen', { width: 1024, height: 768 });

    // emit resize event
    base.events.on(AppEvent.viewport.resize, callback);
    base.events.emit(AppEvent.viewport.resize, { width: 800, height: 600 });

    // Test whether the screen property has changed
    expect(base).toHaveProperty('screen', { width: 800, height: 600 });
    expect(callback).toHaveBeenCalled();
  });

  test("verify handleResize triggers a resize event", () => {
    const fn = jest.fn();
    const base = new Base();

    // bind
    base.events.on(AppEvent.viewport.resize, fn);

    // trigger
    base.handleResize();

    expect(fn).toHaveBeenCalled();
  });

  test("verify handleScroll triggers a scroll event and test it", () => {
    const fn = jest.fn((scrollTop) => {
      return scrollTop;
    });
    const base = new Base();

    // bind
    base.events.on(AppEvent.viewport.scroll, fn);

    // trigger
    base.handleScroll();

    expect(fn).toHaveBeenCalled();
    expect(fn).toReturnWith(0);

    // Test scrolling
    global.document.documentElement.scrollTop = 100;

    // trigger
    base.handleScroll();

    expect(fn).toReturnWith(100);
  });
});