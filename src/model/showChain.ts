import Parent from "./Parent";

export const showChain = (x: Parent): string => {
  if (x.child) {
    return x.child.id.toString() + " - " + showChain(x.child);
  }
  return "|";
};
