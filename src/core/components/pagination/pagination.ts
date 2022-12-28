import Goods from "../../../core/components/main/goods";
import ProductInterface from "models/products";

class Pagination {
  static currentPage: number = 1;
  static goodsPerPage: number = 12;
  static orientation: string = 'vertical';

  static displayList() {}

  static paginationBtn(goodsPerPage: number, num: number, orient: string, product: ProductInterface[], 
      needScrollTop: boolean ) {
    this.currentPage = num;
    this.goodsPerPage = goodsPerPage;
    this.orientation = orient;    

    const btns = document.querySelector(".main");
    const ids = document.querySelector(".goods-wrapper");

    const onWindowScroll = () => {
      if (window.scrollY === 0) {
          console.log(window.scrollY === 0)
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
        }
    }    
    
    if (needScrollTop) {
      window.addEventListener('scroll', onWindowScroll)
      window.scrollTo(0, 0)
      setTimeout(() => {
        window.removeEventListener('scroll', onWindowScroll)
      }, 1000)
      
    } else {
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
    }
    
  }
}

export default Pagination;
