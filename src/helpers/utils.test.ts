import * as utils from './utils'

jest.useFakeTimers();
describe('Utils', () => {

  test('verify regexp expression against random string', () => {
    const fn = (someString: string): string => {
      const match = someString.match(utils.RegExpLastDigitsMatch);

      return (match && match[0] !== null) ? match[0] : "";
    };

    expect(fn('Some101String123_0001.jpg')).toBe('0001');
    expect(fn('Some101String10001.ext')).toBe('10001');
    expect(fn('SomeString1001')).toBe('1001');
    expect(fn('Some101String123_nonsense.ext')).toBe('123');
    expect(fn('SomeString')).toBe("");
  });

  test('verify debouce function', () => {
    const fn = jest.fn();
    const debounced = utils.debounce(fn, 1000);

    for (let i = 0; i < 10; i++) {
      debounced();
    }

    // Fast-forward time
    jest.runAllTimers();

    expect(fn).toBeCalledTimes(1);
  })

  test('verify image loading', () => {
    return utils.getImage('https://avatars.githubusercontent.com/u/8706132')
      .then((image) => {
        expect(image).toBeDefined();
        expect(image).toHaveProperty('src');
      });
  });

  test('verify getScrollTop value', () => {
    return expect(utils.getScrollTop()).toBe(0);
  });

  test('verify', () => {
    const frameOptions = {
      path: '/frames/',
      count: 121,
      image: {
        start: 'frame_',
        sequence: 1,
        padStart: 4,
        ending: '.jpg',
        extension: '.jpg',
      }
    };

    expect(utils.getFramePathByIndex(frameOptions, 100)).toBe('/frames/frame_0100.jpg');
  })
});