const expected = [
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

type Suit = "Major" | "Wands" | "Cups" | "Swords" | "Pentacles";
const suits: Suit[] = ["Major", "Wands", "Cups", "Swords", "Pentacles"];

export type Pip =
  | "0"
  | "I"
  | "II"
  | "III"
  | "IV"
  | "V"
  | "VI"
  | "VII"
  | "VIII"
  | "IX"
  | "X"
  | "XI"
  | "XII"
  | "XIII"
  | "XIV"
  | "XV"
  | "XVI"
  | "XVII"
  | "XVIII"
  | "XIX"
  | "XX"
  | "XXI"
  | "Ace"
  | "Two"
  | "Three"
  | "Four"
  | "Five"
  | "Six"
  | "Seven"
  | "Eight"
  | "Nine"
  | "Ten"
  | "Page"
  | "Knight"
  | "Queen"
  | "King";

const pips:Pip[] = [
  "0",
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
  "XIII",
  "XIV",
  "XV",
  "XVI",
  "XVII",
  "XVIII",
  "XIX",
  "XX",
  "XXI",
  "Ace",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Page",
  "Knight",
  "Queen",
  "King",
];

class Card {
  private suit_: Suit;
  constructor(public id: number) {
    const value = Math.floor((id - 22) / 14);
    const suitsIndex = value < 0 ? 0 : value + 1;
    this.suit_ = suits[suitsIndex];
  }
  suit(): Suit {
    return this.suit_;
  }
  pip(): Pip {
    if (this.id < 22) {
      return pips[this.id];
    }
    const pipIndex = ((this.id - 22)%14) + 22;
    return pips[pipIndex];
  }
}

describe("Card", () => {
  describe("Card.suit()", () => {
    new Array(78)
      .fill(0)
      .map((_, index) => new Card(index))
      .forEach((card) => {
        test(`a card with id ${card.id} should have the suit of ${
          expected[card.id].suit
        }`, () => {
          expect(card.suit()).toBe(expected[card.id].suit);
        });
      });
  });
  describe("Card.pip()", () => {
    expected.forEach(({ index, pip }) => {
      test(`a card with an id of ${index} should have pip ${pip}`, () => {
        const card = new Card(index);
        expect(card.pip()).toBe(pip);
      });
    });
  });
});
