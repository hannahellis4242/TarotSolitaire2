import Card from "./Card";
import ForcedParent from "./ForcedParent";
import Link from "./Link";
import { Location } from "./Location";

export default abstract class PlayArea extends ForcedParent {
  abstract location(): Location;
  abstract allowed(child: Card): boolean;
  constructor(parent?: Link, child?: Link) {
    super(parent, child);
  }
  setChild(newChild?: Card): boolean {
    if (newChild) {
      if (this.allowed(newChild)) {
        this.child = newChild;
        this.child.parent = this;
        return true;
      }
      return false;
    }
    if (this.child) {
      this.child.parent = undefined;
    }
    this.child = newChild;
  }
}
