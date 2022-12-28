import productDB from "../../../db/productDB";
import ProductInterface from "../../../models/products";
import { FiltersOptionsBrand, FiltersOptionsCategory } from '../../../db/filtersDB';
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

  static brandArray: string[] = [...FiltersOptionsBrand];
  static categoryArray: string[] = [...FiltersOptionsCategory];

  static getMinPriceVal = (arr: ProductInterface[]) => Math.min(...arr.map(el => +this.convertStringWithCommasToDefault(el.price))).toString();
  static getMaxPriceVal = (arr: ProductInterface[]) => Math.max(...arr.map(el => +this.convertStringWithCommasToDefault(el.price))).toString();

  static getMinStockVal = (arr: ProductInterface[]) => Math.min(...arr.map(el => +this.convertStringWithCommasToDefault(`${el.stock}`))).toString();
  static getMaxStockVal = (arr: ProductInterface[]) => Math.max(...arr.map(el => +this.convertStringWithCommasToDefault(`${el.stock}`))).toString();

  static convertStringWithCommasToDefault = (str: string) => str.replace(/,/g,'')
  static convertNumToSplitString = (str: string) => str.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")

  static priceLeft: string = this.getMinPriceVal(productDB)
  static priceRight: string = this.getMaxPriceVal(productDB);

  static stockLeft: string = this.getMinStockVal(productDB);
  static stockRight: string = this.getMaxStockVal(productDB);

  static orient: string = 'vertical';
  
  static changePriceInputs = () => {
    if (this.product.length !== 0) {
      const currentMinPrice = this.getMinPriceVal(this.product)
      const currentMaxPrice = this.getMaxPriceVal(this.product)

      const minPriceVal: HTMLElement = document.querySelector('.filters-item-values-price-min-value') as HTMLElement
      const maxPriceVal: HTMLElement = document.querySelector('.filters-item-values-price-max-value') as HTMLElement
      const minPriceEl: HTMLInputElement = document.querySelector('.filters-item-input-price-min') as HTMLInputElement
      const maxPriceEl: HTMLInputElement = document.querySelector('.filters-item-input-price-max') as HTMLInputElement
      const priceSliderProgress: HTMLElement = document.querySelector('.filters-item-slider-price-progress') as HTMLElement

      minPriceVal.textContent = this.convertNumToSplitString(currentMinPrice)
  
      minPriceEl.value = currentMinPrice

      maxPriceVal.textContent = this.convertNumToSplitString(currentMaxPrice)
    
      maxPriceEl.value = currentMaxPrice

      priceSliderProgress.style.left =
        ((+minPriceEl.value - +minPriceEl.min) /
          (+minPriceEl.max - +minPriceEl.min)) *
          100 +
        '%';
      priceSliderProgress.style.right =
        100 -
        ((+maxPriceEl.value - +maxPriceEl.min) /
          (+maxPriceEl.max - +maxPriceEl.min)) *
          100 +
        '%';
    }
    
  }

  static changeStockInputs = () => {
    if (this.product.length !== 0) {
      const currentMinStock = this.getMinStockVal(this.product)
      const currentMaxStock = this.getMaxStockVal(this.product)

      const minStockVal: HTMLElement = document.querySelector('.filters-item-values-stock-min-value') as HTMLElement
      const maxStockVal: HTMLElement = document.querySelector('.filters-item-values-stock-max-value') as HTMLElement
      const minStockEl: HTMLInputElement = document.querySelector('.filters-item-input-stock-min') as HTMLInputElement
      const maxStockEl: HTMLInputElement = document.querySelector('.filters-item-input-stock-max') as HTMLInputElement
      const stockSliderProgress: HTMLElement = document.querySelector('.filters-item-slider-stock-progress') as HTMLElement

      minStockVal.textContent = this.convertNumToSplitString(currentMinStock)
  
      minStockEl.value = currentMinStock

      maxStockVal.textContent = this.convertNumToSplitString(currentMaxStock)
    
      maxStockEl.value = currentMaxStock

      stockSliderProgress.style.left =
        ((+minStockEl.value - +minStockEl.min) /
          (+minStockEl.max - +minStockEl.min)) *
          100 +
        '%';
      stockSliderProgress.style.right =
        100 -
        ((+maxStockEl.value - +maxStockEl.min) /
          (+maxStockEl.max - +maxStockEl.min)) *
          100 +
        '%';
    }
    
  }

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
    this.changePriceInputs()
    this.changeStockInputs()
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
    this.changePriceInputs()
    this.changeStockInputs()
  }

  static priceFunc(left: string, right: string) {
    this.priceLeft = left;
    this.priceRight = right;
    this.render();
    this.changeStockInputs()
  }

  static stockFunc(left: string, right: string) {
    this.stockLeft = left;
    this.stockRight = right;
    this.render();
    this.changePriceInputs()
  }

  static filtration() {
    this.orient = Pagination.orientation
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
    if (categoryLength === FiltersOptionsCategory.length && brandLength === FiltersOptionsBrand.length) {
      this.product = productDB
    } else {
      this.product = arr;
    }
    
    console.log(this.product)
    
    this.product = this.product.filter(
      (item) =>
        +this.convertStringWithCommasToDefault(item.price) >= Number(this.priceLeft) &&
        +this.convertStringWithCommasToDefault(item.price) <= Number(this.priceRight)
    );

    this.product = this.product.filter(
      (item) =>
        +item.stock >= Number(this.stockLeft) &&
        +item.stock <= Number(this.stockRight)
    );
    
    
  }

  static render() {
    this.filtration();
   
    const foundItemsSpan = document.querySelector('.sorting-found-value') as HTMLElement
    foundItemsSpan.textContent = this.product.length.toString()

    Pagination.paginationBtn(12, 1, this.orient, this.product);
  }

  static resetAll() {
    const checkbox = document.querySelectorAll('.filters-item-option-checkbox');
    checkbox.forEach(item => {
     item.classList.remove('active');
     item.setAttribute('checked', 'false')
    })
 
    Filtration.smartphones = false;
    Filtration.headphones = false;   
    Filtration.laptops = false; 
    Filtration.watches = false; 
    Filtration.tablets = false; 
    Filtration.apple = false; 
    Filtration.samsung = false; 
    Filtration.xiaomi = false; 
    Filtration.asus = false; 
 
    Filtration.brandArray = FiltersOptionsBrand;
    Filtration.categoryArray = FiltersOptionsCategory;
 
   Filtration.priceLeft = this.getMinPriceVal(productDB);
   Filtration.priceRight = this.getMaxPriceVal(productDB);
   
   Filtration.stockLeft = this.getMinStockVal(productDB);
   Filtration.stockRight = this.getMaxStockVal(productDB);
 
   this.orient = Pagination.orientation;
 
   Filtration.render();
   this.changePriceInputs()
   this.changeStockInputs()
   }
}



export default Filtration;