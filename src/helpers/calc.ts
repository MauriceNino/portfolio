export const lerp = (a: number, [x, y]: [number, number]) =>
  x * (1 - a) + y * a;

export const clamp = (a: number, [min, max]: [number, number]) =>
  Math.min(max, Math.max(min, a));

export const invlerp = (a: number, [x, y]: [number, number], clmp = true) =>
  clmp ? clamp((a - x) / (y - x), [0, 1]) : (a - x) / (y - x);

export const range = (
  a: number,
  [x1, y1]: [number, number],
  [x2, y2]: [number, number],
  clmp = true
) => lerp(invlerp(a, [x1, y1], clmp), [x2, y2]);
