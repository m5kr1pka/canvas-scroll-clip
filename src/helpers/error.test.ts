import { BoomerangError, BoomerangWarning } from "./error";

describe("Error", () => {

  test('verify that error is thrown', () => {
    const fn = () => {
      throw new BoomerangError(`throws ${BoomerangError.name} error.`);
    };

    expect(fn).toThrowError(BoomerangError);
  });

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