import { rms } from './rms.js';

describe('rms', () => {
  it('Empty Array - NaN', () => {
    const value = rms([]);
    expect(value).toBe(NaN);
  });

  it('Values - [1]', () => {
    const value = rms([1]);
    expect(value).toBe(1);
  });

  it('Values - [1, 0, 0]', () => {
    const value = rms([1, 0, 0]);
    expect(value).toBe(0.5773502691896257);
  });

  it('Values - [500, 100, 150]', () => {
    const value = rms([500, 100, 150]);
    expect(value).toBe(306.86587732536617);
  });
});
