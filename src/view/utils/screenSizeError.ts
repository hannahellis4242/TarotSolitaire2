import Rectangle from "./Rectangle";

const scale = (target: number, actual: number) => {
  const x = actual - target;
  const y = Math.exp(x);
  return x * x * (y + 1);
};

export const screenSizeError = (target: Rectangle, actual: Rectangle) => {
  return (
    scale(target.width, actual.width) + scale(target.height, actual.height)
  );
};
