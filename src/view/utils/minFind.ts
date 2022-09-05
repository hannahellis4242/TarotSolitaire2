/*export const minFind = (
  [x0, x1, x2]: [number, number, number],
  fn: (x: number) => number
): [number, number, number] => {
  const [y0, y1, y2] = [fn(x0), fn(x1), fn(x2)];
  console.log(`[${x0},${x1},${x2}] = [${y0},${y1},${y2}]`);
  const [[a, b, c], [d, e, f], [g, h, i]] = [
    [x0 * x0, x0, 1],
    [x1 * x1, x1, 1],
    [x2 * x2, x2, 1],
  ];
  const det =
    a * e * i + b * f * g + c * d * h - c * e * g - b * d * i - a * f * h;
  const [[ab, bb, cb], [db, eb, fb]] = [
    [a / det, d / det, g / det],
    [b / det, e / det, h / det],
  ];
  const [A, B] = [y0 * ab + y1 * bb + y2 * cb, y0 * db + y1 * eb + y2 * fb];
  const newX = -B / (2 * A);
  const maxY = Math.max(y0, y1, y2);
  if (y0 === maxY) {
    return [newX, x1, x2];
  }
  if (y1 === maxY) {
    return [x0, newX, x2];
  }
  return [x0, x1, newX];
};

const minFindRecursive = (
  xs: [number, number, number],
  fn: (x: number) => number,
  tol: number
): [number, number, number] => {
  //console.log(xs);
  //console.log(tol);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  if (maxX - minX > tol) {
    return minFindRecursive(minFind(xs, fn), fn, tol);
  }
  return xs;
};

export const minFindAuto = (fn: (x: number) => number, tol: number) => {
  return minFindRecursive([10, 20, 30], fn, tol);
};
*/

const minFind = (
  input: [number, number],
  fn: (x: number) => number
): [number, number] => {
  const points = input.map((x) => [x, fn(x)]);
  points.sort(([_, a], [__, b]) => a - b);
  const [[xb, _], [xw, __]] = points;
  const d = xb - xw;
  const halfPoint = xw + d / 2;
  const oneStep = xb + d;
  const twoStep = xb + 2 * d;
  const trials = [halfPoint, oneStep, twoStep].map((x) => [x, fn(x)]);
  trials.sort(([_, a], [__, b]) => a - b);
  return [xb, trials[0][0]];
};

const minFindRecursive = (
  xs: [number, number],
  fn: (x: number) => number,
  tol: number
): [number, number] => {
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  if (maxX - minX > tol) {
    return minFindRecursive(minFind(xs, fn), fn, tol);
  }
  return xs;
};

export const minFindAuto = (fn: (x: number) => number, tol: number) => {
  const [a, b] = minFindRecursive([1, 100], fn, tol);
  return (a + b) / 2;
};
