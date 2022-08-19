import Card, { CardState } from "./Card";
import { Colour } from "./Colour";
import Target, { TargetState } from "./Target";

export default class View {
  private cards: Card[];
  private targets: Target[];
  private dragging: Card | undefined;
  constructor() {
    this.cards = [];
    this.targets = [];
    this.dragging = undefined;
  }
  createCard(colour: Colour) {
    const card = new Card(colour, this, document.body);
    this.cards.push(card);
  }
  createTarget = (x: number, y: number, colour: Colour) => {
    const target = new Target(x, y, colour, this, document.body);
    this.targets.push(target);
  };
  setSelected(card?: Card) {
    if (this.dragging) {
      this.dragging.setState(CardState.Unselected);
    }
    this.dragging = card;
    if (this.dragging) {
      this.dragging.setState(CardState.Selected);
    }
  }
  getSelected(): Card | undefined {
    return this.dragging;
  }
}
