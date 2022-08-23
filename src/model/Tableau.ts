import Card from "./Card";
import Layout from "./Layout";
import Location, { PlayLocation } from "./Location";
export default class Tableau implements Location {
  name: PlayLocation = "tableau";
  cards: Card[];
  depth: number;
  constructor(layout: Layout, index: number, depth?: number) {
    this.cards = layout.tableau[index];
    this.depth = depth || 1;
  }
  proposedChild(child: Card): boolean {
    const topCard = this.cards.at(-1);
    return topCard
      ? topCard.allowed(this.name, child)
      : child.pip === "King" || child.pip === "XXI";
  }
  getAnchor(): Card | undefined {
    return this.cards.at(-this.depth);
  }
}
