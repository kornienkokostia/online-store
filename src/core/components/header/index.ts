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

  createMenuBtn(){
    const headerMenuBtnWrapper = this.elFactory('div', {class: 'header-menu-btn-block-wrapper'}) 
    const headerMenuBtn = this.elFactory('div', {class: 'header-menu-btn-block'})

    const headerMenuTopWrapper = this.elFactory('span', {class: 'header-menu-btn-top-wrapper header-menu-btn-wrapper'})
    const headerMenuTop = this.elFactory('span', {class: 'header-menu-btn-top header-menu-btn'})
    headerMenuTopWrapper.append(headerMenuTop)

    const headerMenuBottomWrapper = this.elFactory('span', {class: 'header-menu-btn-bottom-wrapper header-menu-btn-wrapper'})
    const headerMenuBottom = this.elFactory('span', {class: 'header-menu-btn-bottom header-menu-btn'})
    headerMenuBottomWrapper.append(headerMenuBottom)

    headerMenuBtn.append(headerMenuTopWrapper, headerMenuBottomWrapper)

    headerMenuBtnWrapper.append(headerMenuBtn)

    headerMenuBtnWrapper.addEventListener('click', () => {
      headerMenuBtnWrapper.classList.toggle('mobile-menu-open')
      document.querySelector('.header-mobile-bg')?.classList.toggle('active')
      document.body.classList.toggle('mobile-menu-open')
      document.querySelector('.filters-wrapper')?.classList.toggle('mobile-menu-open')
    })

    window.addEventListener('resize', () => {
      
    })

    return headerMenuBtnWrapper
  }

  renderHeaderWrapper() {
    const mobileBtn = this.createMenuBtn()
    const headerWrapper = this.elFactory('div', { class: 'header' });
    const logo = this.createHeaderLogo();
    const bag = this.createBag();
    const searchBar = this.createHeaderSearch();
    const headerMobileBg = this.elFactory('div', {class: 'header-mobile-bg'})
    headerWrapper.append(mobileBtn)
    headerWrapper.append(logo);
    headerWrapper.append(searchBar);
    headerWrapper.append(bag);
    headerWrapper.append(headerMobileBg)
    this.container.append(headerWrapper);
  }

  render() {
    this.renderHeaderWrapper();

    return this.container;
  }
}