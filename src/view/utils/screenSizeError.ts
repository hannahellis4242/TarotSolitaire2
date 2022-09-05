import Rectangle from "./Rectangle";

export const screenSizeError = (target: Rectangle, actual: Rectangle) => {
  const x = target.area() - actual.area();
  return x * x;
};
