import Card from "../src/model/Card";

class Layout{
    tableau:Card[][];
    foundation:Card[][];
    pile:Card[];
    discard:Card[];
    constructor(){
        this.tableau = new Array(9).fill(0).map(()=>new Array<Card>());
        this.foundation = new Array(5).fill(0).map(()=>new Array<Card>());
        this.pile=new Array<Card>();
        this.discard=new Array<Card>();
    }
};

describe("Layout", () => {
  test("the layout should have a tableau that consists of nine slots for cards", () => {
    const layout = new Layout();
    expect(layout.tableau.length).toBe(9);
    expect(layout.tableau[0]).not.toBe(layout.tableau[1]);//make sure that each array of cards is actually a different array of cards
  });
  test("the layout should have a foundation of 5 slots for cards", () => {
    const layout = new Layout();
    expect(layout.foundation.length).toBe(5);
    expect(layout.foundation[0]).not.toBe(layout.foundation[1]);//make sure that each array of cards is actually a different array of cards
  });
  test("the layout should have a pile of cards that starts off empty", () => {
    const layout = new Layout();
    expect(layout.pile.length).toBe(0);
  });
  test("the layout should have a discard pile of cards that starts off empty", () => {
    const layout = new Layout();
    expect(layout.discard.length).toBe(0);
  });
  /*test("a layout can be populated with cards"){
        const layout = new Layout();
        const deck = new Array(78).fill(0).map((_,i)=>new Card(i));
        layout.populate(deck);
    }*/
});
