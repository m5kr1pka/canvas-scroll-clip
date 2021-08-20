import { BoomerangError, BoomerangLogger, BoomerangWarning } from "./error";

describe("BoomerangError", () => {

  test('verify that error is thrown', () => {
    const fn = () => {
      throw new BoomerangError(`throws ${BoomerangError.name} error.`);
    };

    expect(fn).toThrowError(BoomerangError);
  });
});

describe("BoomerangLogger", () => {
  const boomer = new BoomerangLogger();

  test('verify console.warn message in console', () => {
    const log = jest.spyOn(console, "log").mockImplementation();
    const message = `This is console.log message to be printed in console.`;

    boomer.log(message);

    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith(expect.stringContaining(BoomerangLogger.name));
    expect(console.log).toBeCalledWith(expect.stringContaining(message));

    log.mockReset();
  })

  test('verify console.warn message in console', () => {
    const warn = jest.spyOn(console, "warn").mockImplementation();
    const message = `This is console.warn message to be printed in console.`;

    boomer.warn(message);

    expect(console.warn).toBeCalledTimes(1);
    expect(console.warn).toBeCalledWith(expect.stringContaining(BoomerangLogger.name));
    expect(console.warn).toBeCalledWith(expect.stringContaining(message));

    warn.mockReset();
  })
});

describe("BoomerangWarning", () => {

  test('verify console.warn message in console', () => {
    const warn = jest.spyOn(console, "warn").mockImplementation();
    const message = `Raises ${BoomerangWarning.name} in console.`;

    new BoomerangWarning(message);

    expect(console.warn).toBeCalledTimes(1);
    expect(console.warn).toBeCalledWith(expect.stringContaining(BoomerangWarning.name));
    expect(console.warn).toBeCalledWith(expect.stringContaining(message));

    warn.mockReset();
  })
});