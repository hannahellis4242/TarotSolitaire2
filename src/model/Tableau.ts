import Card from "./Card";
import Layout from "./Layout";
import Location, { PlayLocation } from "./Location";
export default class Tableau implements Location {
  name: PlayLocation = "tableau";
  cards: Card[];
  constructor(layout: Layout, index: number, public depth?: number) {
    this.cards = layout.tableau[index];
  }
  proposedChild(child: Card): boolean {
    const topCard = this.cards.at(-1);
    return topCard
      ? topCard.allowed(this.name, child)
      : child.pip === "King" || child.pip === "XXI";
  }
}
