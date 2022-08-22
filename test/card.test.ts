class Card{
    constructor(id:number){
    }
    suit(){
        return "Trump";
    }
}

describe("Card",()=>{
    test("a card should have a suit",()=>{
        const card = new Card(0);
        expect(card.suit()).toBe("Trump");
    })
})