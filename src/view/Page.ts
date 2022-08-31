import Card from "../model/Card";
import Layout from "../model/Layout";

export default interface Page {
  draw(parent: HTMLElement): void;
  update(model: Layout): void;
}
