import Card from "./Card";
import { Location } from "./Location";
import Parent from "./Parent";

export default abstract class ForcedParent implements Parent {
  constructor(public child?: Card) {}
  abstract location(): Location;
  abstract allowed(child: Card): boolean;
  abstract setChild(newChild?: Card): boolean;
  forceChild(newChild: Card): void {
    if (this.child) {
      this.child.parent = undefined;
    }
    this.child = newChild;
    if (this.child) {
      this.child.parent = this;
    }
  }
}
