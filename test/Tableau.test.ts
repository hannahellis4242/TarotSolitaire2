import Layout from "../src/model/Layout";
import Tableau from "../src/model/Tableau";
import { eights, kings, knights, majors, pages, queens } from "./utils";

describe("Tableau", () => {
  describe("when moving to an empty tableau slot", () => {
    const location = new Tableau();
    describe("when moving a king", () => {
      it("should allow the movement", () => {
        expect(location.allowed(kings[0])).toBeTruthy();
      });
    });
    describe("when moving a queen", () => {
      it("should not allow the movement", () => {
        expect(location.allowed(queens[1])).toBeFalsy();
      });
    });
    describe("when moving The World", () => {
      it("should allow the movement", () => {
        expect(location.allowed(majors[21])).toBeTruthy();
      });
    });
    describe("when moving Judgement", () => {
      it("should not allow the movement", () => {
        expect(location.allowed(majors[20])).toBeFalsy();
      });
    });
  });
  describe("when moving to a non-empty tableau slot", () => {
    describe("when the card that is there is Strength", () => {
      const location = new Tableau();
      location.setChild(majors[8]);
      describe("when moving The Chariot", () => {
        it("should not allow the movement", () => {
          expect(location.allowed(majors[7])).toBeFalsy();
        });
      });
      describe("when moving The Eight of Wands", () => {
        it("should not allow the movement", () => {
          expect(location.allowed(eights[0])).toBeFalsy();
        });
      });
    });
  });
  describe("when getting the location from a Tableau", () => {
    it('should give back "tableau"', () => {
      expect(new Tableau().location()).toBe("tableau");
    });
  });
});
