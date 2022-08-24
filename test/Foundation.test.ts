import Layout from "../src/model/Layout";
import Foundation from "../src/model/Foundation";
import { all, majors, wands } from "./utils";

describe("Foundation", () => {
  describe("when empty", () => {
    const foundation = new Foundation();
    let allowed = [all[0], all[22], all[36], all[50], all[64]];
    allowed.forEach((card) => {
      it(`should allow ${card} to be placed`, () => {
        expect(foundation.allowed(card)).toBeTruthy();
      });
    });
    all
      .filter((card) => !allowed.includes(card))
      .forEach((card) => {
        it(`should not allow ${card} to be placed`, () => {
          expect(foundation.allowed(card)).toBeFalsy();
        });
      });
  });
  describe("when not empty", () => {
    const foundation = new Foundation();
    const card = majors[0];
    foundation.setChild(card);
    all.forEach((card) => {
      it(`should not allow ${card} to be placed`, () => {
        expect(foundation.allowed(card)).toBeFalsy();
      });
    });
  });
  describe("when getting location", () => {
    it("should give back 'foundation'", () => {
      expect(new Foundation().location()).toBe("foundation");
    });
  });
  describe("when forcing the child", () => {
    describe("when the child is The Ace Of Wands", () => {
      const location = new Foundation();
      const card = wands[0];
      location.forceChild(card);
      describe("when getting the child", () => {
        it("should give the card", () => {
          expect(location.child).toBe(card);
        });
      });
      describe("when getting the parent from the card", () => {
        it("should give the location", () => {
          expect(card.parent).toBe(location);
        });
      });
    });
  });
});
