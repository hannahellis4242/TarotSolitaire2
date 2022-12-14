import Card from "../src/model/Card";

export const majors = new Array(22).fill(0).map((_, i) => new Card(i));
export const wands = new Array(14).fill(0).map((_, i) => new Card(i + 22));
export const cups = new Array(14).fill(0).map((_, i) => new Card(i + 22 + 14));
export const swords = new Array(14)
  .fill(0)
  .map((_, i) => new Card(i + 22 + 2 * 14));
export const pentacles = new Array(14)
  .fill(0)
  .map((_, i) => new Card(i + 22 + 3 * 14));
export const all = majors
  .concat(wands)
  .concat(cups)
  .concat(swords)
  .concat(pentacles);
export const allPairs = all.flatMap((parent) =>
  all.map((child) => [parent, child])
);
export const kings = all.filter(({ pip }) => pip === "King");
export const queens = all.filter(({ pip }) => pip === "Queen");
export const knights = all.filter(({ pip }) => pip === "Knight");
export const pages = all.filter(({ pip }) => pip === "Page");
export const tens = all.filter(({ pip }) => pip === "Ten");
export const eights = all.filter(({ pip }) => pip === "Eight");
export const twos = all.filter(({ pip }) => pip === "Two");
export const aces = all.filter(({ pip }) => pip === "Ace");

export const createAllCards = () =>
  new Array(78).fill(0).map((_, i) => new Card(i));
