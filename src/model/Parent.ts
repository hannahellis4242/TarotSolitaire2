import Card from "./Card";
import { Location } from "./Location";

export default interface Parent {
  child?: Card;
  location(): Location;
  allowed(child: Card): boolean;
  setChild(newChild?: Card): boolean;
  forceChild(newChild: Card): void;
}

export const showChain = (x: Parent): string => {
  if (x.child) {
    return x.child.id.toString() + " - " + showChain(x.child);
  }
  return "|";
};
