import Layout from "../model/Layout";
import Page from "./Page";

export default class ViewModel {
  page: Page;
  pageMap: Map<string, Page>;
  body: HTMLBodyElement;
  constructor(document: Document) {
    this.body = document.body as HTMLBodyElement;
    this.pageMap = new Map<string, Page>();
  }
  clear() {
    this.body.replaceChildren();
  }
  registerPage(key: string, page: Page): boolean {
    if (this.pageMap.has(key)) {
      return false;
    }
    this.pageMap.set(key, page);
    return true;
  }
  setPage(key: string) {
    const page = this.pageMap.get(key);
    if (page) {
      this.page = page;
      this.clear();
      this.page.draw(this.body);
    }
  }
  update(model: Layout) {
    if (this.page) {
      this.page.update(model);
      this.clear();
      this.page.draw(this.body);
    }
  }
}
