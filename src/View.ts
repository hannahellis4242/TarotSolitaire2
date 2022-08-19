import Card from "./Card";
import { Colour } from "./Colour";
import Target from "./Target";

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
    const card = new Card(`${this.cards.length + 1}`.toString(), colour, this);
    this.cards.push(card);
    document.body.appendChild(card.element);
  }
  createTarget = (x: number, y: number, colour: Colour) => {
    const target = new Target(x, y, colour, this);
    this.targets.push(target);
    document.body.appendChild(target.element);
  };
  setDragging(card: Card | undefined) {
    if (this.dragging) {
      this.dragging.element.classList.remove("dragging");
    }
    this.dragging = card;
    if (card) {
      card.element.classList.add("dragging");
    }
  }
  getDraggedCard(): Card | undefined {
    return this.dragging;
  }
  canDropOn(target: Target) {
    return this.dragging && this.dragging.colour === target.colour;
  }
  dropCardOn(target: Target) {
    if (this.dragging) {
      this.dragging.element.style.left = target.y + "px";
      this.dragging.element.style.top = target.x + "px";
      this.dragging.element.style.zIndex = target.element.style.zIndex + 1;
      this.dragging.element.classList.remove("dragging");
      this.targets.forEach((target)=>{
        target.element.classList.remove("allowed");
        target.element.classList.remove("disallowed");
      })
      this.dragging = undefined;
    }
  }
}
