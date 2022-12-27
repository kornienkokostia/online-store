import Page from "../../core/templates/page";
import Goods from "../../core/components/main/goods";
import TopPanel from "../../core/components/main/top-panel";
import Filters from "../../core/components/main/filters";
import productDB from "../../db/productDB";

class MainPage extends Page {
  static textObject = {
    MainTitle: "Main Page",
  };

  public filters: Filters = new Filters("div", "filters-wrapper");
  public topPanel: TopPanel = new TopPanel("div", "top-panel-wrapper");

  constructor(id: string) {
    super(id);
  }

  render() {
    const mainDiv = document.createElement("main");
    const goods = new Goods("div", "goods-wrapper", 12, 1, "vertical", productDB).render();
    mainDiv.classList.add("main");
    mainDiv.append(this.filters.render());
    mainDiv.append(this.topPanel.render());
    mainDiv.append(goods);
    this.container.append(mainDiv);

    return this.container;
  }
}

export default MainPage;
