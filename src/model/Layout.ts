import Card from "./Card";
import Discard from "./Discard";
import Foundation from "./Foundation";
import Parent from "./Parent";
import { showChain } from "./showChain";
import Stock from "./Stock";
import Tableau from "./Tableau";

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
}

const lastChild = (location: Parent): Parent => {
  return location.child ? lastChild(location.child) : location;
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
