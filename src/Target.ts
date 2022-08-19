import { Colour } from "./Colour";
import View from "./View";

export default class Target {
  element: HTMLElement;
  constructor(
    public x: number,
    public y: number,
    public colour: Colour,
    view: View
  ) {
    this.element = document.createElement("div");
    this.element.innerText = colour;
    this.element.classList.add("target");
    this.element.classList.add(colour);
    this.element.style.top = x + "px";
    this.element.style.left = y + "px";
    this.element.ondragover = (e: DragEvent) => {
      e.preventDefault();
      const card = view.getDraggedCard();
      if (card && card.colour === this.colour) {
        this.element.style.cursor = "poiner";
      } else {
        this.element.style.cursor = "no-drop";
      }
    };
    this.element.ondragenter = (e: DragEvent) => {
      e.preventDefault();
      const card = view.getDraggedCard();
      console.log("card : ", card);
      if (card && card.colour === this.colour) {
        this.element.classList.add("allowed");
      } else {
        this.element.classList.add("disallowd");
      }
    };
    this.element.ondragleave = (e: DragEvent) => {
      e.preventDefault();
      this.element.classList.remove("allowed");
      this.element.classList.remove("disallowed");
      return false;
    };
    this.element.ondrop = (e: DragEvent) => {
      e.preventDefault();
      const card = view.getDraggedCard();
      if (view.canDropOn(this)) {
        view.dropCardOn(this);
      }
    };
  }
}
