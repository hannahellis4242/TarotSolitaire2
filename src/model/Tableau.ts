import Card from "./Card";
import { Location } from "./Location";
import PlayArea from "./PlayArea";
export default class Tableau extends PlayArea {
  constructor() {
    super();
  }
  allowed(child: Card): boolean {
    return !this.child && (child.pip === "King" || child.pip === "XXI");
  }

  location(): Location {
    return "tableau";
  }
}
