import Card from "./Card";
import Layout from "./Layout";
import Location, { PlayLocation } from "./Location";

export default class Discard implements Location {
  name: PlayLocation;
  private cards: Card[];
  constructor(public layout: Layout) {
    this.name = "discard";
    this.cards = layout.discard;
  }
  getAnchor(): Card | undefined {
    return this.cards.at(-1);
  }
  proposedChild(_: Card): boolean {
    //discard does not accept any card being dropped on it.
    return false;
  }
}
