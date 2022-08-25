import Card from "./Card";
import Discard from "./Discard";
import Foundation from "./Foundation";
import Link from "./Link";
import {
  forEachCardInChain,
  lastChild,
  reverseChainAfter,
  showChain,
} from "./chainUtils";
import Stock from "./Stock";
import Tableau from "./Tableau";

export const forceMove = (source: Card, target: Link) => {
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
    const source = lastChild(this.stock);
    const target = lastChild(this.discard);
    if (source instanceof Card) {
      //the stock is not depleated, so we can simply move the card over;
      forceMove(source, target);
      //and turn the card face up
      source.faceUp = true;
    } else if (this.discard.child && this.discard.child instanceof Card) {
      //the stock is depleated and there are cards in the discard, so we move the deck back to the stock
      forceMove(this.discard.child, source);
      //and turn them over
      forEachCardInChain((card: Card) => {
        card.faceUp = false;
      }, this.stock);
      //and finally reverse them
      reverseChainAfter(this.stock);
    }
  }
  move(source: Link, target: Link): boolean {
    if (target.location() === "discard" || target.location() === "stock") {
      return false;
    }
    if (source instanceof Card) {
      return target.setChild(source);
    }
    return false;
  }
}

export const populate = (deck: Card[]): Layout => {
  const layout = new Layout();
  for (let i = 0; i < layout.tableau.length; ++i) {
    for (let j = i; j < layout.tableau.length; ++j) {
      const location = lastChild(layout.tableau[j]);
      location.forceChild(deck.shift());
    }
    const last = lastChild(layout.tableau[i]);
    if (last instanceof Card) {
      last.faceUp = true;
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
