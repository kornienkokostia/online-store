import Goods from '../../../core/components/main/goods';
import ProductInterface from 'models/products';
import AppState from '../save-goods-state/index';

class Pagination {
  static currentPage: number = 1;
  static goodsPerPage: number = 12;
  static orientation: string = AppState.getGoodsOrientation();

  static displayList() {}

  static paginationBtn(
    goodsPerPage: number,
    num: number,
    product: ProductInterface[],
    needScrollTop: boolean,
  ) {
    this.currentPage = num;
    this.goodsPerPage = goodsPerPage;

    const btns = document.querySelector('.main');
    const ids = document.querySelector('.goods-wrapper');

    const onWindowScroll = () => {
      if (window.scrollY === 0) {
        ids?.remove();

        const goods = new Goods(
          'div',
          'goods-wrapper',
          this.goodsPerPage,
          this.currentPage,
          product,
        ).render();

        btns?.append(goods);
      }
    };

    if (needScrollTop) {
      window.addEventListener('scroll', onWindowScroll);
      window.scrollTo(0, 0);
      setTimeout(() => {
        window.removeEventListener('scroll', onWindowScroll);
      }, 1000);
    } else {
      ids?.remove();

      const goods = new Goods(
        'div',
        'goods-wrapper',
        this.goodsPerPage,
        this.currentPage,
        product,
      ).render();

      btns?.append(goods);
    }
  }
}

export default Pagination;
