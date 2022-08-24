import Card from "./Card";
import Layout from "./Layout";
import { Location } from "./Location";
import PlayArea from "./PlayArea";

export default class Foundation extends PlayArea {
  locationName: Location;
  constructor() {
    super();
  }
  location(): Location {
    return "foundation";
  }
  allowed(child: Card): boolean {
    if (this.child) {
      return false;
    }
    if (child.child) {
      return false;
    }
    return child.pip === "Ace" || child.pip === "0";
  }
}
