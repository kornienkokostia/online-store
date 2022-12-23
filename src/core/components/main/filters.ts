import Component from '../../templates/components';

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

  renderFiltersItems(){
    const filtersDiv = this.elFactory('div', {class: 'filters-items'})
    
    const filterCategory = this.elFactory('div', {class: 'filters-item filters-item-category active'})

    const filterHeader = this.elFactory('div', {class: 'filters-item-header'})
    const filterTitle = this.elFactory('span', {class: 'filters-item-header-title'})
    filterTitle.textContent = 'Category'

    const filterExpandBtn = this.elFactory('button', {class: 'filters-item-header-expand-btn'}, 
      this.elFactory('img', {class: 'filters-item-header-expand-btn-img', 
        src: './assets/images/icons/filter-expand-btn.svg', alt: 'filter-expand-btn'}))
    filterExpandBtn.addEventListener('click', () => {
      filterCategory.classList.toggle('active')
      filterExpandBtn.classList.toggle('active')
    })    

    filterHeader.append(filterTitle)
    filterHeader.append(filterExpandBtn)

    filterCategory.append(filterHeader)

    filtersDiv.append(filterCategory)
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