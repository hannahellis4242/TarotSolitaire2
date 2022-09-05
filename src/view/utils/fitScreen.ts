import GameScreen from "./GameScreen";
import { minFindAuto } from "./minFind";
import Rectangle from "./Rectangle";
import { screenSizeError } from "./screenSizeError";
import TarotParameters from "./TarotParameters";

const buildScreen = (width: number) => {
  const parameters = new TarotParameters(
    width,
    0.1,
    { horizontal: 0.25, vertical: 0.1 },
    { horizontal: 0.25, vertical: 0.1 },
    25
  );
  return new GameScreen(parameters);
};

const calculateScreen = (width: number, target: Rectangle) => {
  const screen = buildScreen(width);
  return screenSizeError(
    target,
    new Rectangle(screen.width(), screen.height())
  );
};

export const fitScreen = (target: Rectangle) => {
  const fitWidth = minFindAuto((width) => {
    return calculateScreen(width, target);
  }, 0.5);
  return buildScreen(Math.round(fitWidth));
};
