import Component from "../../../core/templates/components";
import productDB from "../../../db/productDB";
import ProductInterface from "../../../models/products";
import Pagination from "../pagination/pagination";

class GoodsNav extends Component {
  protected currentPage: number;
  protected goodsPerPage: number;
  protected pagesCount: number = 4;
  protected orient: string = "vertical";

  constructor(
    tagName: string,
    className: string,
    currentPage: number,
    goodsPerPage: number,
    orient: string
  ) {
    super(tagName, className);
    this.currentPage = currentPage;
    this.goodsPerPage = goodsPerPage;
    this.orient = orient;
  }

  displayNavBtn(
    arrData: ProductInterface[],
    goodsPerPage: number,
    currentPage: number
  ) {
    this.goodsPerPage = goodsPerPage;
    this.currentPage = currentPage;

    this.pagesCount = Math.ceil(arrData.length / this.goodsPerPage);

    const unOrderedListItem = this.elFactory("ul", {
      class: "navigation-wrapper-goods",
    });

    for (let i = 1; i <= this.pagesCount; i++) {
      const listItem = this.elFactory("li", {
        class: "navigation-wrapper-goods-item",
      });
      listItem.textContent = `${i}`;

      if (+listItem.textContent === this.currentPage) {
        listItem.classList.add("active-btn");
      }

      listItem.addEventListener("click", () => {
        this.currentPage = i;

        Pagination.paginationBtn(
          this.goodsPerPage,
          this.currentPage,
          this.orient
        );
      });

      unOrderedListItem.append(listItem);
    }

    return unOrderedListItem;
  }

  render() {
    const items = this.displayNavBtn(
      productDB,
      this.goodsPerPage,
      this.currentPage
    );

    this.container.append(items);

    return this.container;
  }
}

export default GoodsNav;
