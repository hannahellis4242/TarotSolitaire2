import Discard from "../src/model/Discard";
import { all } from "./utils";

describe("Discard", () => {
  describe("when allowing a card", () => {
    const discard = new Discard();
    all.forEach((card) => {
      it(`should allow any card, namely ${card}`, () => {
        expect(discard.allowed(card)).toBeTruthy();
      });
    });
  });
  describe("when getting location", () => {
    it('should give "discard"', () => {
      expect(new Discard().location()).toBe("discard");
    });
  });
  describe("when constructing with a child card", () => {
    it("should give the child back", () => {
      const location = new Discard(all[0]);
      expect(location.child).toBe(all[0]);
    });
  });
});
