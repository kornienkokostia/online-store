import productDB from "../../../db/productDB";
import ProductInterface from "../../../models/products";

class Search {
  protected array: ProductInterface[] = productDB;
  protected value: string;

  constructor(value: string, array?: ProductInterface[]) {
    if (array) {
      this.array = array;
    }

    this.value = value;
  }

  static convertStringWithCommasToDefault = (str: string) =>
    str.replace(/,/g, "");
  static convertNumToSplitString = (str: string) =>
    str.replace(/\B(?<!.\d*)(?=(\d{3})+(?!\d))/g, ",");

  protected searchArray(value: string, array?: ProductInterface[]) {
    if (array) {
      this.array = array;
    }

    this.value = value;

    //default productDB
    if (typeof value === "string" && value.length === 0) {
      this.array = [...this.array];
    }

    this.array = this.array.filter((item) => {
      const xToNormPrice = Search.convertStringWithCommasToDefault(item.price);

      let field = value.toString().toLowerCase();

      return (
        item.brand.toLowerCase().includes(field) ||
        item.name.toLowerCase().includes(field) ||
        item.color?.toLowerCase().includes(field) ||
        item.model.toLowerCase().includes(field) ||
        item.displaySize?.toLowerCase().includes(field) ||
        item.cameras?.toLowerCase().includes(field) ||
        item.storage?.toLowerCase().includes(field) ||
        item.release.toLowerCase().includes(field) ||
        item.chipset?.toLowerCase().includes(field) ||
        item.nfc?.toLowerCase().includes(field) ||
        item.material?.toLowerCase().includes(field) ||
        item.color?.toLowerCase().includes(field) ||
        item.stock.toString().includes(field) ||        
        item.rating.toString().includes(field) ||
        xToNormPrice.includes(field)
      );
    });

    return this.array;
  }

  render() {
    const sortedArray = this.searchArray(this.value, this.array);
    return sortedArray;
  }
}

export default Search;