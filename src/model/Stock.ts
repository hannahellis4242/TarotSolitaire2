import Card from "./Card";
import { Location } from "./Location";
import Pile from "./Pile";

export default class Stock extends Pile {
  constructor(child?: Card) {
    super(undefined, child);
  }
  location(): Location {
    return "stock";
  }
}
