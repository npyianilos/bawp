export function rms(xs: ArrayLike<number>) {
  let sumOfSquares = 0;
  for (let i = 0; i < xs.length; i++) sumOfSquares += xs[i] ** 2;
  return Math.sqrt(sumOfSquares / xs.length);
}
