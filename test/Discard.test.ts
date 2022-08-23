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
});
