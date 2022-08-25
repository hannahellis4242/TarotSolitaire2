import colors from "colors";
import Card from "./Card";
import Link from "./Link";

export const linkId = (link?: Link): string => {
  if (!link) {
    return "|";
  }
  if (link instanceof Card) {
    const str = link.id.toString();
    return link.faceUp ? colors.underline(str) : str;
  }
  return colors.bold(link.location());
};

export const showChain = (link?: Link, max?: number): string => {
  if (max === 0) {
    return "!";
  }
  return link
    ? linkId(link) + " - " + showChain(link.child, max ? max - 1 : undefined)
    : linkId(link);
};

export const chainLength = (link?: Link): number => {
  return link ? 1 + chainLength(link.child) : 0;
};

export const numberOfCardsInChain = (link?: Link): number => {
  if (link instanceof Card) {
    return chainLength(link);
  }
  return link ? numberOfCardsInChain(link.child) : 0;
};

export const chainToArray = (current: Link): Link[] => {
  if (current.child) {
    return [current, ...chainToArray(current.child)];
  }
  return [current];
};

export const nthChild = (index: number, current?: Link): Link | undefined => {
  if (index === 0 || !current) {
    return current;
  }
  return nthChild(index - 1, current.child);
};

export const forEachCardInChain = (fn: (card: Card) => void, link?: Link) => {
  if (link) {
    if (link instanceof Card) {
      fn(link);
    }
    forEachCardInChain(fn, link.child);
  }
};

export const reverseChain = (link?: Link): Link | undefined => {
  if (link) {
    const parent = link.parent;
    const child = link.child;
    link.parent = child;
    link.child = parent;
    return child ? reverseChain(child) : link;
  }
  return undefined;
};

export const reverseChainAfter = (link?: Link) => {
  if (link) {
    const oldChild = link.child;
    const newChild = reverseChain(oldChild);
    link.child = newChild;
    if (newChild) {
      newChild.parent = link;
    }
    if (oldChild) {
      oldChild.child = undefined;
    }
  }
};

export const lastChild = (link: Link): Link => {
  return link.child ? lastChild(link.child) : link;
};
