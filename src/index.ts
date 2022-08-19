type Colour = "red" | "green" | "blue";

class Card {
  element: HTMLElement;
  constructor(public id: string, public colour: Colour, view: View) {
    this.element = document.createElement("div");
    this.element.draggable = true;
    this.element.ondragstart = (e: DragEvent) => {
      view.setDragging(this);
      e.dataTransfer.setDragImage(this.element,0,0);
      this.element.style.opacity = "0.2";
    };
    this.element.ondragend = (e: DragEvent) => {
      view.setDragging(undefined);
      this.element.style.opacity = "1.0";
    };
    this.element.classList.add("card");
    this.element.classList.add(colour);
  }
}

class Target {
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
        this.element.style.opacity = "1.0";
        this.element.classList.add("allowed");
      }
    };
    this.element.ondragleave = (e: DragEvent) => {
      e.preventDefault();
      this.element.style.opacity = "1.0";
      this.element.classList.remove("allowed");
      this.element.style.cursor = "default";
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

class View {
  private cards: Card[];
  private targets: Target[];
  private dragging: Card | undefined;
  constructor() {
    this.cards = [];
    this.targets = [];
    this.dragging = undefined;
  }
  createCard(colour: Colour) {
    const card = new Card(`${this.cards.length + 1}`.toString(), colour, view);
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
      this.dragging.element.style.left = target.x + "px";
      this.dragging.element.style.top = target.y + "px";
      this.dragging.element.style.zIndex = target.element.style.zIndex + 1;
    }
  }
}

const view = new View();
view.createCard("red");
view.createTarget(300, 300, "red");
view.createTarget(200,600,"blue");
