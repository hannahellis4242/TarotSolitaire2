import Layout from "../src/model/Layout";
import Tableau from "../src/model/Tableau";
import { eights, kings, knights, majors, pages, queens } from "./utils";

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
  describe("when tableau represents several cards", () => {
    const layout = new Layout();
    layout.tableau[0] = [kings[0], queens[1], knights[2], pages[3]];
    const location = new Tableau(layout, 0, 3);
    describe("when we get the anchor card", () => {
      it("should give the card that is spesified by the depth", () => {
        expect(location.getAnchor()).toBe(queens[1]);
      });
    });
  });
});
