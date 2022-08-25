import Card from "./Card";
import Discard from "./Discard";
import Foundation from "./Foundation";
import Link from "./Link";
import { forEachCardInChain, lastChild, showChain } from "./chainUtils";
import Stock from "./Stock";
import Tableau from "./Tableau";

export const forceMove = (source: Card, target: Link, faceUp: boolean) => {
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
      const source = lastChild(this.stock.child);
      const target = lastChild(this.discard);
      if (source instanceof Card) {
        forceMove(source, target, true);
      }
    } else {
      //the stock is depleated
      //we need to move the discard pile over to the stock pile
      const source = this.discard.child;
      if (source) {
        //we have something to move
        const target = this.stock;
        forceMove(source, target, false);
        //also turn all the stock cards face down
        forEachCardInChain((card: Card) => {
          card.faceUp = false;
        }, target.child);
      }
    }
  }
}

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
