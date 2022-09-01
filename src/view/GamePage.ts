import random from "random";
import seedrandom from "seedrandom";
import Card from "../model/Card";
import { chainDepth, forEachCardInChain, lastChild } from "../model/chainUtils";
import { createAllCards, shuffle } from "../model/Deck";
import Layout, { populate } from "../model/Layout";
import Page from "./Page";
import ViewModel from "./ViewModel";
import { Location } from "../model/Location";
import Link from "../model/Link";
import Grid from "./utils/Grid";

const zTop = 78;

const cardPosition = (
  location: Location,
  index: number,
  depth: number,
  grid: Grid
): { x: number; y: number; z: number } => {
  switch (location) {
    case "stock":
      return { ...grid.getPosition(0, 0), z: zTop - depth };
    case "discard":
      return { ...grid.getPosition(1, 0), z: zTop - depth };
    case "foundation":
      return { ...grid.getPosition(4 + index, 0), z: zTop - depth };
    case "tableau":
      const pos = grid.getPosition(index, 1);
      return { x: pos.x, y: pos.y + depth, z: depth };
    case "unplaced":
      return { x: -100, y: -100, z: 0 };
  }
};

const setPosition = (
  card: HTMLElement,
  pos: { x: number; y: number; z: number }
) => {
  card.style.left = `${pos.x}px`;
  card.style.top = `${pos.y}px`;
  card.style.zIndex = pos.z.toString();
};

const createCard = (
  card: Card,
  location: Location,
  index: number,
  grid: Grid
): HTMLElement => {
  const element = document.createElement("div");
  element.classList.add("card");
  if (card.faceUp) {
    element.id = `card_${card.id}`;
  } else {
    element.classList.add("facedown");
  }
  element.classList.add(location);
  const depth = chainDepth(card) - 1;
  const position = cardPosition(location, index, depth, grid);
  const { width, height } = grid.getCardDimentions();
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
  setPosition(element, position);
  return element;
};

const createSlot = (
  location: Location,
  index: number,
  grid: Grid
): HTMLElement => {
  const element = document.createElement("div");
  element.classList.add("slot");
  element.classList.add(location);
  const position = cardPosition(location, index, 0, grid);
  const { width, height } = grid.getCardDimentions();
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
  setPosition(element, position);
  return element;
};

const createModal = (start: (s?: string) => void): HTMLElement => {
  const modal = document.createElement("section");
  modal.classList.add("modal");
  modal.classList.add("hidden");
  {
    const contents = document.createElement("section");
    contents.classList.add("contents");
    {
      const text = document.createElement("p");
      text.innerText =
        "To start a game please enter a seed for your game or leave blank for a random game.";
      contents.appendChild(text);
    }
    {
      const form = document.createElement("form");
      {
        const label: HTMLLabelElement = document.createElement("label");
        label.htmlFor = "seed";
        label.innerText = "seed";
        label.style.paddingRight = "5px";
        form.appendChild(label);
      }
      {
        const input: HTMLInputElement = document.createElement("input");
        input.type = "text";
        input.name = "seed";
        form.appendChild(input);
        form.onsubmit = (event) => {
          event.preventDefault();
          start(input.value === "" ? undefined : input.value);
        };
      }
      {
        const buttons = document.createElement("section");
        {
          const input: HTMLInputElement = document.createElement("input");
          input.type = "submit";
          input.value = "OK";
          input.classList.add("ok");
          buttons.appendChild(input);
        }
        {
          const input: HTMLInputElement = document.createElement("input");
          input.type = "button";
          input.value = "Cancel";
          input.onclick = () => modal.classList.toggle("hidden");
          input.classList.add("cancel");
          buttons.appendChild(input);
        }
        form.appendChild(buttons);
      }
      contents.appendChild(form);
    }
    modal.appendChild(contents);
  }
  return modal;
};

const createLayout = (
  model: Layout,
  updateFn: () => void,
  parent: HTMLElement
) => {
  const grid = new Grid(
    { width: window.innerWidth, height: window.innerHeight },
    0.5
  );
  console.log(model.show());
  const { stock, discard, foundation, tableau } = model;
  //stock
  {
    const last = lastChild(stock);
    const location = createLocation(last, stock.location(), 0, grid, () => {
      model.nextCard();
      updateFn();
    });
    parent.appendChild(location);
  }
  //discard
  {
    const last = lastChild(discard);
    const location = createLocation(
      last,
      discard.location(),
      0,
      grid,
      () => {}
    );
    parent.appendChild(location);
  }
  //foundation
  {
    foundation.forEach((x, i) => {
      const last = lastChild(x);
      const location = createLocation(last, x.location(), i, grid, () => {});
      parent.appendChild(location);
    });
  }
  //tableau
  {
    tableau.forEach((x, i) => {
      forEachCardInChain((card) => {
        const location = createLocation(card, x.location(), i, grid, () => {});
        parent.appendChild(location);
      }, x);
    });
  }
};
const createLocation = (
  last: Link,
  location: Location,
  index: number,
  grid: Grid,
  action: () => void
): HTMLElement => {
  const element =
    last instanceof Card
      ? createCard(last, location, index, grid)
      : createSlot(location, index, grid);
  switch (location) {
    case "stock":
      element.onclick = () => {
        action();
      };
      break;
    default:
      element.onclick = () => {};
  }
  return element;
};

export default class GamePage implements Page {
  private model?: Layout;
  private cardMap: Map<HTMLElement, Card>;

  private main?: HTMLElement;
  private modal?: HTMLElement;
  private layout?: HTMLElement;
  constructor(private view: ViewModel) {
    this.cardMap = new Map<HTMLElement, Card>();
  }
  private updateLayout() {
    if (this.main && this.layout && this.model) {
      this.layout.replaceChildren();
      createLayout(this.model, () => this.updateLayout(), this.layout);
    }
  }
  private createGame(): HTMLElement {
    const main = document.createElement("main");
    main.id = "game";
    const header = document.createElement("header");
    {
      const button = document.createElement("button");
      button.innerText = "exit";
      button.classList.add("right");
      button.onclick = () => this.view.setPage("start");
      header.appendChild(button);
    }
    {
      const button = document.createElement("button");
      button.innerText = "new game";
      button.onclick = () => {
        if (this.modal) {
          this.modal.classList.toggle("hidden");
        }
      };
      header.appendChild(button);
    }
    main.appendChild(header);
    return main;
  }

  draw(parent: HTMLElement): void {
    this.modal = createModal((s) => this.start(s));
    this.main = this.createGame();
    this.layout = document.createElement("section");
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    this.cardMap.clear();
    if (this.model) {
      createLayout(this.model, () => this.updateLayout(), this.layout);
    }
    this.main.appendChild(this.layout);
    parent.appendChild(this.main);
    parent.appendChild(this.modal);
  }
  update(model: Layout): void {
    this.model = model;
  }
  start(seed?: string) {
    const deck = createAllCards();
    const seedStr = seed || new Date().toString();
    shuffle(deck, random.clone(seedrandom(seedStr)));
    const layout = populate(deck);
    this.view.update(layout);
  }
}
