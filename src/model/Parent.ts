import Card from "./Card";
import { Location } from "./Location";

export default interface Parent {
  child?: Card;
  location(): Location;
  allowed(child: Card): boolean;
  setChild(newChild?: Card): boolean;
  forceChild(newChild: Card): void;
}
