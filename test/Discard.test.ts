import Discard from "../src/model/Discard";
import Layout from "../src/model/Layout";
import { all } from "./utils";

describe("Discard", () => {
  const layout = new Layout();
  const discard = new Discard(layout);
  all.forEach((card) => {
    it(`should not accept any card, namely ${card}`, () => {
      expect(discard.proposedChild(card)).toBeFalsy();
    });
  });
  describe("when getting the anchor card", () => {
    const layout = new Layout();
    layout.discard.push(all[0]);
    layout.discard.push(all[42]);
    const location = new Discard(layout);
    it("should give back the last card", () => {
      expect(location.getAnchor()).toBe(all[42]);
    });
  });
});
