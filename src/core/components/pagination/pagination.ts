import Component from "../../../core/templates/components";
import Goods from "../../../core/components/main/goods";
import ProductInterface from "models/products";

class Pagination {
  static currentPage: number = 1;
  static goodsPerPage: number = 12;

  static displayList() {}

  static paginationBtn(goodsPerPage: number, num: number, orient: string, product: ProductInterface[] ) {
    this.currentPage = num;
    this.goodsPerPage = goodsPerPage;
    

    const btns = document.querySelector(".main");
    const ids = document.querySelector(".goods-wrapper");


    ids?.remove();

    console.log(product)

    const goods = new Goods(
      "div",
      "goods-wrapper",
      this.goodsPerPage,
      this.currentPage,
      orient,
      product
    ).render();

    btns?.append(goods);

    // window.scrollTo(0, 0);
  }
}

export default Pagination;
