import productDB from "../../../db/productDB";
import ProductInterface from "../../../models/products";
import Pagination from "../pagination/pagination";

class Filtration {
  static smartphones: boolean;
  static headphones: boolean;
  static laptops: boolean;
  static watches: boolean;
  static tablets: boolean;
  static apple: boolean;
  static samsung: boolean;
  static xiaomi: boolean;
  static asus: boolean;

  static product: ProductInterface[] = [];

  static brandArray: string[] = ["apple", "samsung", "xiaomi", "asus"];
  static categoryArray: string[] = [
    "smartphones",
    "headphones",
    "laptops",
    "watches",
    "tablets",
  ];

  static priceLeft: string = "124";
  static priceRight: string = "2499";

  static stockLeft: string = "10";
  static stockRight: string = "282";

  static filtrationList(item: string, values: boolean) {
    if (
      item === "smartphones" ||
      item === "headphones" ||
      item === "laptops" ||
      item === "watches" ||
      item === "tablets" ||
      item === "apple" ||
      item === "samsung" ||
      item === "xiaomi" ||
      item === "asus"
    ) {
      this[item] = values;

      this.filterByBrand(item, this[item]);
    }
  }

  static filterByBrand(fil: string, value: boolean) {
    if (
      fil === "apple" ||
      fil === "samsung" ||
      fil === "xiaomi" ||
      fil === "asus"
    ) {
      this.brandFunc(fil, value);
    }

    if (
      fil === "smartphones" ||
      fil === "headphones" ||
      fil === "laptops" ||
      fil === "watches" ||
      fil === "tablets"
    ) {
      this.categoryFunc(fil, value);
    }
  }

  static brandFunc(fil: string, value: boolean) {
    if (value === true) {
      if (this.brandArray.length === 4) {
        this.brandArray.length = 0;
      }

      this.brandArray.push(fil);
    }

    if (value === false) {
      this.brandArray = this.brandArray.filter((goods) => goods !== fil);

      if (this.brandArray.length === 0) {
        this.brandArray.push(...["apple", "samsung", "xiaomi", "asus"]);
      }
    }

    this.render();
  }

  static categoryFunc(fil: string, value: boolean) {
    if (value === true) {
      if (this.categoryArray.length === 5) {
        this.categoryArray.length = 0;
      }

      this.categoryArray.push(fil);
    }

    if (value === false) {
      this.categoryArray = this.categoryArray.filter((goods) => goods !== fil);

      if (this.categoryArray.length === 0) {
        this.categoryArray.push(
          ...["smartphones", "headphones", "laptops", "watches", "tablets"]
        );
      }
    }

    this.render();
  }

  static priceFunc(left: string, right: string) {
    this.priceLeft = left;
    this.priceRight = right;
    this.render();
  }

  static stockFunc(left: string, right: string) {
    this.stockLeft = left;
    this.stockRight = right;
    this.render();
  }

  static filtration() {
    this.product.length = 0;
    let arr: ProductInterface[] = [];

    const brandLength: number = this.brandArray.length;
    const categoryLength: number = this.categoryArray.length;

    

    for (let i = 0; i < brandLength; i++) {
      const arr = [...productDB];
      this.product.push(
        ...arr.filter((item) => item.brand === this.brandArray[i])
      );
    }

    for (let i = 0; i < categoryLength; i++) {
      arr.push(
        ...this.product.filter(
          (item) => item.category === this.categoryArray[i]
        )
      );
      
    }
    const convertStringWithCommasToDefault = (str: string) => str.replace(/,/g,'')
    this.product = arr;
    
    this.product = this.product.filter(
      (item) =>
        +convertStringWithCommasToDefault(item.price) >= Number(this.priceLeft) &&
        +convertStringWithCommasToDefault(item.price) <= Number(this.priceRight)
    );
    console.log(this.product)

    this.product = this.product.filter(
      (item) =>
        +item.stock >= Number(this.stockLeft) &&
        +item.stock <= Number(this.stockRight)
    );

    
  }

  static render() {
    this.filtration();

    Pagination.paginationBtn(12, 1, "vertical", this.product);
  }
}

export default Filtration;
