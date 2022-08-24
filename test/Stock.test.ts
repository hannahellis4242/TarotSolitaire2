import Stock from "../src/model/Stock";
import { all } from "./utils";

describe("Stock", () => {
  describe("when allowing a card", () => {
    const location = new Stock();
    all.forEach((card) => {
      it(`should allow any card, namely ${card}`, () => {
        expect(location.allowed(card)).toBeTruthy();
      });
    });
  });
  describe("when getting location", () => {
    it('should give "stock"', () => {
      expect(new Stock().location()).toBe("stock");
    });
  });
  describe("when constructing with a child card", () => {
    it("should give the child back", () => {
      const location = new Stock(all[0]);
      expect(location.child).toBe(all[0]);
    });
  });
});
