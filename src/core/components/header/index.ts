import Component from '../../templates/components';

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
        { class: 'header-logo-link', href: '' },
        this.elFactory('img', {
          class: 'header-logo-img',
          src: './assets/images/icons/logo.svg',
          alt: 'logo',
        }),
      ),
    );
    return logoDiv;
  }
  createCart() {
    const itemsCountSpan = this.elFactory('span', {
      class: 'header-cart-items-count-value',
    });
    itemsCountSpan.textContent = '0';

    const cartDiv = this.elFactory(
      'div',
      { class: 'header-cart' },
      this.elFactory('img', {
        class: 'header-cart-img',
        src: './assets/images/icons/cart.svg',
        alt: 'cart',
      }),
      this.elFactory(
        'div',
        { class: 'header-cart-items-count' },
        itemsCountSpan,
      ),
    );

    return cartDiv;
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
      searchInput.value != ''
        ? clearBtn.classList.add('visible')
        : clearBtn.classList.remove('visible');
    });
    clearBtn.addEventListener('mousedown', e => {
      searchInput.value = '';
      clearBtn.classList.remove('visible');
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
    const cart = this.createCart();
    const searchBar = this.createHeaderSearch();
    headerWrapper.append(logo);
    headerWrapper.append(searchBar);
    headerWrapper.append(cart);
    this.container.append(headerWrapper);
  }

  render() {
    this.renderHeaderWrapper();
    return this.container;
  }
}