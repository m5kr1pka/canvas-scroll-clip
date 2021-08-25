import Options from './options'
import { BoomerangError } from "./error"

describe('Options', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('validate frame options', () => {
    const options = new Options({
      framePath: '/frames/frame_0001.jpg',
      frameCount: 121
    });

    const expected = {
      path: '/frames/',
      count: 121,
      image: {
        start: 'frame_',
        sequence: 1,
        padStart: 4,
        ending: '.jpg',
        extension: '.jpg',
      }
    }

    expect(options).toEqual(expected);
  });

  test('verify option frame path not defined', () => {
    const fn = () => {
      new Options({
        framePath: '',
        frameCount: 121
      });
    };

    expect(fn).toThrowError(BoomerangError);
    expect(fn).toThrowError(new RegExp('Frame path'));
  });

  test('verify option frame count not defined', () => {
    const fn = () => {
      new Options({
        framePath: '/frames/frame_0001.jpg',
        frameCount: 0
      });
    };

    expect(fn).toThrowError(BoomerangError);
    expect(fn).toThrowError(new RegExp('Frame count'));
  });

  test('verify option path to be valid', () => {
    const a = new Options({
      framePath: 'frame_0001.jpg',
      frameCount: 121
    });

    const b = new Options({
      framePath: '/frames/frame_0001.jpg',
      frameCount: 121
    });

    expect(a).toHaveProperty(['path'], '/');
    expect(b).toHaveProperty(['path'], '/frames/');
  });

  test('verify not supported image extension', () => {
    const fn = () => {
      new Options({
        framePath: '/frames/frame_01.webp',
        frameCount: 121
      });
    }

    expect(fn).toThrowError(BoomerangError);
    expect(fn).toThrowError(new RegExp('Image with extension'));
  });

  test('verify image sequence structure error', () => {
    const fn = () => {
      new Options({
        framePath: '/frames/frame_01.jpg',
        frameCount: 121
      });
    }

    expect(fn).toThrowError(BoomerangError);
    expect(fn).toThrowError(new RegExp('Leading zeros'));
  });
});