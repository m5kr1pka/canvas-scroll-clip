import CanvasClip from './main'
import { IUserInputs } from './helpers/intefaces';

describe("CanvasClip", () => {
  const defaultOptions = {
    framePath: "/frame_0001.jpg",
    frameCount: 30
  } as IUserInputs;

  beforeEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  test('verify callback is triggered at nextTick', done => {
    const container = document.createElement('div');
    const callback = jest.fn();

    new CanvasClip(container, defaultOptions, callback);

    expect.assertions(1);
    setTimeout(() => {
      // Init async test
      expect(callback).toBeCalledTimes(1);
      // Wait for async to finish before continueing to next test
      // OnFail 5000ms timeout
      done();
    });
  });
});