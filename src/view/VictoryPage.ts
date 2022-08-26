import Card from "../model/Card";
import Layout from "../model/Layout";
import Page from "./Page";
import ViewModel from "./ViewModel";

export default class VictoryPage implements Page {
  constructor(private view: ViewModel) {}
  draw(parent: HTMLElement): void {
    const main = document.createElement("main");
    main.id = "screen";
    {
      const header = document.createElement("header");
      header.innerText = "Well done you have won!";
      main.appendChild(header);
    }
    {
      const pannel = document.createElement("section");
      pannel.id = "pannel";
      {
        const button = document.createElement("button");
        button.innerText = "play again";
        button.onclick = () => this.view.setPage("start");
        pannel.appendChild(button);
      }
      main.appendChild(pannel);
    }
    parent.appendChild(main);
  }
  update(model: Layout, cardMap: Map<string, Card>): void {
    //we don't really care about this;
  }
}
