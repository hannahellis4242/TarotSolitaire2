import Card from "./Card";
import Layout from "./Layout";
import { PlayLocation } from "./Location";

export default class Foundation {
  name: PlayLocation;
  cards: Card[];
  constructor(public layout: Layout, index: number) {
    this.name = "foundation";
    this.cards = layout.foundation[index];
  }
  proposedChild(child: Card): boolean {
    const topCard = this.cards.at(-1);
    return topCard
      ? topCard.allowed(this.name, child)
      : child.pip === "Ace" || child.pip === "0";
  }
}
