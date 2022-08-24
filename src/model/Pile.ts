import Card from "./Card";
import PlayArea from "./PlayArea";

export default abstract class Pile extends PlayArea {
  constructor(child?: Card) {
    super(child);
  }
  allowed(child: Card): boolean {
    return true;
  }
}
