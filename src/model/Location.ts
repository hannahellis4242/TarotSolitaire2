import Card from "./Card";
export type PlayLocation = "pile" | "discard" | "foundation" | "tableau";
export default interface Location {
  name: PlayLocation;
  cards: Card[];
  proposedChild(child: Card): boolean;
}
