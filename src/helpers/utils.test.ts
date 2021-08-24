import { RegExpLastDigitsMatch } from './utils'

describe('Utils', () => {

  test('verify regexp expression against random string', () => {
    const fn = (someString: string): string => {
      const match = someString.match(RegExpLastDigitsMatch);

      return (match && match[0] !== null) ? match[0] : "";
    };

    expect(fn('Some101String123_0001.jpg')).toBe('0001');
    expect(fn('Some101String10001.ext')).toBe('10001');
    expect(fn('SomeString1001')).toBe('1001');
    expect(fn('Some101String123_nonsense.ext')).toBe('123');
    expect(fn('SomeString')).toBe("");
  });
});