import Layout, { populate } from "../model/Layout";
import { v4 } from "uuid";
import Card from "../model/Card";
import { createAllCards, shuffle } from "../model/Deck";
import random from "random";
import seedrandom from "seedrandom";

type UpdateFn = (model: Layout, cardMap: Map<string, Card>) => void;

export default class Controller {
  listeners: Map<string, UpdateFn>;
  cardMap: Map<string, Card>;
  model: Layout;
  constructor() {}
  addListener(fn: UpdateFn): string {
    const key = v4();
    this.listeners.set(key, fn);
    return key;
  }
  removeListener(key: string): boolean {
    return this.listeners.delete(key);
  }
  private notify() {
    this.listeners.forEach((value) => {
      value(this.model, this.cardMap);
    });
  }
  populate(seedStr?: string) {
    const deck = createAllCards();
    deck.forEach((card) => {
      const key = v4();
      this.cardMap.set(key, card);
    });
    const seed = seedStr || Date.now().toString();
    shuffle(deck, random.clone(seedrandom(seed)));
    this.model = populate(deck);
    this.notify();
  }
}
