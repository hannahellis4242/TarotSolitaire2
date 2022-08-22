type Suit = "Trump" | "Wands" | "Cups" | "Swords" | "Penticles";
class Card {
  private suit_: Suit;
  constructor(public id: number) {
    if (id < 22) {
      this.suit_ = "Trump";
    } else if (id < 22 + 14) {
      this.suit_ = "Wands";
    } else if (id < 22 + 2 * 14) {
      this.suit_ = "Cups";
    } else if (id < 22 + 3 * 14) {
      this.suit_ = "Swords";
    } else {
      this.suit_ = "Penticles";
    }
  }
  suit(): Suit {
    return this.suit_;
  }
}

describe("Card", () => {
  new Array(22)
    .fill(0)
    .map((_, index) => new Card(index))
    .forEach((card) => {
      test(`a card with id ${card.id} should have the suit of Trumps`, () => {
        expect(card.suit()).toBe("Trump");
      });
    });
  new Array(14)
    .fill(0)
    .map((_, index) => new Card(index + 22))
    .forEach((card) => {
      test(`a card with id ${card.id} should have the suit of Wands`, () => {
        expect(card.suit()).toBe("Wands");
      });
    });
  new Array(14)
    .fill(0)
    .map((_, index) => new Card(index + 22 + 14))
    .forEach((card) => {
      test(`a card with id ${card.id} should have the suit of Cups`, () => {
        expect(card.suit()).toBe("Cups");
      });
    });
  new Array(14)
    .fill(0)
    .map((_, index) => new Card(index + 22 + 2 * 14))
    .forEach((card) => {
      test(`a card with id ${card.id} should have the suit of Swords`, () => {
        expect(card.suit()).toBe("Swords");
      });
    });
  new Array(14)
    .fill(0)
    .map((_, index) => new Card(index + 22 + 3 * 14))
    .forEach((card) => {
      test(`a card with id ${card.id} should have the suit of Penticles`, () => {
        expect(card.suit()).toBe("Penticles");
      });
    });
});
