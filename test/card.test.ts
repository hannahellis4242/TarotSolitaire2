import Card from "../src/model/Card";
import Foundation from "../src/model/Foundation";
import Tableau from "../src/model/Tableau";
import {
  aces,
  all,
  allPairs,
  cups,
  kings,
  majors,
  pentacles,
  queens,
  swords,
  twos,
  wands,
} from "./utils";

const oracle = [
  { index: 0, pip: "0", name: "The Fool", suit: "Major" },
  { index: 1, pip: "I", name: "The Magician", suit: "Major" },
  { index: 2, pip: "II", name: "The High Priestess", suit: "Major" },
  { index: 3, pip: "III", name: "The Empress", suit: "Major" },
  { index: 4, pip: "IV", name: "The Emperor", suit: "Major" },
  { index: 5, pip: "V", name: "The Hierophant", suit: "Major" },
  { index: 6, pip: "VI", "name:": "The Lovers", suit: "Major" },
  { index: 7, pip: "VII", name: "The Chariot", suit: "Major" },
  { index: 8, pip: "VIII", name: "Strength", suit: "Major" },
  { index: 9, pip: "IX", name: "The Hermit", suit: "Major" },
  { index: 10, pip: "X", name: "The Wheel of Fortune", suit: "Major" },
  { index: 11, pip: "XI", name: "Justice", suit: "Major" },
  { index: 12, pip: "XII", name: "The Hanged Man", suit: "Major" },
  { index: 13, pip: "XIII", name: "Death", suit: "Major" },
  { index: 14, pip: "XIV", name: "Temperance", suit: "Major" },
  { index: 15, pip: "XV", name: "The Devil", suit: "Major" },
  { index: 16, pip: "XVI", name: "The Tower", suit: "Major" },
  { index: 17, pip: "XVII", name: "The Star", suit: "Major" },
  { index: 18, pip: "XVIII", name: "The Moon", suit: "Major" },
  { index: 19, pip: "XIX", name: "The Sun", suit: "Major" },
  { index: 20, pip: "XX", name: "Judgement", suit: "Major" },
  { index: 21, pip: "XXI", name: "The World", suit: "Major" },
  { index: 22, pip: "Ace", suit: "Wands" },
  { index: 23, pip: "Two", suit: "Wands" },
  { index: 24, pip: "Three", suit: "Wands" },
  { index: 25, pip: "Four", suit: "Wands" },
  { index: 26, pip: "Five", suit: "Wands" },
  { index: 27, pip: "Six", suit: "Wands" },
  { index: 28, pip: "Seven", suit: "Wands" },
  { index: 29, pip: "Eight", suit: "Wands" },
  { index: 30, pip: "Nine", suit: "Wands" },
  { index: 31, pip: "Ten", suit: "Wands" },
  { index: 32, pip: "Page", suit: "Wands" },
  { index: 33, pip: "Knight", suit: "Wands" },
  { index: 34, pip: "Queen", suit: "Wands" },
  { index: 35, pip: "King", suit: "Wands" },
  { index: 36, pip: "Ace", suit: "Cups" },
  { index: 37, pip: "Two", suit: "Cups" },
  { index: 38, pip: "Three", suit: "Cups" },
  { index: 39, pip: "Four", suit: "Cups" },
  { index: 40, pip: "Five", suit: "Cups" },
  { index: 41, pip: "Six", suit: "Cups" },
  { index: 42, pip: "Seven", suit: "Cups" },
  { index: 43, pip: "Eight", suit: "Cups" },
  { index: 44, pip: "Nine", suit: "Cups" },
  { index: 45, pip: "Ten", suit: "Cups" },
  { index: 46, pip: "Page", suit: "Cups" },
  { index: 47, pip: "Knight", suit: "Cups" },
  { index: 48, pip: "Queen", suit: "Cups" },
  { index: 49, pip: "King", suit: "Cups" },
  { index: 50, pip: "Ace", suit: "Swords" },
  { index: 51, pip: "Two", suit: "Swords" },
  { index: 52, pip: "Three", suit: "Swords" },
  { index: 53, pip: "Four", suit: "Swords" },
  { index: 54, pip: "Five", suit: "Swords" },
  { index: 55, pip: "Six", suit: "Swords" },
  { index: 56, pip: "Seven", suit: "Swords" },
  { index: 57, pip: "Eight", suit: "Swords" },
  { index: 58, pip: "Nine", suit: "Swords" },
  { index: 59, pip: "Ten", suit: "Swords" },
  { index: 60, pip: "Page", suit: "Swords" },
  { index: 61, pip: "Knight", suit: "Swords" },
  { index: 62, pip: "Queen", suit: "Swords" },
  { index: 63, pip: "King", suit: "Swords" },
  { index: 64, pip: "Ace", suit: "Pentacles" },
  { index: 65, pip: "Two", suit: "Pentacles" },
  { index: 66, pip: "Three", suit: "Pentacles" },
  { index: 67, pip: "Four", suit: "Pentacles" },
  { index: 68, pip: "Five", suit: "Pentacles" },
  { index: 69, pip: "Six", suit: "Pentacles" },
  { index: 70, pip: "Seven", suit: "Pentacles" },
  { index: 71, pip: "Eight", suit: "Pentacles" },
  { index: 72, pip: "Nine", suit: "Pentacles" },
  { index: 73, pip: "Ten", suit: "Pentacles" },
  { index: 74, pip: "Page", suit: "Pentacles" },
  { index: 75, pip: "Knight", suit: "Pentacles" },
  { index: 76, pip: "Queen", suit: "Pentacles" },
  { index: 77, pip: "King", suit: "Pentacles" },
];

