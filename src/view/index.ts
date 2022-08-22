import View from "./View";

(() => {
  const view = new View();
  for (let i = 0; i < 3; ++i) {
    view.createCard("red");
    view.createCard("green");
    view.createCard("blue");
    view.createTarget(200, 100 + i * 200, "red");
    view.createTarget(300, 100 + i * 200, "green");
    view.createTarget(400, 100 + i * 200, "blue");
  }
})();
