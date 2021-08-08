import { Event, EventEmitter } from "../helpers/events";

test("simple event", () => {
  const event = Event.resize;
  const callback = jest.fn();

  const emitter = new EventEmitter();

  emitter.on(event, callback);
  emitter.emit(event);

  expect(callback).toHaveBeenCalled();
});

test("repeated callback", () => {
  const event = Event.resize;
  const callback = jest.fn();

  const emitter = new EventEmitter();

  emitter.on(event, callback);
  emitter.on(event, callback);
  emitter.on(event, callback);
  emitter.emit(event);

  expect(callback).toHaveBeenCalledTimes(3);
});

test("multiple events", () => {
  const event1 = Event.resize;
  const event2 = Event.scroll;
  const callback1 = jest.fn();
  const callback2 = jest.fn();

  const emitter = new EventEmitter();

  emitter.on(event1, callback1);
  emitter.on(event2, callback2);
  emitter.emit(event1);

  expect(callback1).toHaveBeenCalled();
  expect(callback2).not.toHaveBeenCalled();
});