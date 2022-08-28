import Card from "../model/Card";
import Layout from "../model/Layout";
import Page from "./Page";
import ViewModel from "./ViewModel";

export default class GamePage implements Page {
  private model: Layout;
  private cardMap: Map<string, Card>;
  constructor(private view: ViewModel) {}
  draw(parent: HTMLElement): void {
    const main = document.createElement("main");
    main.id = "table";
    {
      const header = document.createElement("header");
      {
        const button = document.createElement("button");
        button.innerText = "exit";
        button.classList.add("right");
        button.onclick = () => this.view.setPage("start");
        header.appendChild(button);
      }
      main.appendChild(header);
    }
    parent.appendChild(main);
  }
  update(model: Layout, cardMap: Map<string, Card>): void {
    this.model = model;
    this.cardMap = cardMap;
  }
}
