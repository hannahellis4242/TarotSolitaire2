import { ScreenParameters, Spacing } from "./GameScreen";

export default class TarotParameters implements ScreenParameters {
  card: { width: number; height: number; overlap: number; spacing: Spacing };
  layout: { spacing: Spacing };
  constructor(
    cardWidth: number,
    overlapRatio: number,
    spacingRatio: Spacing,
    layoutRatio: Spacing,
    public toolbar: number
  ) {
    const height = (12 / 7) * cardWidth;
    const overlap = overlapRatio * height;
    const cardSpacing = {
      horizontal: spacingRatio.horizontal * cardWidth,
      vertical: spacingRatio.vertical * height,
    };
    const layoutSpacing = {
      horizontal: layoutRatio.horizontal * cardWidth,
      vertical: layoutRatio.vertical * height,
    };
    this.card = { width: cardWidth, height, overlap, spacing: cardSpacing };
    this.layout = { spacing: layoutSpacing };
  }
}
