import { Colour } from "./Colour";
import View from "./View";

export enum TargetState {
  Inactive,
  Allowed,
  Disallowed,
}

export default class Target {
  private element: HTMLElement;
  constructor(
    public x: number,
    public y: number,
    public colour: Colour,
    view: View,
    parent: HTMLElement
  ) {
    this.element = document.createElement("div");
    this.element.innerText = colour;
    this.element.classList.add("target");
    this.element.classList.add(colour);
    this.element.style.top = y + "px";
    this.element.style.left = x + "px";
    this.element.ondragover = (e: DragEvent) => {
      e.preventDefault();
      const card = view.getSelected();
      if (card.canBeDroppedOn(this)) {
        this.setState(TargetState.Allowed);
      } else {
        this.setState(TargetState.Disallowed);
      }
    };
    this.element.ondragenter = (e: DragEvent) => {
      e.preventDefault();
      const card = view.getSelected();
      if (card.canBeDroppedOn(this)) {
        this.setState(TargetState.Allowed);
      } else {
        this.setState(TargetState.Disallowed);
      }
    };
    this.element.ondragleave = (e: DragEvent) => {
      e.preventDefault();
      this.setState(TargetState.Inactive);
    };
    this.element.ondrop = (e: DragEvent) => {
      e.preventDefault();
      const card = view.getSelected();
      if (card && card.canBeDroppedOn(this)) {
        card.dropOn(this);
        view.setSelected();
      }
      this.setState(TargetState.Inactive);
    };
    parent.appendChild(this.element);
  }
  setState(state: TargetState) {
    switch (state) {
      case TargetState.Inactive:
        this.element.classList.remove("allowed");
        this.element.classList.remove("disallowed");
        break;
      case TargetState.Allowed:
        this.element.classList.add("allowed");
        this.element.classList.remove("disallowed");
        break;
      case TargetState.Disallowed:
        this.element.classList.remove("allowed");
        this.element.classList.add("disallowed");
    }
  }
}
