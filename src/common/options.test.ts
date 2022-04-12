import Options from './options'
import { AppError } from "../helpers/error"

describe('Options', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('verify default identifier is csc', () => {
    const userInputs = {
      framePath: '/frames/frame_0001.jpg',
      frameCount: 121
    };

    expect(new Options(userInputs)).toHaveProperty('identifier', 'csc');
  });

  test('verify user inputs are stored', () => {
    const userInputs = {
      framePath: '/frames/frame_0001.jpg',
      frameCount: 121,
      identifier: 'test',
      scrollArea: '1000'
    };

    expect(new Options(userInputs)).toHaveProperty('inputs', userInputs);
    expect(new Options(userInputs)).toHaveProperty('identifier', 'test');
  });

  test('verify when scroll area is not set to be possible to update', () => {
    const userInputs = {
      framePath: '/frames/frame_0001.jpg',
      frameCount: 121,
      scrollArea: 0
    };

    const options = new Options(userInputs);
    expect(options).toHaveProperty('scrollArea', 0);

    options.setScrollableArea = 777;
    expect(options).toHaveProperty('scrollArea', 777)
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

    expect(a).toHaveProperty(['frame', 'path'], '/');
    expect(b).toHaveProperty(['frame', 'path'], '/frames/');
  });

  test('verify not supported image extension', () => {
    const fn = () => {
      new Options({
        framePath: '/frames/frame_01.gif',
        frameCount: 121
      });
    }

    expect(fn).toThrowError(AppError);
    expect(fn).toThrowError(new RegExp('Image with extension'));
  });

  test('verify image sequence structure error', () => {
    const fn = () => {
      new Options({
        framePath: '/frames/frame_01.jpg',
        frameCount: 121
      });
    }

    expect(fn).toThrowError(AppError);
    expect(fn).toThrowError(new RegExp('Leading zeros'));
  });

});