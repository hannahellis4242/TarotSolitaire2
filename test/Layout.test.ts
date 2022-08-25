import random from "random";
import seedrandom from "seedrandom";
import Card from "../src/model/Card";
import {
  chainLength,
  lastChild,
  linkId,
  nthChild,
  numberOfCardsInChain,
  showChain,
} from "../src/model/chainUtils";
import { shuffle } from "../src/model/Deck";
import Layout, { populate } from "../src/model/Layout";
import Link from "../src/model/Link";
import Tableau from "../src/model/Tableau";
import { createAllCards } from "./utils";

const testMovement = (
  description: string,
  layout: Layout,
  targetLocation: Link,
  sourceLocation: Link,
  targetfn: (link: Link) => Link,
  sourcefn: (link: Link) => Link,
  allowed: boolean,
  logger: (s: string) => void
) => {
  {
    const lastStr = layout.show();
    logger(description);
    logger(lastStr);
    const targetLength = chainLength(targetLocation);
    const sourceLength = chainLength(sourceLocation);

    const target = targetfn(targetLocation);
    const source = sourcefn(sourceLocation);
    const numberOfCardsBeingMoved = chainLength(source);
    if (target instanceof Card) {
      const card: Card = target;
      logger(`target card : ${card}`);
    } else {
      logger(`target : ${linkId(target)}`);
    }

    if (source instanceof Card) {
      const card: Card = source;
      logger(`source card : ${card}`);
    } else {
      logger(`source : ${linkId(source)}`);
    }

    expect(layout.move(source, target)).toBe(allowed);
    if (allowed) {
      expect(layout.show()).not.toBe(lastStr);
    } else {
      expect(layout.show()).toBe(lastStr);
    }
    const newTargetLength = allowed
      ? targetLength + numberOfCardsBeingMoved
      : targetLength;
    const newSourceLength = allowed
      ? sourceLength - numberOfCardsBeingMoved
      : sourceLength;
    expect(chainLength(targetLocation)).toBe(newTargetLength);
    expect(chainLength(sourceLocation)).toBe(newSourceLength);
    logger(layout.show());
    //check that any exposed cards get shown face up
    if (sourceLocation instanceof Tableau) {
      const last = lastChild(sourceLocation);
      if (last instanceof Card) {
        expect(last.faceUp).toBeTruthy();
      }
    }
  }
};

