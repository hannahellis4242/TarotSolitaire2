import { Colour } from "./Colour";
import View from "./View";

export default class Card {
  element: HTMLElement;
  constructor(public id: string, public colour: Colour, view: View) {
    this.element = document.createElement("div");
    this.element.draggable = true;
    this.element.ondragstart = (e: DragEvent) => {
      view.setDragging(this);
      e.dataTransfer.setDragImage(this.element, 0, 0);
    };
    this.element.ondragend = (e: DragEvent) => {
      view.setDragging(undefined);
    };
    this.element.classList.add("card");
    this.element.classList.add(colour);
  }
}
