import Card from "../model/Card";
import Layout from "../model/Layout";
import Page from "./Page";
import ViewModel from "./ViewModel";

export default class StartPage implements Page {
  title: string;
  text: string;
  constructor(private view: ViewModel) {
    this.title = "Welcome to Tarot Solitare";
    this.text = "about";
  }
  draw(parent: HTMLElement): void {
    const main = document.createElement("main");
    main.id = "screen";
    {
      const header = document.createElement("header");
      header.innerText = this.title;
      main.appendChild(header);
    }
    {
      const pannel = document.createElement("section");
      pannel.id = "pannel";
      {
        const button = document.createElement("button");
        button.innerText = "start game";
        button.onclick = () => this.view.setPage("victory");
        pannel.appendChild(button);
      }
      main.appendChild(pannel);
    }
    {
      const about = document.createElement("p");
      about.innerText = this.text;
      main.appendChild(about);
    }
    parent.appendChild(main);
  }
  update(model: Layout, cardMap: Map<string, Card>): void {
    //we don't care about this
  }
}
