import GameScreen from "../src/view/utils/GameScreen";

describe("GameScreen", () => {
  describe("when given a card width, a horizontal card spacing and a horisontal layout spacing", () => {
    it("should give back the screen width", () => {
      const parameters = {
        card: {
          width: 10,
          height: 0,
          overlap: 0,
          spacing: { horizontal: 5, vertical: 0 },
        },
        layout: { spacing: { horizontal: 20, vertical: 0 } },
        toolbar: 0,
      };
      const screen = new GameScreen(parameters);
      expect(screen.width()).toBe(170);
    });
    it("should give back the correct screen width", () => {
      const parameters = {
        card: {
          width: 20,
          height: 0,
          overlap: 0,
          spacing: { horizontal: 2, vertical: 0 },
        },
        layout: { spacing: { horizontal: 30, vertical: 0 } },
        toolbar: 0,
      };
      const screen = new GameScreen(parameters);
      expect(screen.width()).toBe(256);
    });
    describe("grid", () => {
      const parameters = {
        card: {
          width: 20,
          height: 80,
          overlap: 10,
          spacing: { horizontal: 2, vertical: 4 },
        },
        layout: { spacing: { horizontal: 30, vertical: 15 } },
        toolbar: 45,
      };
      const screen = new GameScreen(parameters);
      describe("horizontal", () => {
        [
          [-10, undefined],
          [-1, undefined],
          [0, 30],
          [1, 52],
          [2, 74],
          [3, 96],
          [4, 118],
          [5, 140],
          [6, 162],
          [7, 184],
          [8, 206],
          [9, undefined],
          [10, undefined],
          [50, undefined],
        ].forEach(([input, expected]) => {
          it(`should give back ${expected} when given and index of ${input}`, () => {
            expect(screen.grid("horizontal", input)).toBe(expected);
          });
        });
      });
      describe("vertical", () => {
        [
          [-1, undefined],
          [0, 60],
          [1, 144],
          [2, 154],
          [3, 164],
          [4, 174],
          [5, 184],
          [6, 194],
          [7, 204],
          [8, 214],
          [9, 224],
          [10, 234],
          [11, 244],
          [12, 254],
          [13, 264],
          [14, 274],
          [15, 284],
          [16, 294],
          [17, 304],
          [18, 314],
          [19, 324],
          [20, 334],
          [21, 344],
          [22, 354],
          [23, 364],
          [24, 374],
          [25, 384],
          [26, 394],
          [27, 404],
          [28, 414],
          [29, 424],
          [30, 434],
          [31, undefined],
        ].forEach(([input, expected]) => {
          it(`should give back ${expected} when given and index of ${input}`, () => {
            expect(screen.grid("vertical", input)).toBe(expected);
          });
        });
      });
    });
    describe("height", () => {
      const parameters = {
        card: {
          width: 20,
          height: 80,
          overlap: 10,
          spacing: { horizontal: 2, vertical: 4 },
        },
        layout: { spacing: { horizontal: 30, vertical: 15 } },
        toolbar: 45,
      };
      const screen = new GameScreen(parameters);
      it("should give back a height of 533", () => {
        expect(screen.height()).toBe(533);
      });
    });
  });
});
