import Component from '../../templates/components';
import productDB from '../../../db/productDB';
import ProductInterface from '../../../models/products';
import GoodsNav from '../goods_navigation/index';

export default class Goods extends Component {
  goodsPerPage: number = 12;
  currentPage: number = 1;

  constructor(
    tagName: string,
    className: string,
    goodsPerPage: number,
    currentPage: number,
  ) {
    super(tagName, className);
    this.goodsPerPage = goodsPerPage;
    this.currentPage = currentPage;
  }

  renderItems(arrData: ProductInterface[], goodsPerPage = 12, currentPage = 1) {
    const start = goodsPerPage * (currentPage - 1);
    const end = start + goodsPerPage;
    const paginatedData = arrData.slice(start, end);

    const items = paginatedData.map(item => {
      const listItem = this.elFactory('li', {
        class: 'goods-item',
        id: item.id,
      });

      const imgDiv = this.elFactory('div', { class: 'goods-item-img' });

      const imgItem = this.elFactory('img', { class: 'img', src: item.img });

      const nameModel = this.elFactory('div', {
        class: 'goods-item-description',
      });

      const nameItem = this.elFactory('div', {
        class: 'goods-item-description-name',
      });

      const priceAndBuy = this.elFactory('div', {
        class: 'goods-item-wrapper',
      });

      const price = this.elFactory('div', {
        class: 'goods-item-wrapper-price',
      });

      const buyButton = this.elFactory('button', {
        class: 'goods-item-wrapper-buyButton',
      });

      nameItem.textContent = `${item.name} ${item.capacity} ${item.color} ${item.model}`;

      price.textContent = item.price + '$';
      buyButton.textContent = 'Buy';

      imgDiv.append(imgItem);
      listItem.append(imgDiv);
      nameModel.append(nameItem);
      listItem.append(nameModel);
      priceAndBuy.append(price);
      priceAndBuy.append(buyButton);
      listItem.append(priceAndBuy);

      return listItem;
    });

    const unOrderedListItem = this.elFactory('ul', { class: 'goods' });
    unOrderedListItem.append(...items);

    const mainBlock = this.elFactory('div', { class: 'main-wrapper' });
    mainBlock.append(unOrderedListItem);

    return mainBlock;
  }

  render(num: number = 1) {
    const items = this.renderItems(productDB, 12, num);
    const goodsNav = new GoodsNav('div', 'navigation-wrapper', num);
    this.container.append(items);
    this.container.append(goodsNav.render(num));

    return this.container;
  }
}
