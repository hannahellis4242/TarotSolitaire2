import Card from "./Card";
import { Location } from "./Location";

export default interface Link {
  child?: Link;
  parent?: Link;
  location(): Location;
  allowed(child: Card): boolean;
  setChild(newChild?: Card): boolean;
  forceChild(newChild: Card): void;
}
