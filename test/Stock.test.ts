import Layout from "../src/model/Layout";
import Stock from "../src/model/Stock";
import { all } from "./utils";

describe("Pile", () => {
  const layout = new Layout();
  const pile = new Stock(layout);
  all.forEach((card) => {
    it(`should not accept any card, namely ${card}`, () => {
      expect(pile.proposedChild(card)).toBeFalsy();
    });
  });
});
