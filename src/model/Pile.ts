import Card from "./Card";
import Link from "./Link";
import PlayArea from "./PlayArea";

export default abstract class Pile extends PlayArea {
  constructor(parent?: Link, child?: Link) {
    super(parent, child);
  }
  allowed(child: Card): boolean {
    return true;
  }
}
