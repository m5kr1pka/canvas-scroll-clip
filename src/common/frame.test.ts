import { AppError } from "../helpers/error";
import { Frame } from "./frame";

describe('Frame', () => {

  test('verify frame object initialized', () => {
    const frame = new Frame({
      framePath: '/frames/frame_0001.jpg',
      frameCount: 121
    });
    const expected = {
      count: 121,
      path: '/frames/',
      image: {
        ending: ".jpg",
        extension: ".jpg",
        padStart: 4,
        sequence: 1,
        start: "frame_"
      }
    }

    expect(frame).toEqual(expected);
  });

  test('verify frame path not defined', () => {
    const fn = () => {
      new Frame({
        framePath: '',
        frameCount: 121
      });
    };

    expect(fn).toThrowError(AppError);
    expect(fn).toThrowError(new RegExp('Frame path'));
  });

  test('verify frame count not defined', () => {
    const fn = () => {
      new Frame({
        framePath: '/frames/frame_0001.jpg',
        frameCount: 0
      });
    };

    expect(fn).toThrowError(AppError);
    expect(fn).toThrowError(new RegExp('Frame count'));
  });
});