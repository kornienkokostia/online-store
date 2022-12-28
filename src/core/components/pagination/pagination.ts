import Goods from "../../../core/components/main/goods";
import ProductInterface from "models/products";

class Pagination {
  static currentPage: number = 1;
  static goodsPerPage: number = 12;
  static orientation: string = 'vertical';

  static displayList() {}

  static paginationBtn(goodsPerPage: number, num: number, orient: string, product: ProductInterface[] ) {
    this.currentPage = num;
    this.goodsPerPage = goodsPerPage;
    this.orientation = orient;    

    const btns = document.querySelector(".main");
    const ids = document.querySelector(".goods-wrapper");


    ids?.remove();

    const goods = new Goods(
      "div",
      "goods-wrapper",
      this.goodsPerPage,
      this.currentPage,
      this.orientation,
      product
    ).render();

    btns?.append(goods);

    // window.scrollTo(0, 0);
  }
}

export default Pagination;
