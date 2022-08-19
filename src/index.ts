import View from "./View";

(() => {
  const view = new View();
  view.createCard("red");
  view.createTarget(100, 700, "red");
  view.createTarget(300, 300, "red");
  view.createTarget(200, 600, "blue");
})();
