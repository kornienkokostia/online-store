import Component from '../../templates/components';
import Filtration from '../filtration/filtration';
import App from '../../../pages/app/index';

export default class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  createHeaderLogo() {
    const logoDiv = this.elFactory(
      'div',
      { class: 'header-logo' },
      this.elFactory(
        'a',
        { class: 'header-logo-link', href: '#main' },
        this.elFactory('img', {
          class: 'header-logo-img',
          src: './assets/images/icons/logo.svg',
          alt: 'logo',
        }),
      ),
    );

    logoDiv.addEventListener('click', () => {      
      setTimeout(() => {
        Filtration.resetAll();
      }, 1)
    })

    return logoDiv;
  }
  createBag() {
    const itemsCountSpan = this.elFactory('span', {
      class: 'header-bag-items-count-value',
    });
    itemsCountSpan.textContent = '';

    const bagDiv = this.elFactory(
      'a',
      { class: 'header-bag', href: './#bag'},
      this.elFactory('img', {
        class: 'header-bag-img',
        src: './assets/images/icons/bag.svg',
        alt: 'bag',
      }),
      this.elFactory(
        'div',
        { class: 'header-bag-items-count' },
        itemsCountSpan,
      ),
    );
    
    return bagDiv;
  }
  createHeaderSearch() {
    const searchDiv = this.elFactory('div', { class: 'header-search' });

    const searchInput = this.elFactory('input', {
      class: 'header-search-input',
      type: 'text',
      placeholder: 'Search',
    });

    const searchImg = this.elFactory('img', {
      class: 'header-search-input-img',
      src: './assets/images/icons/input-search.svg',
      alt: 'input-search',
    });

    const clearBtn = this.elFactory(
      'button',
      { class: 'header-search-input-clear-btn' },
      this.elFactory('img', {
        class: 'header-search-input-clear-img',
        src: './assets/images/icons/input-clear.svg',
        alt: 'input-clear',
      }),
    );

    searchInput.addEventListener('focus', () => {
      searchInput.value != '' ? clearBtn.classList.add('visible') : false;
    });
    searchInput.addEventListener('input', () => {

      const search = `${searchInput.value}`
      Filtration.filterByBrand('search', search)
      
      searchInput.value != ''
        ? clearBtn.classList.add('visible')
        : clearBtn.classList.remove('visible');
    });
    clearBtn.addEventListener('mousedown', e => {
      searchInput.value = '';
      Filtration.searched(searchInput.value)  
      clearBtn.classList.remove('visible');
      Filtration.filterByBrand('search', '');
      e.preventDefault();
    });
    searchInput.addEventListener('focusout', () => {
      clearBtn.classList.remove('visible');
    });

    searchDiv.append(searchImg);
    searchDiv.append(searchInput);
    searchDiv.append(clearBtn);
    return searchDiv;
  }

  renderHeaderWrapper() {
    const headerWrapper = this.elFactory('div', { class: 'header' });
    const logo = this.createHeaderLogo();
    const bag = this.createBag();
    const searchBar = this.createHeaderSearch();
    headerWrapper.append(logo);
    headerWrapper.append(searchBar);
    headerWrapper.append(bag);
    this.container.append(headerWrapper);
  }

  render() {
    this.renderHeaderWrapper();

    return this.container;
  }
}