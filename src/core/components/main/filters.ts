import {
  FiltersOptionsBrand,
  FiltersOptionsCategory,
} from '../../../db/filtersDB';
import productDB from '../../../db/productDB';
import Component from '../../templates/components';
import Filtration from '../filtration/filtration';

export default class Filters extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderFiltersButtons() {
    const filtersButtonsDiv = this.elFactory('div', {
      class: 'filters-buttons',
    });

    const resetFiltersButton = this.elFactory('button', {
      class: 'filters-btn reset-filters-btn',
    });
    resetFiltersButton.textContent = 'Reset filters';
    resetFiltersButton.addEventListener('click', () => {
      Filtration.resetAll();
    });

    const copyLinkButton = this.elFactory('button', {
      class: 'filters-btn copy-link-btn',
    });
    copyLinkButton.textContent = 'Copy link';

    copyLinkButton.addEventListener('click', () => {
      this.copyLinkURLString();
      copyLinkButton.textContent = 'Copied!';
      setTimeout(() => {
        copyLinkButton.textContent = 'Copy link';
      }, 2000);
    });

    filtersButtonsDiv.append(resetFiltersButton);
    filtersButtonsDiv.append(copyLinkButton);

    return filtersButtonsDiv;
  }

  copyLinkURLString() {
    let copyText = window.location.href;
    navigator.clipboard.writeText(copyText).then(
      () => {
        console.log('Async: Copying to clipboard was successful!');
      },
      err => {
        console.error('Async: Could not copy text: ', err);
      },
    );
  }

  renderFilterOption(item: string) {
    const filterOption = this.elFactory('div', {
      class: 'filters-item-option',
    });

    const filterOptionCheckboxImg = this.elFactory('img', {
      class: 'filters-item-option-checkbox-img',
      src: './assets/images/icons/selected-item.svg',
      alt: 'checkbox-img',
    });
    filterOptionCheckboxImg.ondragstart = () => false;
    const filterOptionCheckbox = this.elFactory(
      'div',
      { class: 'filters-item-option-checkbox', category: item, checked: false },
      filterOptionCheckboxImg,
    );

    const filterOptionName = this.elFactory('span', {
      class: 'filters-item-option-name',
    });
    filterOptionName.textContent = this.capitilizeFirstLetter(item);

    filterOption.addEventListener('click', e => {
      filterOptionCheckbox.classList.toggle('active');
      filterOptionCheckbox.getAttribute('checked') === ''
        ? filterOptionCheckbox.setAttribute('checked', 'false')
        : filterOptionCheckbox.setAttribute('checked', '');

      const target = e.currentTarget;
      if (target instanceof HTMLElement) {
        let checkedCategory = filterOptionCheckbox.getAttribute('category');
        let checkedValue;

        if (filterOptionCheckbox.getAttribute('checked') === '') {
          checkedValue = 'true';
        } else {
          checkedValue = 'false';
        }

        if (checkedCategory) {
          Filtration.filterByBrand(checkedCategory, checkedValue);
        }
      }
    });

    filterOption.append(filterOptionCheckbox);
    filterOption.append(filterOptionName);

    return filterOption;
  }

  renderOptionHeader(title: string, filterDiv: HTMLDivElement) {
    const filterHeader = this.elFactory('div', {
      class: 'filters-item-header',
    });
    const filterTitle = this.elFactory('span', {
      class: 'filters-item-header-title',
    });
    filterTitle.textContent = title;

    const filterExpandBtn = this.elFactory(
      'button',
      { class: 'filters-item-header-expand-btn' },
      this.elFactory('img', {
        class: 'filters-item-header-expand-btn-img',
        src: './assets/images/icons/filter-expand-btn.svg',
        alt: 'filter-expand-btn',
      }),
    );
    filterExpandBtn.addEventListener('click', () => {
      filterDiv.classList.toggle('active');
      filterExpandBtn.classList.toggle('active');
    });

    filterHeader.append(filterTitle);
    filterHeader.append(filterExpandBtn);

    return filterHeader;
  }

  renderFiltersItems() {
    const filtersDiv = this.elFactory('div', { class: 'filters-items' });

    // category
    const filterCategory = this.elFactory('div', {
      class: 'filters-item filters-item-category active',
    });
    const filterCategoryHeader = this.renderOptionHeader(
      'Category',
      filterCategory,
    );
    const filterCategoryOptions = this.elFactory('div', {
      class: 'filters-item-options',
    });
    FiltersOptionsCategory.map(el => {
      const filterOption = this.renderFilterOption(el);
      filterCategoryOptions.append(filterOption);
    });
    filterCategory.append(filterCategoryHeader);
    filterCategory.append(filterCategoryOptions);

    // brand
    const filterBrand = this.elFactory('div', {
      class: 'filters-item filters-item-brand active',
    });
    const filterBrandHeader = this.renderOptionHeader('Brand', filterBrand);
    const filterBrandOptions = this.elFactory('div', {
      class: 'filters-item-options',
    });
    FiltersOptionsBrand.map(el => {
      const filterOption = this.renderFilterOption(el);
      filterBrandOptions.append(filterOption);
    });
    filterBrand.append(filterBrandHeader);
    filterBrand.append(filterBrandOptions);

    // convert functions
    const convertNumToSplitString = (str: string) =>
      str.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    const convertStringWithCommasToDefault = (str: string) =>
      str.replace(/,/g, '');

    // price

    const minPrice = Math.min(
      ...productDB.map(el => +convertStringWithCommasToDefault(el.price)),
    );
    const maxPrice = Math.max(
      ...productDB.map(el => +convertStringWithCommasToDefault(el.price)),
    );

    const filterPrice = this.elFactory('div', {
      class: 'filters-item filters-item-price active',
    });
    const filterPriceHeader = this.renderOptionHeader('Price', filterPrice);
    const filterPriceDualProgress = this.elFactory('div', {
      class: 'filters-item-dual-progress',
    });

    const filterPriceSlider = this.elFactory('div', {
      class: 'filters-item-slider-price',
    });

    const filterPriceSliderProgress = this.elFactory('div', {
      class: 'filters-item-slider-price-progress',
    });

    const filterPriceSliderInput = this.elFactory('div', {
      class: 'filters-item-input-price',
    });
    const filterPriceSliderInputMin = this.elFactory('input', {
      class: 'filters-item-input-price-min',
      type: 'range',
      min: `${minPrice}`,
      max: `${maxPrice}`,
      value: `${minPrice}`,
    });
    const filterPriceSliderInputMax = this.elFactory('input', {
      class: 'filters-item-input-price-max',
      type: 'range',
      min: `${minPrice}`,
      max: `${maxPrice}`,
      value: `${maxPrice}`,
    });

    filterPriceSliderProgress.style.left =
      ((+filterPriceSliderInputMin.value - +filterPriceSliderInputMin.min) /
        (+filterPriceSliderInputMin.max - +filterPriceSliderInputMin.min)) *
      100 +
      '%';
    filterPriceSliderProgress.style.right =
      100 -
      ((+filterPriceSliderInputMax.value - +filterPriceSliderInputMax.min) /
        (+filterPriceSliderInputMax.max - +filterPriceSliderInputMax.min)) *
      100 +
      '%';

    filterPriceSliderInput.append(filterPriceSliderInputMin);
    filterPriceSliderInput.append(filterPriceSliderInputMax);

    filterPriceSlider.append(filterPriceSliderProgress);
    filterPriceSlider.append(filterPriceSliderInput);

    const addCurrency = () => {
      const filterPriceCurrency = this.elFactory('span', {
        class: 'filters-item-values-price-currency',
      });
      filterPriceCurrency.textContent = '$';
      return filterPriceCurrency;
    };

    const filterPriceValues = this.elFactory('div', {
      class: 'filters-item-values-price',
    });

    const filterPriceMin = this.elFactory('div', {
      class: 'filters-item-values-price-min',
    });
    const filterPriceMinValue = this.elFactory('span', {
      class: 'filters-item-values-price-min-value',
    });
    filterPriceMinValue.textContent = convertNumToSplitString(
      `${filterPriceSliderInputMin.value}`,
    );
    filterPriceMin.append(addCurrency());
    filterPriceMin.append(filterPriceMinValue);

    const filterPriceMax = this.elFactory('div', {
      class: 'filters-item-values-price-max',
    });
    const filterPriceMaxValue = this.elFactory('span', {
      class: 'filters-item-values-price-max-value',
    });
    filterPriceMaxValue.textContent = convertNumToSplitString(
      `${filterPriceSliderInputMax.value}`,
    );
    filterPriceMax.append(addCurrency());
    filterPriceMax.append(filterPriceMaxValue);

    filterPriceValues.append(filterPriceMin);
    filterPriceValues.append(filterPriceMax);

    // changing price progressbar value
    [...filterPriceSliderInput.children].map(el => {
      el.addEventListener('input', e => {
        let minVal = +filterPriceSliderInputMin.value;
        let maxVal = +filterPriceSliderInputMax.value;
        let gap = 0;

        if (maxVal - minVal < gap) {
          if (e.target === filterPriceSliderInputMin) {
            filterPriceSliderInputMin.value = `${maxVal - gap}`;
          } else {
            filterPriceSliderInputMax.value = `${minVal + gap}`;
          }
        } else {
          filterPriceMinValue.textContent = convertNumToSplitString(
            filterPriceSliderInputMin.value,
          );
          filterPriceMaxValue.textContent = convertNumToSplitString(
            filterPriceSliderInputMax.value,
          );

          filterPriceSliderProgress.style.left =
            ((minVal - +filterPriceSliderInputMin.min) /
              (+filterPriceSliderInputMin.max -
                +filterPriceSliderInputMin.min)) *
            100 +
            '%';
          filterPriceSliderProgress.style.right =
            100 -
            ((maxVal - +filterPriceSliderInputMax.min) /
              (+filterPriceSliderInputMax.max -
                +filterPriceSliderInputMax.min)) *
            100 +
            '%';
        }
      });

      const updateGoodsByPrice = () => {
        let leftPrice = document.querySelector(
          '.filters-item-values-price-min-value',
        )?.textContent;
        let rightPrice = document.querySelector(
          '.filters-item-values-price-max-value',
        )?.textContent;

        if (leftPrice && rightPrice) {
          const convertPrice = `${convertStringWithCommasToDefault(
            leftPrice,
          )}to${convertStringWithCommasToDefault(rightPrice)}`;
          Filtration.filterByBrand('price', convertPrice);
        }
      }
      el.addEventListener('mouseup', updateGoodsByPrice);
      el.addEventListener('touchend', updateGoodsByPrice);
    });

    filterPriceDualProgress.append(filterPriceSlider);
    filterPriceDualProgress.append(filterPriceValues);

    filterPrice.append(filterPriceHeader);
    filterPrice.append(filterPriceDualProgress);

    // stock
    const minStock = Math.min(...productDB.map(el => +el.stock));
    const maxStock = Math.max(...productDB.map(el => +el.stock));

    const filterStock = this.elFactory('div', {
      class: 'filters-item filters-item-stock active',
    });
    const filterStockHeader = this.renderOptionHeader('Stock', filterStock);
    const filterStockDualProgress = this.elFactory('div', {
      class: 'filters-item-dual-progress',
    });

    const filterStockSlider = this.elFactory('div', {
      class: 'filters-item-slider-stock',
    });

    const filterStockSliderProgress = this.elFactory('div', {
      class: 'filters-item-slider-stock-progress',
    });

    const filterStockSliderInput = this.elFactory('div', {
      class: 'filters-item-input-stock',
    });
    const filterStockSliderInputMin = this.elFactory('input', {
      class: 'filters-item-input-stock-min',
      type: 'range',
      min: `${minStock}`,
      max: `${maxStock}`,
      value: `${minStock}`,
    });
    const filterStockSliderInputMax = this.elFactory('input', {
      class: 'filters-item-input-stock-max',
      type: 'range',
      min: `${minStock}`,
      max: `${maxStock}`,
      value: `${maxStock}`,
    });

    filterStockSliderProgress.style.left =
      ((+filterStockSliderInputMin.value - +filterStockSliderInputMin.min) /
        (+filterStockSliderInputMin.max - +filterStockSliderInputMin.min)) *
      100 +
      '%';
    filterStockSliderProgress.style.right =
      100 -
      ((+filterStockSliderInputMax.value - +filterStockSliderInputMax.min) /
        (+filterStockSliderInputMax.max - +filterStockSliderInputMax.min)) *
      100 +
      '%';

    filterStockSliderInput.append(filterStockSliderInputMin);
    filterStockSliderInput.append(filterStockSliderInputMax);

    filterStockSlider.append(filterStockSliderProgress);
    filterStockSlider.append(filterStockSliderInput);

    const filterStockValues = this.elFactory('div', {
      class: 'filters-item-values-stock',
    });

    const filterStockMin = this.elFactory('div', {
      class: 'filters-item-values-stock-min',
    });
    const filterStockMinValue = this.elFactory('span', {
      class: 'filters-item-values-stock-min-value',
    });
    filterStockMinValue.textContent = `${filterStockSliderInputMin.value}`;
    filterStockMin.append(filterStockMinValue);

    const filterStockMax = this.elFactory('div', {
      class: 'filters-item-values-stock-max',
    });
    const filterStockMaxValue = this.elFactory('span', {
      class: 'filters-item-values-stock-max-value',
    });
    filterStockMaxValue.textContent = `${filterStockSliderInputMax.value}`;
    filterStockMax.append(filterStockMaxValue);

    filterStockValues.append(filterStockMin);
    filterStockValues.append(filterStockMax);

    // changing stock progressbar value
    [...filterStockSliderInput.children].map(el => {
      el.addEventListener('input', e => {
        let minVal = +filterStockSliderInputMin.value;
        let maxVal = +filterStockSliderInputMax.value;
        let gap = 0;

        if (maxVal - minVal < gap) {
          if (e.target === filterStockSliderInputMin) {
            filterStockSliderInputMin.value = `${maxVal - gap}`;
          } else {
            filterStockSliderInputMax.value = `${minVal + gap}`;
          }
        } else {
          filterStockMinValue.textContent = filterStockSliderInputMin.value;
          filterStockMaxValue.textContent = filterStockSliderInputMax.value;

          filterStockSliderProgress.style.left =
            ((minVal - +filterStockSliderInputMin.min) /
              (+filterStockSliderInputMin.max -
                +filterStockSliderInputMin.min)) *
            100 +
            '%';
          filterStockSliderProgress.style.right =
            100 -
            ((maxVal - +filterStockSliderInputMax.min) /
              (+filterStockSliderInputMax.max -
                +filterStockSliderInputMax.min)) *
            100 +
            '%';
        }
      });
      
      const updateGoodsByStock = () => {
        let leftStock = document.querySelector(
          '.filters-item-values-stock-min-value',
        )?.textContent;
        let rightStock = document.querySelector(
          '.filters-item-values-stock-max-value',
        )?.textContent;

        if (leftStock && rightStock) {
          const stock = `${leftStock}to${rightStock}`;
          Filtration.filterByBrand('stock', stock);
        }
      }
      
      el.addEventListener('mouseup', updateGoodsByStock);
      el.addEventListener('touchend', updateGoodsByStock);
    });

    filterStockDualProgress.append(filterStockSlider);
    filterStockDualProgress.append(filterStockValues);

    filterStock.append(filterStockHeader);
    filterStock.append(filterStockDualProgress);

    filtersDiv.append(filterCategory);
    filtersDiv.append(filterBrand);
    filtersDiv.append(filterPrice);
    filtersDiv.append(filterStock);
    return filtersDiv;
  }

  renderFilters() {
    const filtersDiv = this.elFactory('div', { class: 'filters' });
    const filtersButtons = this.renderFiltersButtons();
    const filtersItems = this.renderFiltersItems();

    filtersDiv.append(filtersButtons);
    filtersDiv.append(filtersItems);

    return filtersDiv;
  }

  render() {
    const filters = this.renderFilters();

    this.container.append(filters);

    return this.container;
  }
}
