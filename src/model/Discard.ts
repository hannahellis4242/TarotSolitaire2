import Card from "./Card";
import Layout from "./Layout";
import Location from "./Location";

export default class Discard implements Location {
  name: string;
  cards: Card[];
  constructor(public layout: Layout) {
    this.name = "discard";
    this.cards = layout.discard;
  }
  proposedChild(child: Card): boolean {
    //discard accepts any child card
    return true;
  }
}
