import Card from "../model/Card";
import Layout from "../model/Layout";
import Page from "./Page";
import ViewModel from "./ViewModel";

export default class VictoryPage implements Page {
  constructor(private view: ViewModel) {}
  draw(parent: HTMLElement): void {
    const main = document.createElement("main");
    {
      const header = document.createElement("header");
      header.innerText = "Well done you have won!";
      main.appendChild(header);
    }
    {
      const button = document.createElement("button");
      button.innerText = "play again";
      button.onclick = () => this.view.setPage("start");
      main.appendChild(button);
    }
    parent.appendChild(main);
  }
  update(model: Layout, cardMap: Map<string, Card>): void {
    //we don't really care about this;
  }
}
