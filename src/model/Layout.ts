import Card from "./Card";
import Discard from "./Discard";
import Foundation from "./Foundation";
import Parent from "./Parent";
import { showChain } from "./chainUtils";
import Stock from "./Stock";
import Tableau from "./Tableau";

export const forceMove = (source: Card, target: Parent, faceUp: boolean) => {
  source.faceUp = faceUp;
  if (source.parent) {
    source.parent.setChild();
  }
  target.forceChild(source);
};

export default class Layout {
  tableau: Tableau[];
  foundation: Foundation[];
  stock: Stock;
  discard: Discard;
  constructor() {
    this.tableau = new Array(9).fill(0).map(() => new Tableau());
    this.foundation = new Array(5).fill(0).map(() => new Foundation());
    this.stock = new Stock();
    this.discard = new Discard();
  }
  show(): string {
    let out = "layout - \n";
    out += " stock : " + showChain(this.stock) + "\n";
    out += " discard : " + showChain(this.discard) + "\n";
    out += " foundation - \n";
    out += this.foundation.map((x, i) => `  ${i} : ${showChain(x)}`).join("\n");
    out += "\n";
    out += " tableau - \n";
    out += this.tableau.map((x, i) => `  ${i} : ${showChain(x)}`).join("\n");
    out += "\n";
    return out;
  }

  nextCard() {
    if (this.stock.child) {
      //the stock is not depleated so we can move the last child of the stock to the last child of the discard
      const source = lastCard(this.stock.child);
      const target = lastChild(this.discard);
      forceMove(source, target, true);
    }
  }
}

const lastChild = (parent: Parent): Parent => {
  return parent.child ? lastCard(parent.child) : parent;
};

const lastCard = (card: Card): Card => {
  return card.child ? lastCard(card.child) : card;
};

export const populate = (deck: Card[]): Layout => {
  const layout = new Layout();
  for (let i = 0; i < layout.tableau.length; ++i) {
    for (let j = i; j < layout.tableau.length; ++j) {
      const location = lastChild(layout.tableau[j]);
      location.forceChild(deck.shift());
    }
  }
  let parent = layout.stock;
  while (parent) {
    const card = deck.shift();
    parent.forceChild(card);
    parent = card;
  }
  return layout;
};
