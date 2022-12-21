import Component from '../../../core/templates/components';
import productDB from '../../../db/productDB';
import ProductInterface from '../../../models/products';

export const typeSafe = (parent: ParentNode, selector: string): HTMLElement => {
  const node = parent.querySelector(selector);

  if (!(node instanceof HTMLElement)) {
    throw new Error('Must be an HTMLElement!');
  }
  return node;
};

class Goods extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderMainBlock(list: HTMLUListElement) {
    const mainBlock = document.createElement('div');
    mainBlock.classList.add('main-wrapper');
    mainBlock.append(list);
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

      const modelItem = this.elFactory('div', {
        class: 'goods-item-description-model',
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

      nameItem.textContent = `${item.name} ${item.capacity}`;
      modelItem.textContent = `${item.color} ${item.model}`;
      price.textContent = item.price + '$';
      buyButton.textContent = 'Buy';

      imgDiv.append(imgItem);
      listItem.append(imgDiv);
      nameModel.append(nameItem);
      nameModel.append(modelItem);
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

    this.renderMainBlock(items);

    this.container.append(items);

    return this.container;
  }
}

export default Goods;
