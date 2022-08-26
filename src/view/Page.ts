import Card from "../model/Card";
import Layout from "../model/Layout";
import ViewModel from "./ViewModel";

export default interface Page {
  draw(parent: HTMLElement): void;
  update(model: Layout, cardMap: Map<string, Card>): void;
}
