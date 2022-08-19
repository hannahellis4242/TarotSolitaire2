import { Colour } from "./Colour";
import Target from "./Target";
import View from "./View";

export enum CardState {
  Unselected,
  Selected,
}

export default class Card {
  private element: HTMLElement;
  constructor(public colour: Colour, view: View, parent: HTMLElement) {
    this.element = document.createElement("div");
    this.element.draggable = true;
    this.element.ondragstart = (e: DragEvent) => {
      view.setSelected(this);
      e.dataTransfer.setDragImage(this.element, 0, 0);
    };
    this.element.ondragend = (e: DragEvent) => {
      view.setSelected(undefined);
    };
    this.element.classList.add("card");
    this.element.classList.add(colour);
    parent.appendChild(this.element);
  }
  setState(state: CardState) {
    switch (state) {
      case CardState.Unselected:
        this.element.classList.remove("dragging");
        break;
      case CardState.Selected:
        this.element.classList.add("dragging");
        break;
    }
  }
  setPosition(x: number, y: number,z:number) {
    this.element.style.left = y + "px";
    this.element.style.top = x + "px";
    this.element.style.zIndex = z.toString();
  }
  canBeDroppedOn(target:Target){
    return this.colour === target.colour;
  }
  dropOn(target:Target){
    if(this.canBeDroppedOn(target)){
      this.setPosition(target.x,target.y,1);
      this.setState(CardState.Unselected);
    }
  }
}
