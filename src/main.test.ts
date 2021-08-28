import Boomerang from './main'

describe("Boomerang", () => {
  const defaultOptions = {
    framePath: "/frame_0001.jpg",
    frameCount: 30
  }

  beforeEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  test("verify if default element is found", () => {
    // const container = document.createElement('div');
    const mock = jest.spyOn(document, 'querySelector');
    // const instance = new Boomerang(container, defaultOptions);

    // expect(document.querySelector).toBeCalledTimes(1);
    // expect(document.querySelector).toReturn();

    mock.mockRestore();
  });

  test('verify callback is triggered at nextTick', done => {
    const container = document.createElement('div');
    const callback = jest.fn();

    new Boomerang(container, defaultOptions, callback);

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