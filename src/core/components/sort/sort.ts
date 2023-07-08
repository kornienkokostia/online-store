import productDB from '../../../db/productDB';
import ProductInterface from '../../../models/products';

export default class Sort {
  protected array: ProductInterface[] = productDB;
  protected value: string;

  constructor(value: string, array?: ProductInterface[]) {
    if (array) {
      this.array = array;
    }

    this.value = value;
  }

  static convertStringWithCommasToDefault = (str: string) =>
    str.replace(/,/g, '');
  static convertNumToSplitString = (str: string) =>
    str.replace(/\B(?<!.\d*)(?=(\d{3})+(?!\d))/g, ',');

  protected sortArray(value: string, array?: ProductInterface[]) {
    if (array) {
      this.array = array;
    }

    this.value = value;

    if (value === 'name') {
      this.array = this.array.sort((x, y) =>
        x.name > y.name ? 1 : x.name < y.name ? -1 : 0,
      );
    }

    if (value === 'new') {
      this.array = this.array.sort((x, y) =>
        +x.release < +y.release ? 1 : +x.release > +y.release ? -1 : 0,
      );
    }

    if (value === 'price-ascending') {
      this.array = this.array.sort((x, y) => {
        const xToNormPrice = Sort.convertStringWithCommasToDefault(x.price);
        const yToNormPrice = Sort.convertStringWithCommasToDefault(y.price);

        return +xToNormPrice > +yToNormPrice
          ? 1
          : +xToNormPrice < +yToNormPrice
          ? -1
          : 0;
      });
    }

    if (value === 'price-descending') {
      this.array = this.array.sort((x, y) => {
        const xToNormPrice = Sort.convertStringWithCommasToDefault(x.price);
        const yToNormPrice = Sort.convertStringWithCommasToDefault(y.price);

        return +xToNormPrice < +yToNormPrice
          ? 1
          : +xToNormPrice > +yToNormPrice
          ? -1
          : 0;
      });
    }

    if (value === 'rating-ascending') {
      this.array = this.array.sort((x, y) =>
        +x.rating > +y.rating ? 1 : +x.rating < +y.rating ? -1 : 0,
      );
    }

    if (value === 'rating-descending') {
      this.array = this.array.sort((x, y) =>
        +x.rating < +y.rating ? 1 : +x.rating > +y.rating ? -1 : 0,
      );
    }

    return this.array;
  }

  render() {
    const sortedArray = this.sortArray(this.value, this.array);
    return sortedArray;
  }
}
