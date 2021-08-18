import Boomerang from './main'
import { BoomerangError } from './helpers/error'

describe("Boomerang", () => {
  test("throw error if HTMLElement not found", () => {
    const fn = () => {
      new Boomerang('.elementNotFound');
    }
    expect(fn()).toThrowError(BoomerangError);
  });

  test("verify if default HTML element is found", () => {
    jest.clearAllMocks();
    document.body.innerHTML = '<div class="boomerang">Hello</div>';
    const doc = jest.spyOn(document, 'querySelector');
    // const spyFunc = jest.fn();
    // Object.defineProperty(global.document, 'querySelector', { value: spyFunc });

    new Boomerang();
    console.log(document.body.innerHTML);
    console.log(document.querySelector('.boomerang'));
    console.log(doc);

    expect(document.querySelector).toBeCalled()

    // expect(
    //   // getByTestId(document.documentElement, 'html-element')
    // ).toBeInTheDocument()

    // doc.mockReset();
  })
});