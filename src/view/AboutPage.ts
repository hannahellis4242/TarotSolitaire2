import Card from "../model/Card";
import Layout from "../model/Layout";
import Page from "./Page";
import ViewModel from "./ViewModel";

export default class AboutPage implements Page {
  text =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  constructor(private view: ViewModel) {}
  draw(parent: HTMLElement): void {
    const main = document.createElement("main");
    main.id = "screen";
    {
      const header = document.createElement("header");
      header.innerText = "About";
      main.appendChild(header);
    }
    {
      const pannel = document.createElement("section");
      pannel.id = "pannel";
      {
        const button = document.createElement("button");
        button.innerText = "back";
        button.onclick = () => this.view.setPage("start");
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
