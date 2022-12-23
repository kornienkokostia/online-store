import Component from '../../templates/components';

const FiltersOptionsCategory = ['smartphones', 'watches', 'headphones', 'tablets', 'laptops' ];
const FiltersOptionsBrand = ['apple', 'xiaomi', 'samsung', 'asus' ];

export default class Filters extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderFiltersButtons(){
    const filtersButtonsDiv = this.elFactory('div', {class: 'filters-buttons'})

    const resetFiltersButton = this.elFactory('button', {class: 'filters-btn reset-filters-btn'})
    resetFiltersButton.textContent = 'Reset filters'

    const copyLinkButton = this.elFactory('button', {class: 'filters-btn copy-link-btn'})
    copyLinkButton.textContent = 'Copy link'

    filtersButtonsDiv.append(resetFiltersButton)
    filtersButtonsDiv.append(copyLinkButton)

    return filtersButtonsDiv
  }

  renderFilterOption(item: string){
    const filterOption = this.elFactory('div', {class: 'filters-item-option'})

    const filterOptionCheckbox = this.elFactory('div', {class: 'filters-item-option-checkbox', 
      category: item, checked: false}, 
        this.elFactory('img', {class: 'filters-item-option-checkbox-img', 
          src: './assets/images/icons/selected-item.svg'}))
    
    const filterOptionName = this.elFactory('span', {class: 'filters-item-option-name'})
    filterOptionName.textContent = item.charAt(0).toUpperCase() + item.slice(1)

    filterOption.addEventListener('click', () => {
      filterOptionCheckbox.classList.toggle('active')
      filterOptionCheckbox.getAttribute('checked') === '' ? 
        filterOptionCheckbox.setAttribute('checked', 'false') : 
          filterOptionCheckbox.setAttribute('checked', '')
    })

    filterOption.append(filterOptionCheckbox)
    filterOption.append(filterOptionName)

    return filterOption
  }

  renderOptionHeader(title: string, filterDiv: HTMLDivElement){
    const filterHeader = this.elFactory('div', {class: 'filters-item-header'})
    const filterTitle = this.elFactory('span', {class: 'filters-item-header-title'})
    filterTitle.textContent = title

    const filterExpandBtn = this.elFactory('button', {class: 'filters-item-header-expand-btn'}, 
      this.elFactory('img', {class: 'filters-item-header-expand-btn-img', 
        src: './assets/images/icons/filter-expand-btn.svg', alt: 'filter-expand-btn'}))
    filterExpandBtn.addEventListener('click', () => {
      filterDiv.classList.toggle('active')
      filterExpandBtn.classList.toggle('active')
    })

    filterHeader.append(filterTitle)
    filterHeader.append(filterExpandBtn)

    return filterHeader
  }

  renderFiltersItems(){
    const filtersDiv = this.elFactory('div', {class: 'filters-items'})
    
    // category
    const filterCategory = this.elFactory('div', {class: 'filters-item filters-item-category active'})
    const filterCategoryHeader = this.renderOptionHeader('Category', filterCategory)
    const filterCategoryOptions = this.elFactory('div', {class: 'filters-item-options'})
    FiltersOptionsCategory.map(el => {
      const filterOption = this.renderFilterOption(el)
      filterCategoryOptions.append(filterOption)
    })
    filterCategory.append(filterCategoryHeader)
    filterCategory.append(filterCategoryOptions)
    
    // brand
    const filterBrand = this.elFactory('div', {class: 'filters-item filters-item-brand active'})
    const filterBrandHeader = this.renderOptionHeader('Brand', filterBrand)
    const filterBrandOptions = this.elFactory('div', {class: 'filters-item-options'})
    FiltersOptionsBrand.map(el => {
      const filterOption = this.renderFilterOption(el)
      filterBrandOptions.append(filterOption)
    })
    filterBrand.append(filterBrandHeader)
    filterBrand.append(filterBrandOptions)

    // prive
    const filterPrice = this.elFactory('div', {class: 'filters-item filters-item-price active'})
    const filterPriceHeader = this.renderOptionHeader('Price', filterPrice)
    const filterPriceOptions = this.elFactory('div', {class: 'filters-item-options'})
    
    

    

    filterPrice.append(filterPriceHeader)
    filterPrice.append(filterPriceOptions)

    // stock
    const filterStock = this.elFactory('div', {class: 'filters-item filters-item-stock active'})
    const filterStockHeader = this.renderOptionHeader('Stock', filterStock)
    const filterStockOptions = this.elFactory('div', {class: 'filters-item-options'})
    
    filterStock.append(filterStockHeader)
    filterStock.append(filterStockOptions)


    filtersDiv.append(filterCategory)
    filtersDiv.append(filterBrand)
    filtersDiv.append(filterPrice)
    filtersDiv.append(filterStock)
    return filtersDiv
  }
  
  renderFilters(){
    const filtersDiv = this.elFactory('div', {class: 'filters'})
    const filtersButtons = this.renderFiltersButtons()
    const filtersItems = this.renderFiltersItems()

    filtersDiv.append(filtersButtons)
    filtersDiv.append(filtersItems)

    return filtersDiv
  }
  
  render() {
    const filters = this.renderFilters();

    this.container.append(filters)

    return this.container;
  }
}