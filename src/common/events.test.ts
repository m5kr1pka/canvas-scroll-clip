import { BoomerangEvent, EventEmitter } from "./events";
import { BoomerangWarning } from "../helpers/error"

describe('Event', () => {

  test("has been called", () => {
    const callback = jest.fn();

    const emitter = new EventEmitter();

    emitter.on(BoomerangEvent.viewport.resize, callback);
    emitter.emit(BoomerangEvent.viewport.resize);

    expect(callback).toHaveBeenCalled();
  });

  test("verify console.warn event in console", () => {
    const warn = jest.spyOn(console, "warn").mockImplementation();
    const callback = jest.fn();
    const randomEvent = "Random event";
    const emitter = new EventEmitter();

    emitter.on(randomEvent, callback);

    expect(console.warn).toBeCalledTimes(1);
    expect(console.warn).toBeCalledWith(expect.stringContaining(BoomerangWarning.name));
    expect(console.warn).toBeCalledWith(expect.stringContaining(randomEvent));

    warn.mockReset();
  });

  test("verify repeated callback", () => {
    const callback = jest.fn();

    const emitter = new EventEmitter();

    emitter.on(BoomerangEvent.viewport.resize, callback);
    emitter.on(BoomerangEvent.viewport.resize, callback);
    emitter.on(BoomerangEvent.viewport.resize, callback);
    emitter.emit(BoomerangEvent.viewport.resize);

    expect(callback).toHaveBeenCalledTimes(3);
  });

  test("verify multiple events", () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const emitter = new EventEmitter();

    emitter.on(BoomerangEvent.viewport.resize, callback1);
    emitter.on(BoomerangEvent.viewport.scroll, callback2);
    emitter.emit(BoomerangEvent.viewport.resize);

    expect(callback1).toHaveBeenCalled();
    expect(callback2).not.toHaveBeenCalled();
  });
});