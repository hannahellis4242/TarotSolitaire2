import Card from "./Card";
import Layout from "./Layout";
import Location, { PlayLocation } from "./Location";
export default class Stock implements Location {
  private cards: Card[];
  name: PlayLocation;
  constructor(layout: Layout) {
    this.name = "stock";
    this.cards = layout.stock;
  }
  getAnchor(): Card | undefined {
    return this.cards.at(-1);
  }
  proposedChild(child: Card): boolean {
    //cannot drop any cards on the stock
    return false;
  }
}
