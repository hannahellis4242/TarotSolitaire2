import Card from "../src/model/Card";
import Layout, { populate } from "../src/model/Layout";

describe("Layout", () => {
  describe("things the layout should have", () => {
    test("the layout should have a tableau that consists of nine slots for cards", () => {
      const layout = new Layout();
      expect(layout.tableau.length).toBe(9);
      expect(layout.tableau[0]).not.toBe(layout.tableau[1]); //make sure that each array of cards is actually a different array of cards
    });
    test("the layout should have a foundation of 5 slots for cards", () => {
      const layout = new Layout();
      expect(layout.foundation.length).toBe(5);
      expect(layout.foundation[0]).not.toBe(layout.foundation[1]); //make sure that each array of cards is actually a different array of cards
    });
    test("the layout should have a pile of cards that starts off empty", () => {
      const layout = new Layout();
      expect(layout.pile.length).toBe(0);
    });
    test("the layout should have a discard pile of cards that starts off empty", () => {
      const layout = new Layout();
      expect(layout.discard.length).toBe(0);
    });
  });
  describe("can create a layout with cards", () => {
    const deck = new Array(78).fill(0).map((_, i) => new Card(i));
    const layout = populate(deck);
    test("first slot in tableau has one card and is the first card in the deck", () => {
      expect(layout.tableau[0].length).toBe(1);
      expect(layout.tableau[0][0]).toBe(deck[0]);
    });
    test("second slot in tableau have two cards and contains the second and third cards in the deck", () => {
      expect(layout.tableau[1].length).toBe(2);
      expect(layout.tableau[1][0]).toBe(deck[1]);
      expect(layout.tableau[1][1]).toBe(deck[2]);
    });
    test("third slot in tableau have three cards and contains the third, fourth and fifth card in the deck", () => {
      expect(layout.tableau[2].length).toBe(3);
      expect(layout.tableau[2][0]).toBe(deck[3]);
      expect(layout.tableau[2][1]).toBe(deck[4]);
      expect(layout.tableau[2][2]).toBe(deck[5]);
    });
    test("fourth slot in tableau have 4 cards and contains the correct cards", () => {
      expect(layout.tableau[3].length).toBe(4);
      expect(layout.tableau[3][0]).toBe(deck[6]);
      expect(layout.tableau[3][1]).toBe(deck[7]);
      expect(layout.tableau[3][2]).toBe(deck[8]);
      expect(layout.tableau[3][3]).toBe(deck[9]);
    });
    test("fifth slot in tableau have 5 cards and contains the correct cards", () => {
      expect(layout.tableau[4].length).toBe(5);
      expect(layout.tableau[4][0]).toBe(deck[10]);
      expect(layout.tableau[4][1]).toBe(deck[11]);
      expect(layout.tableau[4][2]).toBe(deck[12]);
      expect(layout.tableau[4][3]).toBe(deck[13]);
      expect(layout.tableau[4][4]).toBe(deck[14]);
    });
    test("sixth slot in tableau have 6 cards and contains the correct cards", () => {
      expect(layout.tableau[5].length).toBe(6);
      expect(layout.tableau[5][0]).toBe(deck[15]);
      expect(layout.tableau[5][1]).toBe(deck[16]);
      expect(layout.tableau[5][2]).toBe(deck[17]);
      expect(layout.tableau[5][3]).toBe(deck[18]);
      expect(layout.tableau[5][4]).toBe(deck[19]);
      expect(layout.tableau[5][5]).toBe(deck[20]);
    });
    test("seventh slot in tableau have 7 cards and contains the correct cards", () => {
      expect(layout.tableau[6].length).toBe(7);
      expect(layout.tableau[6][0]).toBe(deck[21]);
      expect(layout.tableau[6][1]).toBe(deck[22]);
      expect(layout.tableau[6][2]).toBe(deck[23]);
      expect(layout.tableau[6][3]).toBe(deck[24]);
      expect(layout.tableau[6][4]).toBe(deck[25]);
      expect(layout.tableau[6][5]).toBe(deck[26]);
      expect(layout.tableau[6][6]).toBe(deck[27]);
    });
    test("eighth slot in tableau have 8 cards and contains the correct cards", () => {
      expect(layout.tableau[7].length).toBe(8);
      expect(layout.tableau[7][0]).toBe(deck[28]);
      expect(layout.tableau[7][1]).toBe(deck[29]);
      expect(layout.tableau[7][2]).toBe(deck[30]);
      expect(layout.tableau[7][3]).toBe(deck[31]);
      expect(layout.tableau[7][4]).toBe(deck[32]);
      expect(layout.tableau[7][5]).toBe(deck[33]);
      expect(layout.tableau[7][6]).toBe(deck[34]);
      expect(layout.tableau[7][7]).toBe(deck[35]);
    });
    test("nineth slot in tableau have 9 cards and contains the correct cards", () => {
      expect(layout.tableau[8].length).toBe(9);
      expect(layout.tableau[8][0]).toBe(deck[36]);
      expect(layout.tableau[8][1]).toBe(deck[37]);
      expect(layout.tableau[8][2]).toBe(deck[38]);
      expect(layout.tableau[8][3]).toBe(deck[39]);
      expect(layout.tableau[8][4]).toBe(deck[40]);
      expect(layout.tableau[8][5]).toBe(deck[41]);
      expect(layout.tableau[8][6]).toBe(deck[42]);
      expect(layout.tableau[8][7]).toBe(deck[43]);
      expect(layout.tableau[8][8]).toBe(deck[44]);
    });
    test("rest of the cards are in the pile", () => {
      expect(layout.pile.length).toBe(33);
      new Array(33)
        .fill(0)
        .map((_, i) => [i, i + 45])
        .forEach(([i, j]) => {
          expect(layout.pile[i]).toBe(deck[j]);
        });
    });
  });
});
