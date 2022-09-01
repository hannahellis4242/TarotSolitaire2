class Parameters {
  constructor(
    public screenHeight: number,
    public screenWidth: number,
    public verticalSpacing: number,
    public horizontalSpacing: number,
    public cardWidth: number,
    public cardHeight: number
  ) {}
}
const calculateParameters = (
  screen: { width: number; height: number },
  horizontalSpacingFactor: number
): Parameters => {
  const screenHeight = screen.height;
  const screenWidth = screen.width;
  const cardWidth = screenWidth / (9 + 10 * horizontalSpacingFactor);
  const horizontalSpacing = horizontalSpacingFactor * cardWidth;
  const cardHeight = (12 * cardWidth) / 7;
  const verticalSpacing = (screenHeight - 4 * cardHeight) / 4;
  return new Parameters(
    screenHeight,
    screenWidth,
    verticalSpacing,
    horizontalSpacing,
    cardWidth,
    cardHeight
  );
};

const calculateHorizontalGridPositions = ({
  cardWidth,
  horizontalSpacing,
}: Parameters): number[] => {
  return new Array(9)
    .fill(0)
    .map((_, i) => Math.floor(horizontalSpacing + i * cardWidth));
};

const calculateVerticalGridPositions = ({
  cardHeight,
  verticalSpacing,
}: Parameters): number[] => {
  return new Array(2)
    .fill(0)
    .map((_, i) => Math.floor(verticalSpacing * i + cardHeight));
};

export default class Grid {
  private xs: number[];
  private ys: number[];
  private cardWidth: number;
  private cardHeight: number;
  constructor(
    screen: { width: number; height: number },
    horizontalScalingFactor: number
  ) {
    const params = calculateParameters(screen, horizontalScalingFactor);
    console.log(params);
    this.cardWidth = Math.floor(params.cardWidth);
    this.cardHeight = Math.floor(params.cardHeight);
    this.xs = calculateHorizontalGridPositions(params);
    this.ys = calculateVerticalGridPositions(params);
  }
  getCardDimentions() {
    return { width: this.cardWidth, height: this.cardHeight };
  }
  getPosition(i: number, j: number) {
    if (i >= 0 && i < this.xs.length && j >= 0 && j < this.ys.length) {
      return { x: this.xs[i], y: this.ys[j] };
    }
    return undefined;
  }
}