describe("Layout", () => {
  describe("when we populate the layout", () => {
    const deck = createAllCards();
    const layout = populate(deck);
    //console.log(layout.show());
    describe("when we check all the cards", () => {
      deck.forEach((card) => {
        it(`should be that card ${card} has a parent`, () => {
          expect(card.parent).not.toBeUndefined();
        });
      });
    });
  });
  describe("when we populate the layout2", () => {
    describe("when calling next", () => {
      const deck = createAllCards();
      const layout = populate(deck);
      //console.log("before : \n", layout.show());
      const stockLength = chainLength(layout.stock);
      layout.nextCard();
      //console.log("after : \n", layout.show());
      describe("when looking at the discard pile", () => {
        const discard = layout.discard;
        it("should have one card in the discard pile", () => {
          expect(discard.child).not.toBeNull();
          expect(numberOfCardsInChain(discard)).toBe(1);
        });
        const card = discard.child;
        it(`should have all cards should be face up, namely ${card}`, () => {
          expect(card instanceof Card && card.faceUp).toBeTruthy();
        });
      });
      describe("when looking at the stock", () => {
        const stock = layout.stock;
        it("should have one less card in the stock pile", () => {
          expect(chainLength(stock)).toBe(stockLength - 1);
        });
      });
    });
  });
  describe("when calling next and the stock is empty", () => {
    const deck = createAllCards();
    const layout = populate(deck);
    //console.log("before : \n", layout.show());
    const stockLength = chainLength(layout.stock);
    const stockString = showChain(layout.stock);
    while (layout.stock.child) {
      layout.nextCard();
    }
    layout.nextCard();
    //console.log("after : \n", layout.show());
    describe("when looking at the discard pile", () => {
      const discard = layout.discard;
      it("should have zero cards in the discard pile", () => {
        expect(discard.child).toBeUndefined();
        expect(numberOfCardsInChain(discard)).toBe(0);
      });
    });
    describe("when looking at the stock", () => {
      const stock = layout.stock;
      it("should be same length when populated", () => {
        expect(chainLength(stock)).toBe(stockLength);
      });
      it("should have the same cards as when populated", () => {
        expect(showChain(stock)).toBe(stockString);
      });
    });
  });
  describe("when playing a game", () => {
    const deck = createAllCards();
    shuffle(deck, random.clone(seedrandom("aaa")));
    const layout = populate(deck);
    const { tableau, foundation, discard } = layout;
    let lastStr = layout.show();
    testMovement(
      "can not move these cards",
      layout,
      tableau[2],
      tableau[1],
      lastChild,
      lastChild,
      false,
      () => {}
    );
    layout.nextCard();
    layout.nextCard();
    testMovement(
      "move ten of wands from the discard to page of cups",
      layout,
      tableau[2],
      discard,
      lastChild,
      lastChild,
      true,
      () => {}
    );
    layout.nextCard();
    testMovement(
      "move ace of wands from the discard to foundation",
      layout,
      foundation[0],
      discard,
      lastChild,
      lastChild,
      true,
      () => {}
    );
    layout.nextCard();
    layout.nextCard();
    testMovement(
      "try to accidently place the ace of cups on the ace of wands",
      layout,
      foundation[0],
      discard,
      lastChild,
      lastChild,
      false,
      () => {}
    );
    testMovement(
      "try to place the ace of cups on the next available foundation",
      layout,
      foundation[1],
      discard,
      lastChild,
      lastChild,
      true,
      () => {}
    );
    layout.nextCard();
    testMovement(
      "move queen of cups onto king of swords",
      layout,
      tableau[3],
      discard,
      lastChild,
      lastChild,
      true,
      () => {}
    );
    testMovement(
      "move knight of wands onto queen of cups",
      layout,
      tableau[3],
      tableau[0],
      lastChild,
      lastChild,
      true,
      () => {}
    );
    testMovement(
      "move king of swords into the blank zeroth slot",
      layout,
      tableau[0],
      tableau[3],
      lastChild,
      (link) => nthChild(4, link),
      true,
      () => {}
    );
    testMovement(
      "move two of cups into the ace of cups on the foundation",
      layout,
      foundation[1],
      tableau[6],
      lastChild,
      lastChild,
      true,
      () => {}
    );
    testMovement(
      "move Judgement on The World",
      layout,
      tableau[1],
      tableau[3],
      lastChild,
      lastChild,
      true,
      () => {}
    );
    testMovement(
      "move Justice onto The Hanged Man",
      layout,
      tableau[5],
      tableau[7],
      lastChild,
      lastChild,
      true,
      () => {}
    );
    layout.nextCard();
    layout.nextCard();
    layout.nextCard();
    layout.nextCard();
    layout.nextCard();
    testMovement(
      "move seven of swords onto the eight of cups",
      layout,
      tableau[3],
      discard,
      lastChild,
      lastChild,
      true,
      () => {}
    );
    layout.nextCard();
    testMovement(
      "move two of wands to the foundation",
      layout,
      foundation[0],
      discard,
      lastChild,
      lastChild,
      true,
      () => {}
    );
    layout.nextCard();
    layout.nextCard();
    layout.nextCard();
    layout.nextCard();
    layout.nextCard();
    layout.nextCard();
    testMovement(
      "move the ace of pentacles to the foundation",
      layout,
      foundation[2],
      discard,
      lastChild,
      lastChild,
      true,
      () => {}
    );
    testMovement(
      "move the two of pentacles to ace of pentacles on the foundation",
      layout,
      foundation[2],
      tableau[8],
      lastChild,
      lastChild,
      true,
      () => {}
    );
    layout.nextCard();
    testMovement(
      "move the star onto the moon",
      layout,
      tableau[6],
      discard,
      lastChild,
      lastChild,
      true,
      () => {}
    );
    testMovement(
      "move the tower onto the tower",
      layout,
      tableau[6],
      tableau[4],
      lastChild,
      lastChild,
      true,
      () => {}
    );
    testMovement(
      "move the six of wands onto the seven of swords",
      layout,
      tableau[8],
      tableau[3],
      lastChild,
      lastChild,
      false,
      () => {}
    );
    layout.nextCard();
    layout.nextCard();
    layout.nextCard();
    layout.nextCard();
    layout.nextCard();
    layout.nextCard();
    layout.nextCard();
    layout.nextCard();
    testMovement(
      "move three of pentacles onto the two of pentacles on the foundation",
      layout,
      foundation[2],
      discard,
      lastChild,
      lastChild,
      true,
      () => {}
    );
    layout.nextCard();
    testMovement(
      "move the wheel of fortune onto justice",
      layout,
      tableau[5],
      discard,
      lastChild,
      lastChild,
      true,
      () => {}
    );
    layout.nextCard();
    testMovement(
      "move the fool onto the foundation",
      layout,
      foundation[3],
      discard,
      lastChild,
      lastChild,
      true,
      () => {}
    );
    layout.nextCard();
    layout.nextCard();
    testMovement(
      "move page of pentacles to knight of wands",
      layout,
      tableau[0],
      discard,
      lastChild,
      lastChild,
      true,
      () => {}
    );
    testMovement(
      "move ten of wands to the page of pentacles",
      layout,
      tableau[0],
      tableau[2],
      lastChild,
      lastChild,
      true,
      () => {}
    );
    layout.nextCard();
    layout.nextCard();
    layout.nextCard();
    layout.nextCard();
    testMovement(
      "move six of pentacle onto the seven of swoards",
      layout,
      tableau[3],
      discard,
      lastChild,
      lastChild,
      true,
      () => {}
    );
    layout.nextCard();
    layout.nextCard();
    layout.nextCard();
    testMovement(
      "move five of cups to the six of wands",
      layout,
      tableau[8],
      discard,
      lastChild,
      lastChild,
      true,
      () => {}
    );
    layout.nextCard();
    testMovement(
      "move three of wands to two of wands on the foundation",
      layout,
      foundation[0],
      discard,
      lastChild,
      lastChild,
      true,
      () => {}
    );
    layout.nextCard();
    layout.nextCard();
    layout.nextCard();
    layout.nextCard();
    layout.nextCard();
    testMovement(
      "move the empress onto the emperor",
      layout,
      tableau[4],
      discard,
      lastChild,
      lastChild,
      true,
      () => {}
    );
    testMovement(
      "move the high priestess onto the empress",
      layout,
      tableau[4],
      tableau[7],
      lastChild,
      lastChild,
      true,
      () => {}
    );
    testMovement(
      "move the three of cups onto the two of cups on the foundation",
      layout,
      foundation[1],
      tableau[7],
      lastChild,
      lastChild,
      true,
      () => {}
    );
    testMovement(
      "move the ten of swords onto the page of cups",
      layout,
      tableau[2],
      tableau[7],
      lastChild,
      lastChild,
      true,
      () => {}
    );
    layout.nextCard();
    layout.nextCard();
    testMovement(
      "move four of cups to three of cups on the foundation",
      layout,
      foundation[1],
      discard,
      lastChild,
      lastChild,
      true,
      () => {}
    );
    layout.nextCard();
    layout.nextCard();
    layout.nextCard();
    layout.nextCard();
    layout.nextCard();
    layout.nextCard();
    layout.nextCard();
    testMovement(
      "move five of cups to four of cups on the foundation",
      layout,
      foundation[1],
      tableau[8],
      lastChild,
      lastChild,
      true,
      () => {}
    );
    layout.nextCard();
    layout.nextCard();
    layout.nextCard();
    layout.nextCard();
    testMovement(
      "move four of wands to three of wands on the foundation",
      layout,
      foundation[0],
      discard,
      lastChild,
      lastChild,
      true,
      () => {}
    );
    layout.nextCard();
    testMovement(
      "move six of cups to five of cups on the foundation",
      layout,
      foundation[1],
      discard,
      lastChild,
      lastChild,
      true,
      () => {}
    );
  });
});
