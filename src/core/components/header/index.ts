import Component from '../../templates/components';

class Header extends Component {

    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    createHeaderLogo() {
        const logoDiv = document.createElement('div')
        logoDiv.classList.add('header-logo')
        const logoLink = document.createElement('a')
        logoLink.href = ''
        logoLink.classList.add('header-logo-link')
        const logoImg = document.createElement('img')
        logoImg.src = './assets/images/icons/logo.svg'
        logoImg.alt = 'logo'
        logoImg.classList.add('header-logo-img')
        logoLink.append(logoImg)
        logoDiv.append(logoLink)
        return logoDiv
    }
    createCart() {
        const cartDiv = document.createElement('div')
        cartDiv.classList.add('header-cart')
        const cartImg = document.createElement('img')
        cartImg.src = './assets/images/icons/cart.svg'
        cartImg.alt = 'cart'
        cartImg.classList.add('header-cart-img')
        const cartItemsCount = document.createElement('div')
        cartItemsCount.classList.add('header-cart-items-count')
        const cartItemsCountSpan = document.createElement('span')
        cartItemsCountSpan.classList.add('header-cart-items-count-value')
        cartItemsCountSpan.innerHTML = '0'
        cartItemsCount.append(cartItemsCountSpan)
        cartDiv.append(cartItemsCount)
        cartDiv.append(cartImg)
        return cartDiv
    }
    createHeaderSearch() {
        const searchDiv = document.createElement('div')
        searchDiv.classList.add('header-search')

        const searchInput = document.createElement('input')
        searchInput.type = 'text'
        searchInput.classList.add('header-search-input')
        searchInput.placeholder = 'Search'
       

        const searchImg = document.createElement('img')
        searchImg.src = './assets/images/icons/input-search.svg'
        searchImg.alt = 'input-search'
        searchImg.classList.add('header-search-input-img')

        const clearBtn = document.createElement('button')
        clearBtn.classList.add('header-search-input-clear-btn') 
        searchInput.addEventListener('focus', () => {
            searchInput.value != '' ? 
            clearBtn.classList.add('header-search-input-clear-btn-visible') : false
        })
        searchInput.addEventListener('input', () => {
            searchInput.value != '' ?
            clearBtn.classList.add('header-search-input-clear-btn-visible') : 
            clearBtn.classList.remove('header-search-input-clear-btn-visible')
        })
        clearBtn.addEventListener('mousedown', (e) => {
            searchInput.value = ''
            clearBtn.classList.remove('header-search-input-clear-btn-visible')
            e.preventDefault();
        })
        searchInput.addEventListener('focusout', () => {
            clearBtn.classList.remove('header-search-input-clear-btn-visible')
        })

        const clearImg = document.createElement('img')
        clearImg.src = './assets/images/icons/input-clear.svg'
        clearImg.alt = 'input-clear'
        clearImg.classList.add('header-search-input-clear-img')

        clearBtn.append(clearImg)
        searchDiv.append(searchImg)
        searchDiv.append(searchInput)
        searchDiv.append(clearBtn)
        return searchDiv
    }

    renderHeaderWrapper() {
        const headerWrapper = document.createElement('div');
        headerWrapper.classList.add('header-wrapper')
        const logo = this.createHeaderLogo()
        const cart = this.createCart()
        const searchBar = this.createHeaderSearch()
        headerWrapper.append(logo)
        headerWrapper.append(searchBar)
        headerWrapper.append(cart)
        this.container.append(headerWrapper);
    }

    render () {
        this.renderHeaderWrapper()
        return this.container;
    }

}

export default Header;