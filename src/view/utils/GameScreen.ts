export interface Spacing {
  horizontal: number;
  vertical: number;
}

export interface ScreenParameters {
  card: { width: number; height: number; overlap: number; spacing: Spacing };
  layout: { spacing: Spacing };
  toolbar: number;
}

export type Orientation = "vertical" | "horizontal";

export default class GameScreen {
  constructor(private parameters: ScreenParameters) {}
  width() {
    const { card, layout } = this.parameters;
    return (
      2 * layout.spacing.horizontal +
      9 * card.width +
      8 * card.spacing.horizontal
    );
  }
  height() {
    const { card, layout, toolbar } = this.parameters;
    return (
      toolbar +
      2 * layout.spacing.vertical +
      2 * (card.height + card.spacing.vertical) +
      29 * card.overlap
    );
  }
  grid(orient: Orientation, index: number) {
    const { card, layout, toolbar } = this.parameters;
    switch (orient) {
      case "horizontal":
        return index >= 0 && index < 9
          ? layout.spacing.horizontal +
              index * (card.width + card.spacing.horizontal)
          : undefined;
      case "vertical":
        if (index >= 0) {
          const top = toolbar + layout.spacing.vertical;
          const exposedCardGridSpace = card.height + card.spacing.vertical;
          const tableauTop = top + exposedCardGridSpace;
          if (index === 0) {
            return top;
          } else if (index === 1) {
            return tableauTop;
          } else {
            return tableauTop + (index - 1) * card.overlap;
          }
        }
        return undefined;
    }
  }
}
