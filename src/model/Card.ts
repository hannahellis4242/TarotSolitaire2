export type Suit = "Major" | "Wands" | "Cups" | "Swords" | "Pentacles";
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

const pips: Pip[] = [
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

export default class Card {
  private suit_: Suit;
  private pip_: Pip;
  constructor(public id: number) {
    const value = Math.floor((id - 22) / 14);
    const suitsIndex = value < 0 ? 0 : value + 1;
    this.suit_ = suits[suitsIndex];
    if (this.id < 22) {
      this.pip_ = pips[this.id];
    } else {
      const pipIndex = ((this.id - 22) % 14) + 22;
      this.pip_ = pips[pipIndex];
    }
  }
  suit(): Suit {
    return this.suit_;
  }
  pip(): Pip {
    return this.pip_;
  }
}
