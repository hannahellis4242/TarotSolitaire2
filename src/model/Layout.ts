import Card from "./Card";
import Move from "./Move";

export default class Layout {
  tableau: Card[][];
  foundation: Card[][];
  pile: Card[];
  discard: Card[];
  constructor() {
    this.tableau = new Array(9).fill(0).map(() => new Array<Card>());
    this.foundation = new Array(5).fill(0).map(() => new Array<Card>());
    this.pile = new Array<Card>();
    this.discard = new Array<Card>();
  }
  allowed(move: Move): boolean {
    const card = move.source.cards.at(-1);
    if (card) {
      return move.target.proposedChild(move.source.cards.at(-1));
    }
    return false;
  }
}
export const populate = (deck: Card[]): Layout => {
  const layout = new Layout();
  const tableauCards = deck.slice(0, 45);
  new Array(9)
    .fill(0)
    .flatMap((_, i) => new Array(i + 1).fill(0).map((_, j) => [i, j]))
    .forEach(([i, j], k) => {
      layout.tableau[i][j] = tableauCards[k];
    });
  layout.pile = deck.slice(45);
  return layout;
};
