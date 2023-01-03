import Component from "../../../core/templates/components";
import productDB from "../../../db/productDB";
import ProductInterface from "../../../models/products";
import Pagination from "../pagination/pagination";
import AppState from "../save-goods-state/index";
import Filtration from "../filtration/filtration";
import GoodsNav from "../goods_navigation/index";
import Bag from "../bag/index";

class RoutingWithReload {
  static urlString: string = "";

    static changeURL(value: string) {
      
    this.urlString = value;

    const array = value.split("&");

    const parametersArray = [...array.slice(1)];

    const len = parametersArray.length;

    for (let i = 0; i < len; i++) {
      let fil = parametersArray[i].split("=");

      if (
        fil[0] === "smartphones" ||
        fil[0] === "headphones" ||
        fil[0] === "laptops" ||
        fil[0] === "watches" ||
        fil[0] === "tablets"
      ) {
        if (this.urlString.includes(`${fil[0]}=${true}`)) {
          const atttr = document.querySelectorAll(
            ".filters-item-option-checkbox"
          );
          atttr.forEach((item) => {
            let category = item.getAttribute("category");
            if (category === fil[0]) {
              item.setAttribute("checked", "");
              item.classList.add("active");
            }
          });

          Filtration.categoryFunc(fil[0], fil[1]);
        }
      }
      if (
        fil[0] === "apple" ||
        fil[0] === "samsung" ||
        fil[0] === "xiaomi" ||
        fil[0] === "asus"
      ) {
        if (this.urlString.includes(`${fil[0]}=${true}`)) {
          const atttr = document.querySelectorAll(
            ".filters-item-option-checkbox"
          );
          atttr.forEach((item) => {
            let category = item.getAttribute("category");
            if (category === fil[0]) {
              item.setAttribute("checked", "");
              item.classList.add("active");
            }
          });

          Filtration.brandFunc(fil[0], fil[1]);
        }
      }
      if (fil[0] === "price") {
        let left = fil[1].split("to")[0];
        let right = fil[1].split("to")[1];

        const leftPriceTextContent = document.querySelector(
          ".filters-item-values-price-min-value"
        );
        const rightPriceTextContent = document.querySelector(
          ".filters-item-values-price-max-value"
        );
        if (leftPriceTextContent) {
          leftPriceTextContent.textContent = left;
        }
        if (rightPriceTextContent) {
          rightPriceTextContent.textContent = right;
        }

        if (this.urlString.includes(`${fil[0]}=${left}to${right}`)) {
          const convertStringWithCommasToDefault = (str: string) =>
            str.replace(/,/g, "");

          const minPrice = +convertStringWithCommasToDefault(left);
          const maxPrice = +convertStringWithCommasToDefault(right);

          const filterPriceSliderProgress = document.querySelector(
            ".filters-item-slider-price-progress"
          );
          const leftPriceInput = document.querySelector(
            ".filters-item-input-price-min"
          );
          const rightPriceInput = document.querySelector(
            ".filters-item-input-price-max"
          );

          if (
            filterPriceSliderProgress instanceof HTMLElement &&
            leftPriceInput instanceof HTMLInputElement &&
            rightPriceInput instanceof HTMLInputElement
          ) {
            leftPriceInput.value = `${minPrice}`;
            rightPriceInput.value = `${maxPrice}`;

            filterPriceSliderProgress.style.left =
              ((minPrice - +leftPriceInput.min) /
                (+leftPriceInput.max - +leftPriceInput.min)) *
                100 +
              "%";
            filterPriceSliderProgress.style.right =
              100 -
              ((maxPrice - +rightPriceInput.min) /
                (+rightPriceInput.max - +rightPriceInput.min)) *
                100 +
              "%";
          }

          Filtration.priceFunc(left, right);
        }
      }
      if (fil[0] === "stock") {
        let left = fil[1].split("to")[0];
        let right = fil[1].split("to")[1];

        if (this.urlString.includes(`${fil[0]}=${left}to${right}`)) {
          const leftStockTextContent = document.querySelector(
            ".filters-item-values-stock-min-value"
          );
          const rightStockTextContent = document.querySelector(
            ".filters-item-values-stock-max-value"
          );
          if (leftStockTextContent) {
            leftStockTextContent.textContent = left;
          }
          if (rightStockTextContent) {
            rightStockTextContent.textContent = right;
          }

          const filterStockSliderProgress = document.querySelector(
            ".filters-item-slider-stock-progress"
          );
          const filterStockSliderInputMin = document.querySelector(
            ".filters-item-input-stock-min"
          );
          const filterStockSliderInputMax = document.querySelector(
            ".filters-item-input-stock-max"
          );

          if (
            filterStockSliderProgress instanceof HTMLElement &&
            filterStockSliderInputMin instanceof HTMLInputElement &&
            filterStockSliderInputMax instanceof HTMLInputElement
          ) {
            filterStockSliderInputMin.value = `${left}`;
            filterStockSliderInputMax.value = `${right}`;

            filterStockSliderProgress.style.left =
              ((+left - +filterStockSliderInputMin.min) /
                (+filterStockSliderInputMin.max -
                  +filterStockSliderInputMin.min)) *
                100 +
              "%";
            filterStockSliderProgress.style.right =
              100 -
              ((+right - +filterStockSliderInputMax.min) /
                (+filterStockSliderInputMax.max -
                  +filterStockSliderInputMax.min)) *
                100 +
              "%";
          }

          Filtration.stockFunc(left, right);
        }
      }

      if (fil[0] === "search") {
        if (this.urlString.includes(`${fil[0]}=${fil[1]}`)) {
          const searchInput = document.querySelector(".header-search-input");
          const clearSearchField = document.querySelector(
            ".header-search-input-clear-btn"
          );

          if (searchInput instanceof HTMLInputElement) {
            searchInput.value = fil[1];
          }

          if (clearSearchField) {
            clearSearchField.classList.add("visible");
          }

          Filtration.searched(fil[1]);
        }
      }

      if (fil[0] === "sort") {
        if (this.urlString.includes(`${fil[0]}`)) {
          const selectBoxCurrentItem = document.querySelector(
            ".select-box-current-item"
          );

          if (
            fil[1] === "price-ascending" &&
            selectBoxCurrentItem instanceof HTMLInputElement
          ) {
            selectBoxCurrentItem.setAttribute("current-selected-item", fil[1]);
            selectBoxCurrentItem.value = `Price (ascending)`;
          }
          if (
            fil[1] === "price-descending" &&
            selectBoxCurrentItem instanceof HTMLInputElement
          ) {
            selectBoxCurrentItem.setAttribute("current-selected-item", fil[1]);
            selectBoxCurrentItem.value = `Price (descending)`;
          }
          if (
            fil[1] === "rating-ascending" &&
            selectBoxCurrentItem instanceof HTMLInputElement
          ) {
            selectBoxCurrentItem.setAttribute("current-selected-item", fil[1]);
            selectBoxCurrentItem.value = `Rating (ascending)`;
          }
          if (
            fil[1] === "rating-descending" &&
            selectBoxCurrentItem instanceof HTMLInputElement
          ) {
            selectBoxCurrentItem.setAttribute("current-selected-item", fil[1]);
            selectBoxCurrentItem.value = `Rating (descending)`;
          }
          if (
            fil[1] === "new" &&
            selectBoxCurrentItem instanceof HTMLInputElement
          ) {
            selectBoxCurrentItem.setAttribute("current-selected-item", fil[1]);
            selectBoxCurrentItem.value = `New`;
          }
          if (
            fil[1] === "name" &&
            selectBoxCurrentItem instanceof HTMLInputElement
          ) {
            selectBoxCurrentItem.setAttribute("current-selected-item", fil[1]);
            selectBoxCurrentItem.value = `Name`;
          }

          Filtration.sorted(fil[1]);
        }
      }

          if (fil[0] === 'id' ) {
          const headerBagImg = document.querySelector('.header-bag-img');
          const headerBagItemsCount = document.querySelector('.header-bag-items-count');
          const headerBagItemsCountValue = document.querySelector('.header-bag-items-count-value')

          const totalCount = Bag.bagItems.reduce((partialSum, a) => partialSum + +a.count, 0);

          if (totalCount !== 0) {
            headerBagImg?.classList.add('active')
            headerBagItemsCount?.classList.add('active')
          }
          if (headerBagItemsCountValue) {
            headerBagItemsCountValue.textContent = `${totalCount}`
          }
          
        }

        
    }
    
    if (this.urlString === 'bag') {
      const headerBagImg = document.querySelector('.header-bag-img');
          const headerBagItemsCount = document.querySelector('.header-bag-items-count');
          const headerBagItemsCountValue = document.querySelector('.header-bag-items-count-value')

          const totalCount = Bag.bagItems.reduce((partialSum, a) => partialSum + +a.count, 0);

          if (totalCount !== 0) {
            headerBagImg?.classList.add('active')
            headerBagItemsCount?.classList.add('active')
          }
          if (headerBagItemsCountValue) {
            headerBagItemsCountValue.textContent = `${totalCount}`
          }
    }
  }
}

export default RoutingWithReload;