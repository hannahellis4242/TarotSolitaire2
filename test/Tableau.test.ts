import Layout from "../src/model/Layout";
import Tableau from "../src/model/Tableau";
import { eights, kings, majors, queens } from "./utils";

describe("Tableau", () => {
  describe("when moving to an empty tableau slot", () => {
    const layout = new Layout();
    const location = new Tableau(layout, 0);
    describe("when moving a king", () => {
      it("should allow the movement", () => {
        expect(location.proposedChild(kings[0])).toBeTruthy();
      });
    });
    describe("when moving a queen", () => {
      it("should not allow the movement", () => {
        expect(location.proposedChild(queens[1])).toBeFalsy();
      });
    });
    describe("when moving The World", () => {
      it("should allow the movement", () => {
        expect(location.proposedChild(majors[21])).toBeTruthy();
      });
    });
    describe("when moving Judgement", () => {
      it("should not allow the movement", () => {
        expect(location.proposedChild(majors[20])).toBeFalsy();
      });
    });
  });
  describe("when moving to a non-empty tableau slot", () => {
    describe("when the card that is there is Strength", () => {
      const layout = new Layout();
      const location = new Tableau(layout, 0);
      location.cards.push(majors[8]);
      describe("when moving The Chariot", () => {
        it("should allow the movement", () => {
          expect(location.proposedChild(majors[7])).toBeTruthy();
        });
      });
      describe("when moving The Eight of Wands", () => {
        it("should not allow the movement", () => {
          expect(location.proposedChild(eights[0])).toBeFalsy();
        });
      });
    });
  });
});
