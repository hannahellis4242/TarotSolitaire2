import Card from "./Card";
import { Location } from "./Location";
import Link from "./Link";

export default abstract class ForcedParent implements Link {
  constructor(public parent?: Link, public child?: Link) {}
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