describe("Card", () => {
  describe("Card.suit", () => {
    all.forEach((card) => {
      test(`a card with id ${card.id} should have the suit of ${
        oracle[card.id].suit
      }`, () => {
        expect(card.suit).toBe(oracle[card.id].suit);
      });
    });
  });
  describe("Card.pip", () => {
    oracle.forEach(({ index, pip }) => {
      test(`a card with an id of ${index} should have pip ${pip}`, () => {
        const card = new Card(index);
        expect(card.pip).toBe(pip);
      });
    });
  });
  describe("Card.colour", () => {
    describe('Major cards are "colourless"', () => {
      majors.forEach((card) => {
        test(`card with id ${card.id} should be \"colourless\"`, () => {
          expect(card.colour).toBe("Colourless");
        });
      });
    });
    describe('Wand cards are "black"', () => {
      wands.forEach((card) => {
        test(`card with id ${card.id} should be \"black\"`, () => {
          expect(card.colour).toBe("Black");
        });
      });
    });
    describe('Cup cards are "red"', () => {
      cups.forEach((card) => {
        test(`card with id ${card.id} should be \"red\"`, () => {
          expect(card.colour).toBe("Red");
        });
      });
    });
    describe('Sword cards are "Black"', () => {
      swords.forEach((card) => {
        test(`card with id ${card.id} should be \"Black\"`, () => {
          expect(card.colour).toBe("Black");
        });
      });
    });
    describe('Pentacles cards are "Red"', () => {
      pentacles.forEach((card) => {
        test(`card with id ${card.id} should be \"Red\"`, () => {
          expect(card.colour).toBe("Red");
        });
      });
    });
  });
  describe("when a card is placed on a location", () => {
    describe("when the location is a Tableau", () => {
      describe("when the card is allowed in the location", () => {
        it('should give "tableau" as it\'s location', () => {
          const location = new Tableau();
          const card = kings[0];
          expect(card.parent).toBeUndefined();
          expect(card.location()).toBe("unplaced");
          expect(location.setChild(card)).toBeTruthy();
          expect(card.location()).toBe("tableau");
          expect(card.parent).toBe(location);
        });
      });
      describe("when the card is not allowed in the location", () => {
        it('should give "unplaced" as it\'s location', () => {
          const location = new Tableau();
          const card = majors[0];
          expect(card.parent).toBeUndefined();
          expect(card.location()).toBe("unplaced");
          expect(location.setChild(card)).toBeFalsy();
          expect(card.location()).toBe("unplaced");
          expect(card.parent).toBeUndefined();
        });
      });
    });
    describe("when the location is a Foundation", () => {
      it('should give "foundation" as it\'s location', () => {
        const location = new Foundation();
        const card = aces[0];
        expect(card.parent).toBeUndefined();
        expect(card.location()).toBe("unplaced");
        expect(location.setChild(card)).toBeTruthy();
        expect(card.location()).toBe("foundation");
        expect(card.parent).toBe(location);
      });
    });
  });
  describe("when a card is placed on a another card", () => {
    describe("when the parent is on a Tableau", () => {
      describe("when the card is allowed in the location", () => {
        it('should give "tableau" as it\'s location', () => {
          const location = new Tableau();
          const parent = kings[0];
          location.setChild(parent);
          const card = queens[1];
          expect(card.parent).toBeUndefined();
          expect(card.location()).toBe("unplaced");
          expect(parent.setChild(card)).toBeTruthy();
          expect(card.location()).toBe("tableau");
          expect(card.parent).toBe(parent);
        });
      });
      describe("when the card is not allowed in the location", () => {
        it('should give "unplaced" as it\'s location', () => {
          const location = new Tableau();
          const parent = kings[0];
          location.setChild(parent);
          const card = queens[0];
          expect(card.parent).toBeUndefined();
          expect(card.location()).toBe("unplaced");
          expect(parent.setChild(card)).toBeFalsy();
          expect(card.location()).toBe("unplaced");
          expect(card.parent).toBeUndefined();
        });
      });
    });
    describe("when the parent is on a Foundation", () => {
      describe("when the card is allowed in the location", () => {
        it('should give "foundation" as it\'s location', () => {
          const location = new Foundation();
          const parent = aces[0];
          location.setChild(parent);
          const card = twos[0];
          expect(card.parent).toBeUndefined();
          expect(card.location()).toBe("unplaced");
          expect(parent.setChild(card)).toBeTruthy();
          expect(card.location()).toBe("foundation");
          expect(card.parent).toBe(parent);
        });
      });
      describe("when the card is not allowed in the location", () => {
        it('should give "unplaced" as it\'s location', () => {
          const location = new Foundation();
          const parent = aces[0];
          location.setChild(parent);
          const card = twos[1];
          expect(card.parent).toBeUndefined();
          expect(card.location()).toBe("unplaced");
          expect(parent.setChild(card)).toBeFalsy();
          expect(card.location()).toBe("unplaced");
          expect(card.parent).toBeUndefined();
        });
      });
    });
  });
  /*describe("Card.allowed()", () => {
    describe("when parent is on the tableu", () => {
      const playLocation = "tableau";
      it("should allow The Fool to be placed on The Magician", () => {
        const parent = new Card(1);
        const child = new Card(0);
        expect(parent.allowed(playLocation, child)).toBeTruthy();
      });
      it("should not allow The Magician to be placed on The Fool", () => {
        const parent = new Card(0);
        const child = new Card(1);
        expect(parent.allowed(playLocation, child)).toBeFalsy();
      });
      it("should not allow The High Priestess to be placed on The Fool", () => {
        const parent = new Card(2);
        const child = new Card(0);
        expect(parent.allowed(playLocation, child)).toBeFalsy();
      });
      it("should not allow The Ace of Wands to be placed on The Fool", () => {
        const parent = new Card(1);
        const child = wands[0];
        expect(parent.allowed(playLocation, child)).toBeFalsy();
      });
      it("should allow The Ace of Cups to be place on The Two of Wands", () => {
        const parent = wands[1];
        const child = cups[0];
        expect(parent.allowed(playLocation, child)).toBeTruthy();
      });
      describe("when checking all possible pairs of cards", () => {
        const allowedPairs = allPairs.filter(([parent, child]) =>
          parent.allowed(playLocation, child)
        );
        const expectedNumberOfAllowedParings = 21 + 13 * 2 * 4;
        it(`should give ${expectedNumberOfAllowedParings} possible allowed pairings`, () => {
          expect(allowedPairs.length).toBe(expectedNumberOfAllowedParings);
        });
      });
    });
    describe("when parent is on the foundation", () => {
      const playLocation = "foundation";
      it("should allow The Magician to be placed on The Fool", () => {
        const parent = majors[0];
        const child = majors[1];
        expect(parent.allowed(playLocation, child)).toBeTruthy();
      });
      it("should not allow The Fool to be placed on The Magician", () => {
        const parent = majors[1];
        const child = majors[0];
        expect(parent.allowed(playLocation, child)).toBeFalsy();
      });
      it("should allow The Three of Cups to be placed on The Two of Cups", () => {
        const parent = cups[1];
        const child = cups[2];
        expect(parent.allowed(playLocation, child)).toBeTruthy();
      });
      it("should not allow The Three of Penticles to be placed on The Two of Cups", () => {
        const parent = cups[1];
        const child = pentacles[2];
        expect(parent.allowed(playLocation, child)).toBeFalsy();
      });
      describe("when checking all allowed pairs", () => {
        const allowedPairs = allPairs.filter(([parent, child]) =>
          parent.allowed(playLocation, child)
        );
        const expectedNumberOfAllowedParings = 21 + 4 * 13;
        it(`should produce ${expectedNumberOfAllowedParings} allowed pairings`, () => {
          expect(allowedPairs.length).toBe(expectedNumberOfAllowedParings);
        });
      });
    });
    describe("when the parent is on the discard", () => {
      describe("when checking all possible pairs of cards", () => {
        const allowedPairs = allPairs.filter(([parent, child]) =>
          parent.allowed("discard", child)
        );
        const expectedNumberOfAllowedParings = 78 * 78;
        it(`should give ${expectedNumberOfAllowedParings} possible allowed pairings`, () => {
          expect(allowedPairs.length).toBe(expectedNumberOfAllowedParings);
        });
      });
    });
    describe("when the parent is on the pile", () => {
      describe("when checking all possible pairs of cards", () => {
        const allowedPairs = allPairs.filter(([parent, child]) =>
          parent.allowed("stock", child)
        );
        const expectedNumberOfAllowedParings = 78 * 78;
        it(`should give ${expectedNumberOfAllowedParings} possible allowed pairings`, () => {
          expect(allowedPairs.length).toBe(expectedNumberOfAllowedParings);
        });
      });
    });
  });*/
});
