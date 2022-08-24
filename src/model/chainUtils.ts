import Card from "./Card";
import Parent from "./Parent";

export const showChain = (x: Parent): string => {
  if (x.child) {
    return x.child.id.toString() + " - " + showChain(x.child);
  }
  return "|";
};

export const chainLength = (x: Parent): number => {
  if (x.child) {
    return 1 + chainLength(x.child);
  }
  return 0;
};

export const chainToArray = (current: Parent): Parent[] => {
  if (current.child) {
    return [current, ...chainToArray(current.child)];
  }
  return [current];
};

export const nthChild = (
  index: number,
  current?: Parent
): Parent | undefined => {
  if (index === 0 || !current) {
    return current;
  }
  return nthChild(index - 1, current.child);
};

export const nthCard = (index: number, current?: Card): Card | undefined => {
  if (index === 0 || !current) {
    return current;
  }
  return nthCard(index - 1, current.child);
};
