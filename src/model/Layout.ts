import Card from "./Card";
import Move from "./Move";
import Tableau from "./Tableau";

export default class Layout {
  tableau: Card[][];
  foundation: Card[][];
  stock: Card[];
  discard: Card[];
  constructor() {
    this.tableau = new Array(9).fill(0).map(() => new Array<Card>());
    this.foundation = new Array(5).fill(0).map(() => new Array<Card>());
    this.stock = new Array<Card>();
    this.discard = new Array<Card>();
  }
  allowed(move: Move): boolean {
    const card = move.source.getAnchor();
    if (card) {
      return move.target.proposedChild(card);
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
  layout.stock = deck.slice(45);
  return layout;
};
