import Bag from '../../core/components/bag/index';
import Page from '../../core/templates/page';

export default class BagPage extends Page {
  public bag: Bag = new Bag('div', 'bag');

  constructor(id: string) {
    super(id);
  }

  render() {
    const bagDiv = document.createElement('div');
    bagDiv.classList.add('bag-wrapper');
    bagDiv.append(this.bag.render());
    this.container.append(bagDiv);
    return this.container;
  }
}
