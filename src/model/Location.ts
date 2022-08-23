import Card from "./Card";

export default interface Location {
  name: string;
  cards: Card[];
  proposedChild(child: Card): boolean;
}
