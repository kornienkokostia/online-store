import Component from "../../../core/templates/components";
import Goods from "../../../core/components/main/goods";

class Pagination {
  static currentPage: number = 1;
  static goodsPerPage: number = 12;

  static displayList() {}

  static paginationBtn(goodsPerPage: number, num: number, orient: string) {
    this.currentPage = num;
    this.goodsPerPage = goodsPerPage;

    const btns = document.querySelector(".main");
    const ids = document.querySelector(".goods-wrapper");

    ids?.remove();

    const goods = new Goods(
      "div",
      "goods-wrapper",
      this.goodsPerPage,
      this.currentPage,
      orient
    ).render();

    btns?.append(goods);

    window.scrollTo(0, 0);
  }
}

export default Pagination;
