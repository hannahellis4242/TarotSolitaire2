import Card from "./Card";
import Layout from "./Layout";

export default class Foundation {
  name: string;
  cards: Card[];
  constructor(public layout: Layout, index: number) {
    this.name = "foundation";
    this.cards = layout.foundation[index];
  }
  proposedChild(child: Card): boolean {
    return true;
  }
}
