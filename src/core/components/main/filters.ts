import Component from '../../templates/components';

export default class Filters extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderResetButtons(){
    const resetButtonsDiv = this.elFactory('div', {class: 'resetButtons'})

    return resetButtonsDiv
  }
  
  renderFilters(){
    const filtersDiv = this.elFactory('div', {class: 'filters'})
    const resetButtons = this.renderResetButtons()

    filtersDiv.append(resetButtons)

    return filtersDiv
  }
  
  render() {
    const filters = this.renderFilters();

    this.container.append(filters)

    return this.container;
  }
}