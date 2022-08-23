import Layout from "../src/model/Layout";
import Stock from "../src/model/Stock";
import { all } from "./utils";

describe("Stock", () => {
  describe("when droping a card", () => {
    const layout = new Layout();
    const stock = new Stock(layout);
    all.forEach((card) => {
      it(`should not accept any card, namely ${card}`, () => {
        expect(stock.proposedChild(card)).toBeFalsy();
      });
    });
  });
  describe("when getting the anchor card", () => {
    const layout = new Layout();
    layout.stock.push(all[0]);
    layout.stock.push(all[52]);
    const stock = new Stock(layout);
    it("should give back the last card", () => {
      expect(stock.getAnchor()).toBe(all[52]);
    });
  });
});
