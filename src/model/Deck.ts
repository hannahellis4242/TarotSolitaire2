import Card from "./Card";
import { Random } from "random";

export const createAllCards = () =>
  new Array(78).fill(0).map((_, i) => new Card(i));

export const shuffle = (cards: Card[], rng: Random) => {
  const maxIndex = cards.length - 1;
  for (let i = 0; i < maxIndex; ++i) {
    const randomIndex = rng.int(i, maxIndex);
    const temp = cards[i];
    cards[i] = cards[randomIndex];
    cards[randomIndex] = temp;
  }
};
