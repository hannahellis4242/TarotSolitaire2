import random from "random";
import seedrandom from "seedrandom";
import Card from "../model/Card";
import { createAllCards, shuffle } from "../model/Deck";
import Layout, { populate } from "../model/Layout";
import Page from "./Page";
import ViewModel from "./ViewModel";

export default class GamePage implements Page {
  private model?: Layout;
  private cardMap: Map<string, Card>;
  private modal?: HTMLElement;
  constructor(private view: ViewModel) {
    this.cardMap = new Map<string, Card>();
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
  private createLayout(): HTMLElement {
    const section = document.createElement("section");

    return section;
  }

  draw(parent: HTMLElement): void {
    this.modal = this.createModal();
    const main = this.createTable();
    main.appendChild(this.createLayout());
    parent.appendChild(main);
    parent.appendChild(this.modal);
  }
  update(model: Layout, cardMap: Map<string, Card>): void {
    this.model = model;
    this.cardMap = cardMap;
  }
  start(seed?: string) {
    const deck = createAllCards();
    const seedStr = seed || new Date().toString();
    shuffle(deck, random.clone(seedrandom(seedStr)));
    const layout = populate(deck);
    this.view.update(layout, this.cardMap);
  }
}
