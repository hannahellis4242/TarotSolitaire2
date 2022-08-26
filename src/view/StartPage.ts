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
    {
      const header = document.createElement("header");
      header.innerText = this.text;
      main.appendChild(header);
    }
    {
      const about = document.createElement("p");
      about.innerText = this.text;
      main.appendChild(about);
    }
    {
      const button = document.createElement("button");
      button.innerText = "start game";
      button.onclick = () => this.view.setPage("victory");
      main.appendChild(button);
    }
    parent.appendChild(main);
  }
  update(model: Layout, cardMap: Map<string, Card>): void {
    throw new Error("Method not implemented.");
  }
}
