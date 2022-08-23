import Layout from "../src/model/Layout";
import Foundation from "../src/model/Foundation";
import { all } from "./utils";

describe("Foundation", () => {
  describe("when empty", () => {
    const layout = new Layout();
    const foundation = new Foundation(layout, 0);
    let allowed = [all[0], all[22], all[36], all[50], all[64]];
    allowed.forEach((card) => {
      it(`should allow ${card} to be placed`, () => {
        expect(foundation.proposedChild(card)).toBeTruthy();
      });
    });
    all
      .filter((card) => !allowed.includes(card))
      .forEach((card) => {
        it(`should not allow ${card} to be placed`, () => {
          expect(foundation.proposedChild(card)).toBeFalsy();
        });
      });
  });
  describe("when not empty", () => {
    const layout = new Layout();
    const foundation = new Foundation(layout, 0);
    layout.foundation[0].push(all[0]);
    it(`should allow ${all[1]} to be placed`, () => {
      expect(foundation.proposedChild(all[1])).toBeTruthy();
    });
    all
      .filter((card) => card !== all[1])
      .forEach((card) => {
        it(`should not allow ${card} to be placed`, () => {
          expect(foundation.proposedChild(card)).toBeFalsy();
        });
      });
  });
  describe("when getting the anchor card", () => {
    const layout = new Layout();
    layout.foundation[0].push(all[0]);
    layout.foundation[0].push(all[32]);
    const location = new Foundation(layout, 0);
    it("should give back the last card", () => {
      expect(location.getAnchor()).toBe(all[32]);
    });
  });
});
