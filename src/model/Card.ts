import { PlayLocation } from "./Location";

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

const majorPips: Pip[] = [
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
];

const minorPips: Pip[] = [
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

const pips: Pip[] = majorPips.concat(minorPips);

export type Colour = "Colourless" | "Red" | "Black";

export default class Card {
  suit: Suit;
  pip: Pip;
  colour: Colour;
  private pipIndex: number;
  constructor(public id: number) {
    const value = Math.floor((id - 22) / 14);
    const suitsIndex = value < 0 ? 0 : value + 1;
    this.suit = suits[suitsIndex];
    if (this.id < 22) {
      this.pip = pips[this.id];
      this.pipIndex = this.id;
    } else {
      this.pipIndex = (this.id - 22) % 14;
      this.pip = minorPips[this.pipIndex];
    }
    switch (this.suit) {
      case "Wands":
      case "Swords":
        this.colour = "Black";
        break;
      case "Cups":
      case "Pentacles":
        this.colour = "Red";
        break;
      case "Major":
        this.colour = "Colourless";
        break;
    }
  }

  allowed(location: PlayLocation, child: Card): boolean {
    if (location === "tableau") {
      return (
        child.pipIndex + 1 === this.pipIndex &&
        ((this.colour === child.colour && this.colour === "Colourless") ||
          (this.colour === "Red" && child.colour === "Black") ||
          (this.colour === "Black" && child.colour === "Red"))
      );
    }
    if (location === "foundation") {
      return child.suit === this.suit && child.pipIndex === this.pipIndex + 1;
    }
    return true;
  }

  toString() {
    return JSON.stringify({ suit: this.suit, pip: this.pip });
  }
}
