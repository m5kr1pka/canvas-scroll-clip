import { AppError, AppLogger, AppWarning } from "./error";

describe("AppError", () => {

  test('verify that error is thrown', () => {
    const fn = () => {
      throw new AppError(`throws ${AppError.name} error.`);
    };

    expect(fn).toThrowError(AppError);
  });
});

describe("AppLogger", () => {
  const boomer = new AppLogger();

  test('verify console.warn message in console', () => {
    const log = jest.spyOn(console, "log").mockImplementation();
    const message = `This is console.log message to be printed in console.`;

    boomer.log(message);

    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith(expect.stringContaining(AppLogger.name));
    expect(console.log).toBeCalledWith(expect.stringContaining(message));

    log.mockReset();
  })

  test('verify console.warn message in console', () => {
    const warn = jest.spyOn(console, "warn").mockImplementation();
    const message = `This is console.warn message to be printed in console.`;

    boomer.warn(message);

    expect(console.warn).toBeCalledTimes(1);
    expect(console.warn).toBeCalledWith(expect.stringContaining(AppLogger.name));
    expect(console.warn).toBeCalledWith(expect.stringContaining(message));

    warn.mockReset();
  })
});

describe("AppWarning", () => {

  test('verify console.warn message in console', () => {
    const warn = jest.spyOn(console, "warn").mockImplementation();
    const message = `Raises ${AppWarning.name} in console.`;

    new AppWarning(message);

    expect(console.warn).toBeCalledTimes(1);
    expect(console.warn).toBeCalledWith(expect.stringContaining(AppWarning.name));
    expect(console.warn).toBeCalledWith(expect.stringContaining(message));

    warn.mockReset();
  })
});