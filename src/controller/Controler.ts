import Layout from "../model/Layout";
import { v4 } from "uuid";

type UpdateFn = (model: Layout) => void;

export default class Controller {
  listeners: Map<string, UpdateFn>;
  constructor(public model: Layout) {}
  addListener(fn: UpdateFn): string {
    const key = v4();
    this.listeners.set(key, fn);
    return key;
  }
  removeListener(key: string): boolean {
    return this.listeners.delete(key);
  }
  notify() {
    this.listeners.forEach((value) => {
      value(this.model);
    });
  }
}
