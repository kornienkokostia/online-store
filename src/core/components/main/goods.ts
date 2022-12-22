import Component from '../../templates/components';
import productDB from '../../../db/productDB';
import ProductInterface from '../../../models/products';

export default class Goods extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderItems(arr: ProductInterface[]) {
    const items = arr.map(item => {
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

    return unOrderedListItem;
  }

  render() {
    const items = this.renderItems(productDB);

    this.container.append(items);

    return this.container;
  }
}
