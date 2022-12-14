/*import View from "./view/View";

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
})();*/

import StartPage from "./view/StartPage";
import VictoryPage from "./view/VictoryPage";
import AboutPage from "./view/AboutPage";
import ViewModel from "./view/ViewModel";
import GamePage from "./view/GamePage";

const vm = new ViewModel(document);
vm.registerPage("start", new StartPage(vm));
vm.registerPage("victory", new VictoryPage(vm));
vm.registerPage("about", new AboutPage(vm));
vm.registerPage("game", new GamePage(vm));
vm.setPage("start");
