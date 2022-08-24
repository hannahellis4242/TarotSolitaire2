import Card from "./Card";
import { Location } from "./Location";
import Pile from "./Pile";

export default class Discard extends Pile {
  constructor(child?: Card) {
    super(child);
  }
  location(): Location {
    return "discard";
  }
}
