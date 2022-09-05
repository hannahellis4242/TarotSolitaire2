import Rectangle from "./Rectangle";

export const screenSizeError = (target: Rectangle, actual: Rectangle) => {
  return target.area() - actual.area();
};
