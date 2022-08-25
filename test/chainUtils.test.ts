import Card from "../src/model/Card";
import {
  chainLength,
  lastChild,
  reverseChain,
  showChain,
  linkId,
  nthChild,
  reverseChainAfter,
} from "../src/model/chainUtils";

const makeTestChain = (length: number) => {
  let index = 0;
  let head: Card;
  let tail: Card;
  do {
    if (!head) {
      head = new Card(index);
      tail = head;
    } else {
      const child = new Card(index);
      tail.forceChild(child);
      tail = child;
    }
    ++index;
  } while (index < length);
  return [head, tail];
};

describe("chainUtils", () => {
  describe("when the chain is empty", () => {
    const head: Card | undefined = undefined;
    describe("when using showChain", () => {
      it("should give the string |", () => {
        expect(showChain(head)).toBe("|");
      });
    });
    describe("when reversing the chain", () => {
      it("should give back an empty chain", () => {
        const newHead = reverseChain(head);
        expect(newHead).toBeUndefined();
      });
    });
    describe("when finding the length of the chain", () => {
      it("should return zero", () => {
        expect(chainLength(head)).toBe(0);
      });
    });
  });
  describe("when using just a chain of cards", () => {
    const [head, tail] = makeTestChain(10);
    describe("when using showChain", () => {
      it("should give the correct string output", () => {
        expect(showChain(head)).toBe(
          "0 - 1 - 2 - 3 - 4 - 5 - 6 - 7 - 8 - 9 - |"
        );
      });
    });
    describe("when using lastChild", () => {
      it("should give the tail", () => {
        expect(lastChild(head)).toBe(tail);
      });
    });
  });
  describe("when using just a chain of one card", () => {
    describe("when using showChain", () => {
      const [head, _] = makeTestChain(1);
      it("should give the correct string output", () => {
        expect(showChain(head)).toBe("0 - |");
      });
    });
    describe("when using reverse", () => {
      it("should leave the chain unchanged", () => {
        const [head, _] = makeTestChain(1);
        const newHead = reverseChain(head);
        expect(newHead).toBe(head);
      });
    });
    describe("when using lastChild", () => {
      it("should give the head", () => {
        const [head, _] = makeTestChain(1);
        expect(lastChild(head)).toBe(head);
      });
    });
  });
  describe("when using a chain of cards", () => {
    const [head, tail] = makeTestChain(10);
    describe("when using reverse", () => {
      const newHead = reverseChain(head);
      it("should give the new head as the old tail", () => {
        expect(newHead).toBe(tail);
      });
      it("should have the next card after new head with index 8", () => {
        const child = newHead.child;
        expect(linkId(child)).toBe("8");
      });
      it("should have the next card after child with index 7", () => {
        const child = newHead.child.child;
        expect(linkId(child)).toBe("7");
      });
      describe("when showing chain should give the correct output", () => {
        expect(showChain(newHead)).toBe(
          "9 - 8 - 7 - 6 - 5 - 4 - 3 - 2 - 1 - 0 - |"
        );
      });
    });
    describe("when using a chain of cards2", () => {
      const [head] = makeTestChain(10);
      const fifth = nthChild(5, head);
      describe("when getting the 5th card", () => {
        it("should have an id of 5", () => {
          expect(fifth).not.toBeUndefined;
          expect(fifth instanceof Card).toBeTruthy();
          const id = fifth instanceof Card ? fifth.id : -1;
          expect(id).toBe(5);
        });
      });
    });
    describe("when using a chain of cards3", () => {
      const [head] = makeTestChain(10);
      const fifth = nthChild(5, head);
      reverseChainAfter(fifth);
      describe("when we reverse the cards after the 5th card", () => {
        it("should have a chain as shown", () => {
          expect(showChain(head)).toBe(
            "0 - 1 - 2 - 3 - 4 - 5 - 9 - 8 - 7 - 6 - |"
          );
        });
      });
    });
  });
});
