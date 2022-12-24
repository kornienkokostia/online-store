import Component from '../../templates/components';
import Pagination from "../pagination/pagination";

const SortingOptions = [
  { value: 'new', displayValue: 'New' },
  { value: 'name', displayValue: 'Name' },
  { value: 'price-ascending', displayValue: 'Price (ascending)' },
  { value: 'price-descending', displayValue: 'Price (descending)' },
];

export default class TopPanel extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderSortingPicker() {
    const sortingPickerDiv = this.elFactory('div', { class: 'sorting-picker' });

    const sortingPickerTitle = this.elFactory('span', {
      class: 'sorting-picker-title',
    });
    sortingPickerTitle.textContent = 'Sort';

    const selectBoxCurrentItem = this.elFactory('input', {
      class: 'select-box-current-item',
      type: 'text',
      'current-selected-item': '',
      placeholder: 'Select item',
    });

    const selectBoxBtnImg = this.elFactory('img', {
      class: 'select-box-open-btn-img',
      src: './assets/images/icons/select-box-btn.svg',
      alt: 'select-box-btn',
    });

    const selectBoxBtn = this.elFactory(
      'button',
      { class: 'select-box-open-btn' },
      selectBoxBtnImg,
    );

    const sortingPickerSelectBox = this.elFactory(
      'div',
      { class: 'sorting-picker-select-box' },
      selectBoxCurrentItem,
      selectBoxBtn,
    );

    const selectBoxOptionsDiv = this.elFactory('div', {
      class: 'select-box-items',
    });

    const selectBoxOptionsNotFoundItem = this.elFactory('div', {
      class: 'select-box-not-found',
    });

    const sortingFoundDiv = this.elFactory('div', { class: 'sorting-found' });
    sortingFoundDiv.textContent = 'Found: ';
    const sortingFoundValue = this.elFactory('span', {
      class: 'sorting-found-value',
    });
    sortingFoundValue.textContent = '0';

    sortingFoundDiv.append(sortingFoundValue);

    const changeCurrentOption = (displayValue: string, value: string) => {
      selectBoxCurrentItem.value = displayValue;
      selectBoxCurrentItem.setAttribute('current-selected-item', value);
    };

    const addItemToOptions = (displayValue: string, value: string) => {
      const selectBoxOptionsItem = this.elFactory('div', {
        class: 'select-box-item',
        value: value,
      });
      selectBoxOptionsItem.textContent = displayValue;
      selectBoxOptionsItem.addEventListener('click', () => {
        changeCurrentOption(displayValue, value);
      });
      selectBoxOptionsDiv.append(selectBoxOptionsItem);
    };
    const addNotFoundItemToOptions = () => {
      selectBoxOptionsNotFoundItem.textContent = 'Not found';
      selectBoxOptionsDiv.append(selectBoxOptionsNotFoundItem);
    };

    const addAllItemsToOptions = () => {
      SortingOptions.map(el => {
        addItemToOptions(el.displayValue, el.value);
      });
    };

    const removeAllSpecialSymbols = (str: string) =>
      str.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');

    addAllItemsToOptions();

    selectBoxBtn.addEventListener('click', () => {
      selectBoxOptionsDiv.classList.toggle('active');
    });
    document.body.addEventListener('click', e => {
      if (
        e.target !== selectBoxOptionsDiv &&
        e.target !== selectBoxBtn &&
        e.target !== selectBoxBtnImg &&
        e.target != selectBoxCurrentItem &&
        e.target !== sortingPickerSelectBox &&
        e.target !== selectBoxOptionsNotFoundItem
      ) {
        selectBoxOptionsDiv.classList.remove('active');
      }
    });

    selectBoxCurrentItem.addEventListener('input', () => {
      selectBoxOptionsDiv.classList.add('active');
      selectBoxOptionsDiv.innerHTML = '';

      SortingOptions.map(el => el.displayValue).map((el, i) => {
        if (
          selectBoxCurrentItem.value !== '' &&
          removeAllSpecialSymbols(el.toLowerCase()).includes(
            removeAllSpecialSymbols(selectBoxCurrentItem.value.toLowerCase()),
          )
        ) {
          addItemToOptions(
            SortingOptions[i].displayValue,
            SortingOptions[i].value,
          );
        }
        if (
          selectBoxCurrentItem.value === '' &&
          [...selectBoxOptionsDiv.children].length !== SortingOptions.length
        ) {
          addAllItemsToOptions();
          selectBoxCurrentItem.setAttribute('current-selected-item', '');
        }
      });
      if ([...selectBoxOptionsDiv.children].length === 0) {
        addNotFoundItemToOptions();
      }
    });

    sortingPickerSelectBox.append(selectBoxOptionsDiv);

    sortingPickerDiv.append(sortingPickerTitle);
    sortingPickerDiv.append(sortingPickerSelectBox);
    sortingPickerDiv.append(sortingFoundDiv);

    return sortingPickerDiv;
  }

  renderChangeGrid() {
    const changeGridDiv = this.elFactory('div', { class: 'change-grid' });
    const changeGridToSquares = this.elFactory(
      'div',
      { class: 'change-grid-to-squares change-grid-item active' },
      this.elFactory('div', { class: 'square-grid' }),
      this.elFactory('div', { class: 'square-grid' }),
      this.elFactory('div', { class: 'square-grid' }),
      this.elFactory('div', { class: 'square-grid' }),
    );

    const changeGridToLines = this.elFactory(
      'div',
      { class: 'change-grid-to-lines change-grid-item' },
      this.elFactory('div', { class: 'square-grid' }),
      this.elFactory('div', { class: 'square-grid' }),
      this.elFactory('div', { class: 'square-grid' }),
      this.elFactory('div', { class: 'square-grid' }),
    );

    changeGridToSquares.addEventListener("click", () => {
      changeGridToSquares.classList.add("active");
      changeGridToLines.classList.remove("active");
      const activeBtn = Number(
        document.querySelector(".active-btn")?.textContent
      );

      if (activeBtn) {
        Pagination.paginationBtn(12, activeBtn, "vertical");
      }
    });

    changeGridToLines.addEventListener("click", () => {
      changeGridToSquares.classList.remove("active");
      changeGridToLines.classList.add("active");
      const activeBtn = Number(
        document.querySelector(".active-btn")?.textContent
      );

      if (activeBtn) {
        Pagination.paginationBtn(12, activeBtn, "horizontal");
      }
    });

    changeGridDiv.append(changeGridToSquares);
    changeGridDiv.append(changeGridToLines);
    return changeGridDiv;
  }

  renderTopPanel() {
    const topPanelDiv = this.elFactory('div', { class: 'top-panel' });
    const sortingPicker = this.renderSortingPicker();
    const changeGrid = this.renderChangeGrid();

    topPanelDiv.append(sortingPicker);
    topPanelDiv.append(changeGrid);

    return topPanelDiv;
  }

  render() {
    const topPanel = this.renderTopPanel();

    this.container.append(topPanel);

    return this.container;
  }
}
