import Card from "./Card";
export type PlayLocation = "stock" | "discard" | "foundation" | "tableau";
export default interface Location {
  name: PlayLocation;
  proposedChild(child: Card): boolean;
  getAnchor(): Card | undefined;
}
