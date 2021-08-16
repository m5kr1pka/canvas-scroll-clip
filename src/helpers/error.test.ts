import { BoomerangError, BoomerangWarning } from "./error";

describe("BoomerangError", () => {
  const error = new BoomerangError("throws boomerang error.");

  test('verify that error is thrown', () => {
    const fn = () => {
      throw error;
    };

    expect(() => { fn() }).toThrowError(error);
  });
});

describe("BoomerangWarning", () => {

  test('verify console.warn message in console', () => {
    const message = "raises boomerang warning.";
    const warn = jest.spyOn(console, "warn").mockImplementation();

    new BoomerangWarning(message);

    expect(console.warn).toBeCalledTimes(1);
    expect(console.warn).toHaveBeenLastCalledWith(expect.stringContaining('BoomerangWarning'));
    expect(console.warn).toHaveBeenLastCalledWith(expect.stringContaining(message));

    warn.mockReset();
  })
});