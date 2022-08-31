import random from "random";
import seedrandom from "seedrandom";
import Card from "../model/Card";
import { chainDepth, forEachCardInChain } from "../model/chainUtils";
import { createAllCards, shuffle } from "../model/Deck";
import Layout, { populate } from "../model/Layout";
import Page from "./Page";
import ViewModel from "./ViewModel";
import { Location } from "../model/Location";

const xs = [1, 11, 21, 31, 41, 51, 61, 71, 81, 91];
const ys = [1, 11];

const cardPosition = (
  location: Location,
  index: number,
  depth: number
): { x: number; y: number } => {
  switch (location) {
    case "stock":
      return { x: xs[0] + depth * 0.1, y: ys[0] };
    case "discard":
      return { x: xs[1] + depth * 0.1, y: ys[0] };
    case "foundation":
      return { x: xs[4 + index], y: ys[0] };
    case "tableau":
      return { x: xs[index], y: ys[1] + depth };
    case "unplaced":
      return { x: 100, y: 100 };
  }
};

const setPosition = (card: HTMLElement, pos: { x: number; y: number }) => {
  card.style.left = pos.x + "%";
  card.style.top = pos.y + "%";
};

export default class GamePage implements Page {
  private model?: Layout;
  private cardMap: Map<HTMLElement, Card>;
  private modal?: HTMLElement;
  constructor(private view: ViewModel) {
    this.cardMap = new Map<HTMLElement, Card>();
  }
  private createTable(): HTMLElement {
    const main = document.createElement("main");
    main.id = "table";
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
  private createModal(): HTMLElement {
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
            this.start(input.value === "" ? undefined : input.value);
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
  }
  private createCard(
    card: Card,
    location: Location,
    index: number,
    parent: HTMLElement
  ) {
    const element = document.createElement("div");
    element.classList.add("card");
    element.classList.add(`card_${card.id}`);
    if (!card.faceUp) {
      element.classList.add("facedown");
    }
    this.cardMap.set(element, card);
    const depth = chainDepth(card) - 1;
    const position = cardPosition(location, index, depth);
    setPosition(element, position);
  }
  private createLayout(): HTMLElement {
    const section = document.createElement("section");
    this.cardMap.clear();
    const { stock } = this.model;
    forEachCardInChain((card) => {
      this.createCard(card, "stock", 0, section);
    }, stock.child);
    return section;
  }

  draw(parent: HTMLElement): void {
    this.modal = this.createModal();
    const main = this.createTable();
    main.appendChild(this.createLayout());
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
