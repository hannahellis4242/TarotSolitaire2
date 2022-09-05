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
import { fitScreen } from "./utils/fitScreen";
import Rectangle from "./utils/Rectangle";

const xs = [1, 11, 21, 31, 41, 51, 61, 71, 81, 91];
const ys = [10, 30];
const zTop = 78;

const cardPosition = (
  location: Location,
  index: number,
  depth: number
): { x: number; y: number; z: number } => {
  switch (location) {
    case "stock":
      return { x: xs[0], y: ys[0], z: zTop - depth };
    case "discard":
      return { x: xs[1], y: ys[0], z: zTop - depth };
    case "foundation":
      return { x: xs[4 + index], y: ys[0], z: zTop - depth };
    case "tableau":
      return { x: xs[index], y: ys[1] + depth, z: depth };
    case "unplaced":
      return { x: 100, y: 100, z: 0 };
  }
};

const setPosition = (
  card: HTMLElement,
  pos: { x: number; y: number; z: number }
) => {
  card.style.left = pos.x + "%";
  card.style.top = pos.y + "%";
  card.style.zIndex = pos.z.toString();
};

const createCard = (
  card: Card,
  location: Location,
  index: number
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
  const position = cardPosition(location, index, depth);
  setPosition(element, position);
  return element;
};

const createSlot = (location: Location, index: number): HTMLElement => {
  const element = document.createElement("div");
  element.classList.add("slot");
  element.classList.add(location);
  const position = cardPosition(location, index, 0);
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

const sizeLayout = () => {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
  const screen = fitScreen(new Rectangle(vw, vh));
  console.log(`width:${vw}\nheight:${vh}`);
  console.log(screen);
  console.log(`width:${screen.width()}\nheight:${screen.height()}`);
};

const createLayout = (
  model: Layout,
  updateFn: () => void,
  parent: HTMLElement
) => {
  console.log(model.show());
  window.onresize = sizeLayout;
  const { stock, discard, foundation, tableau } = model;
  //stock
  {
    const last = lastChild(stock);
    const location = createLocation(last, stock.location(), 0, () => {
      model.nextCard();
      updateFn();
    });
    parent.appendChild(location);
  }
  //discard
  {
    const last = lastChild(discard);
    const location = createLocation(last, discard.location(), 0, () => {});
    parent.appendChild(location);
  }
  //foundation
  {
    foundation.forEach((x, i) => {
      const last = lastChild(x);
      const location = createLocation(last, x.location(), i, () => {});
      parent.appendChild(location);
    });
  }
  //tableau
  {
    tableau.forEach((x, i) => {
      forEachCardInChain((card) => {
        const location = createLocation(card, x.location(), i, () => {});
        parent.appendChild(location);
      }, x);
    });
  }
};
const createLocation = (
  last: Link,
  location: Location,
  index: number,
  action: () => void
): HTMLElement => {
  const element =
    last instanceof Card
      ? createCard(last, location, index)
      : createSlot(location, index);
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
  private modal?: HTMLElement;
  private layout?: HTMLElement;
  constructor(private view: ViewModel) {
    this.cardMap = new Map<HTMLElement, Card>();
  }
  private updateLayout() {
    if (this.layout && this.model) {
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
    const main = this.createGame();
    this.layout = document.createElement("section");
    this.cardMap.clear();
    if (this.model) {
      createLayout(this.model, () => this.updateLayout(), this.layout);
    }
    main.appendChild(this.layout);
    parent.appendChild(main);
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
