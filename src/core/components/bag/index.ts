import BagItem from 'models/bagItem';
import Component from '../../templates/components';
import productDB from '../../../db/productDB';
import AppState from '../save-goods-state/index';
;

export default class Bag extends Component {
  private totalPrice = '0'

  static bagItems: BagItem[] = AppState.getGoodsInBag()

  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  convertStringWithCommasToDefault = (str: string) => str.replace(/,/g,'')

  convertNumToSplitString = (str: string) => str.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")

  disableScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    document.querySelector('html')!.style.scrollBehavior = 'auto'
    window.onscroll = function() {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  enableScroll() {
    document.querySelector('html')!.style.scrollBehavior = 'smooth'
    window.onscroll = function() {};
  }

  static updateBagCount(){
    document.querySelector('.header-bag-items-count')?.classList.remove('two-num')
    document.querySelector('.header-bag-items-count')?.classList.remove('two-num-plus')
    document.querySelector('.header-bag-img')?.classList.remove('two-num')
    document.querySelector('.header-bag-img')?.classList.remove('two-num-plus')

    const totalCount = Bag.bagItems.reduce((partialSum, a) => partialSum + +a.count, 0)
    if (Bag.bagItems.length !== 0) {
      document.querySelector('.header-bag-items-count')?.classList.add('active')
      document.querySelector('.header-bag-img')?.classList.add('active')
    } else {
      document.querySelector('.header-bag-items-count')?.classList.remove('active')
      document.querySelector('.header-bag-img')?.classList.remove('active')
    }

    const bagCount = document.querySelector('.header-bag-items-count-value') as HTMLElement
    bagCount.textContent = `${totalCount}`

    if (totalCount > 9) {
      document.querySelector('.header-bag-items-count')?.classList.add('two-num')
      document.querySelector('.header-bag-img')?.classList.add('two-num')
    }
    if (totalCount > 99) {
      document.querySelector('.header-bag-items-count')?.classList.add('two-num-plus')
      document.querySelector('.header-bag-img')?.classList.add('two-num-plus')
      bagCount.textContent = `99`
    }   
  }

  createBagHeader(){
    const bagHeaderDiv = this.elFactory('div', {class: 'bag-header'})
    const bagHeaderTitle = this.elFactory('h1', {class: 'bag-header-title'})
    bagHeaderTitle.textContent = 'Your bag is empty.'
    
    const bagHeaderSubTitle = this.elFactory('p', {class: 'bag-header-subtitle'})
    bagHeaderSubTitle.textContent = 'Free delivery and free returns.'
    const continueShoppingLink = this.elFactory('a', {class: 'bag-btn-continue-shopping-link', 
      href: './#main'})
    continueShoppingLink.textContent = 'Continue Shopping'
    const continueShoppingBtn = this.elFactory('button', {class: 'bag-btn bag-btn-continue-shopping'},
      continueShoppingLink)
    continueShoppingBtn.addEventListener('click', () => {
      window.location.hash='main';
    })

    bagHeaderDiv.append(bagHeaderTitle)
    bagHeaderDiv.append(bagHeaderSubTitle)
    bagHeaderDiv.append(continueShoppingBtn)

    return bagHeaderDiv
  }

  createBadTotal(){
    const bagTotalDiv = this.elFactory('div', {class: 'bag-total'})

    if (Bag.bagItems.length !== 0) {
      bagTotalDiv.classList.add('active')
    }

    const bagTotalSummary = this.elFactory('div', {class: 'bag-total-summary'})
    const bagTotalSummaryTitle = this.elFactory('span', {class: 'bag-total-summaty-title'})
    bagTotalSummaryTitle.textContent = 'Total'
    
    const bagTotalSummaryValue = this.elFactory('span', {class: 'bag-total-summaty-value'})
    bagTotalSummaryValue.textContent = this.convertNumToSplitString(this.totalPrice)
    const bagTotalSummaryValueCurrancy = this.elFactory('span', {class: 'bag-total-summaty-value-currancy'})
    bagTotalSummaryValueCurrancy.textContent = '$'
    
    const bagTotalSummaryValueWrapper = this.elFactory('div', {class: 'bag-total-summaty-value-wrapper'},
      bagTotalSummaryValueCurrancy, bagTotalSummaryValue)

    bagTotalSummary.append(bagTotalSummaryTitle)
    bagTotalSummary.append(bagTotalSummaryValueWrapper)

    const checkOutBtn = this.elFactory('button', {class: 'bag-btn bag-btn-check-out'})
    checkOutBtn.textContent = 'Check Out'

    checkOutBtn.addEventListener('click', () => {
      document.querySelector('.checkout-window')?.classList.add('active')
      document.querySelector('.dark-bg')?.classList.add('active')
      this.disableScroll()
      
    
    })

    bagTotalDiv.append(bagTotalSummary)
    bagTotalDiv.append(checkOutBtn)

    return bagTotalDiv
  }

  createBagItem(itemId: number){
    const currentDBItem = productDB.filter(el => +el.id === itemId)[0]
  
    const bagItemDiv = this.elFactory('div', {class: 'bag-item', 'good-id': currentDBItem.id})
    const bagItemImgDiv = this.elFactory('div', {class: 'bag-item-img'})
    const bagItemImg = this.elFactory('img', {class: 'img', src: currentDBItem.imgs[0], alt: 'bag-item-img'})
    bagItemImg.ondragstart = () => false
    bagItemImgDiv.append(bagItemImg)

    
    const bagItemName = this.elFactory('a', {class: 'bag-item-name', href: `./#product&id=${currentDBItem.id}`})
    bagItemName.textContent = this.setGoodsItemName(currentDBItem)
    const bagItemNameWrapper = this.elFactory('div', {class: 'bag-item-name-wrapper'}, bagItemName)
    
    const bagItemQuantity = this.elFactory('div', {class: 'bag-item-quantity'})

    const bagItemQuantityMinusImg = this.elFactory('img', {class: 'bag-item-quantity-btn-img', 
      src: './assets/images/icons/bag-item-quantity-minus.svg', alt: 'bag-item-quantity-minus-img'})
    bagItemQuantityMinusImg.ondragstart = () => false
    const bagItemQuantityMinus = this.elFactory('button', {class: 'bag-item-quantity-btn bag-item-quantity-minus'},
      bagItemQuantityMinusImg)
    
    const bagItemQuantityPlusImg =  this.elFactory('img', {class: 'bag-item-quantity-btn-img', 
        src: './assets/images/icons/bag-item-quantity-plus.svg', alt: 'bag-item-quantity-plus-img'})
    bagItemQuantityPlusImg.ondragstart = () => false
    const bagItemQuantityPlus = this.elFactory('button', {class: 'bag-item-quantity-btn bag-item-quantity-plus'},
      bagItemQuantityPlusImg)

    const bagItemQuantityInput = this.elFactory('input', {class: 'bag-item-quantity-input', 
      type: 'number', min: '1', oninput: `validity.valid||(value='')`}) 
    bagItemQuantityInput.value = `${Bag.bagItems.filter(el => +el.id === itemId)[0].count}`
    
    
    const updateItemPrice = () => {
      const curPrice = +this.convertStringWithCommasToDefault(currentDBItem.price) * +bagItemQuantityInput.value
      bagItemPriceValue.textContent = this.convertNumToSplitString(`${curPrice}`)
    }

    const updateTotalPrice = () => {
      const allPriseVal = [...document.querySelectorAll('.bag-item-price-value')]
        .map(el => this.convertStringWithCommasToDefault(`${el.textContent}`))
        .reduce((partialSum, a) => partialSum + +a, 0)
      this.totalPrice = `${allPriseVal}`
      const totalPriceEl = document.querySelector('.bag-total-summaty-value') as HTMLElement
      totalPriceEl.textContent = this.convertNumToSplitString(this.totalPrice)
      document.querySelector('.checkout-header-total-value')!.textContent = this.convertNumToSplitString(this.totalPrice)
    }

    const updateBagTitle = () => {
      const bagTitle = document.querySelector('.bag-header-title') as HTMLElement
      if (Bag.bagItems.length !== 0) {
        bagTitle.textContent = `Your bag total is $ 
        ${this.convertNumToSplitString(this.totalPrice)}.`
      } else {
        bagTitle.textContent = `Your bag is empty.`
      }
    }

    const updateAllInfo = () => {
      updateItemPrice()
        updateTotalPrice()
        updateBagTitle()
        Bag.updateBagCount()
        AppState.setGoodsInBag(Bag.bagItems)
    }
    
    bagItemQuantityMinus.addEventListener('mouseup', () => {
      if (+bagItemQuantityInput.value > 1) {
        const valMinus = +bagItemQuantityInput.value - 1
        bagItemQuantityInput.value = `${valMinus}`
        Bag.bagItems.map(x => x.id === itemId ? x.count = valMinus : false);
        bagItemQuantity.classList.remove('max-stock')
        updateAllInfo()
      }
    })  

    bagItemQuantityPlus.addEventListener('mouseup', () => {
      if (+bagItemQuantityInput.value < +currentDBItem.stock) {
        const valPlus = +bagItemQuantityInput.value + 1
        bagItemQuantityInput.value = `${valPlus}`
        Bag.bagItems.map(x => x.id === itemId ? x.count = valPlus : false);
        updateAllInfo()
      } else {
        bagItemQuantity.classList.add('max-stock')
      }
    })  

    bagItemQuantityInput.addEventListener('input', () => {
      if (+bagItemQuantityInput.value > 3) {
        bagItemQuantityInput.value = bagItemQuantityInput.value.slice(0, 3)
      }
      let inputVal = bagItemQuantityInput.value
      if (+bagItemQuantityInput.value > +currentDBItem.stock) {
        inputVal = `${currentDBItem.stock}`
        bagItemQuantityInput.value = inputVal
        bagItemQuantity.classList.add('max-stock')
      }
      if (+bagItemQuantityInput.value < +currentDBItem.stock) {
        bagItemQuantity.classList.remove('max-stock')
      }
      if (+inputVal >= 0 && inputVal !== '') {
        Bag.bagItems.map(x => x.id === itemId ? x.count = +inputVal : false);
        updateAllInfo()
      }
    })
    bagItemQuantityInput.addEventListener('blur', () => {
      if (bagItemQuantityInput.value === '') {
        bagItemQuantityInput.value = '1'
        Bag.bagItems.map(x => x.id === itemId ? x.count = +bagItemQuantityInput.value : false);
        updateAllInfo()
      }
    })
    
    bagItemQuantity.append(bagItemQuantityMinus)
    bagItemQuantity.append(bagItemQuantityInput)
    bagItemQuantity.append(bagItemQuantityPlus)
       
    const bagItemPriceDetails = this.elFactory('div', {class: 'bag-item-price-details'})

    const bagItemPriceValue = this.elFactory('span', {class: 'bag-item-price-value'})
    bagItemPriceValue.textContent = this.convertNumToSplitString(`${+this.convertStringWithCommasToDefault(currentDBItem.price) * 
      +bagItemQuantityInput.value}`) 

    const bagItemPriceCurrancy = this.elFactory('span', {class: 'bag-item-price-value-currancy'})
    bagItemPriceCurrancy.textContent = '$'
    
    const bagItemPriceValueWrapper = this.elFactory('div', {class: 'bag-item-price-value-wrapper'},
      bagItemPriceCurrancy, bagItemPriceValue)

    const bagItemRemoveBtn = this.elFactory('button', {class: 'bag-item-remove-btn'})
    bagItemRemoveBtn.textContent = 'Remove'

    bagItemRemoveBtn.addEventListener('click', () => {
      const closestItem = bagItemRemoveBtn.closest('.bag-item') as HTMLElement
      closestItem.classList.add('hidden');
      
      setTimeout(() => {
        [...document.querySelectorAll('.bag-item')].map(el => el.classList.add('move'))
        document.querySelector('.bag-total')!.classList.add('move')
      }, 500);
      setTimeout(() => {
        document.querySelector('.bag-goods')?.removeChild(closestItem);
        [...document.querySelectorAll('.bag-item')].map(el => el.classList.remove('move'))
        document.querySelector('.bag-total')!.classList.remove('move')
        updateAllInfo()
      }, 1000);
      
      
      const itemId = closestItem.getAttribute('good-id')
      Bag.bagItems.map(el => el.id === +itemId! ? Bag.bagItems.splice(Bag.bagItems.indexOf(el), 1) : false)
      
      if (Bag.bagItems.length === 0) {
        setTimeout(() => {
          document.querySelector('.bag-total')!.classList.add('hide')
        }, 500)
        
        setTimeout(() => {
          document.querySelector('.bag-total')!.classList.remove('active')
          document.querySelector('.bag-total')!.classList.remove('hide')
        }, 1000)
        
        document.querySelector('.header-bag-items-count')?.classList.remove('active')
        document.querySelector('.header-bag-img')?.classList.remove('active')
      }
    })

    bagItemPriceDetails.append(bagItemPriceValueWrapper)
    bagItemPriceDetails.append(bagItemRemoveBtn)

    bagItemDiv.append(bagItemImgDiv)
    bagItemDiv.append(bagItemNameWrapper)
    bagItemDiv.append(bagItemQuantity)
    bagItemDiv.append(bagItemPriceDetails)

    this.totalPrice = `${+this.totalPrice + 
      +this.convertStringWithCommasToDefault(this.convertStringWithCommasToDefault(
        bagItemPriceValue.textContent))}`

    return bagItemDiv
  }

  closeCheckoutWindow(){
    document.querySelector('.checkout-window')?.classList.remove('active')
    document.querySelector('.dark-bg')?.classList.remove('active')
    this.enableScroll()
  }

  

  createCheckoutWindow(){
    const checkAllFields = () => {
    
    }
    let formValidation = true

    const checkout = this.elFactory('div', {class: 'checkout-window'})

    const checkoutHeader = this.elFactory('div', {class: 'checkout-header'})

    const checkoutHeaderCloseBtn = this.elFactory('button', {class: 'checkout-header-close-btn'})
    const checkoutHeaderCloseBtnImg = this.elFactory('img', {class: 'checkout-header-close-btn-img', 
      src: './assets/images/icons/checkout-close-btn.svg', alt: 'checkout-header-close-btn-img'})
    checkoutHeaderCloseBtnImg.ondragstart = () => false
    checkoutHeaderCloseBtn.append(checkoutHeaderCloseBtnImg) 

    checkoutHeaderCloseBtn.addEventListener('click', () => {
      this.closeCheckoutWindow()
    })
    
    const checkoutHeaderTitle = this.elFactory('h2', {class: 'checkout-header-title'})
    checkoutHeaderTitle.textContent = 'Checkout'
    
    const checkoutHeaderTotal = this.elFactory('div', {class: 'checkout-header-total'})
    checkoutHeaderTotal.textContent = 'Order Summary: $'
    const checkoutHeaderTotalSpan = this.elFactory('span', {class: 'checkout-header-total-value'})
    checkoutHeaderTotalSpan.textContent = `${this.convertNumToSplitString(this.totalPrice)}`

    checkoutHeaderTotal.append(checkoutHeaderTotalSpan)

    checkoutHeader.append(checkoutHeaderCloseBtn, checkoutHeaderTitle, checkoutHeaderTotal)
    
    // error img
    const renderErrorImg = () => {
      const renderErrorImg = this.elFactory('img', {class: 'checkout-info-field-error-img', 
      src: './assets/images/icons/error.svg', alt: 'checkout-info-field-error-img'})
      renderErrorImg.ondragstart = () => false
      return renderErrorImg
    }
    const addErrorClass = (title: HTMLSpanElement, input: HTMLInputElement, error: HTMLDivElement) => {
      title.classList.add('error')
      input.classList.add('error')
      error.classList.add('active')
    }

    const checkoutInfo = this.elFactory('div', {class: 'checkout-info'})

    const checkoutInfoTitle = this.elFactory('div', {class: 'checkout-info-title'})
    checkoutInfoTitle.textContent = 'Where should we send your order?'

    // name adress block
    const checkoutInfoNameAddress = this.elFactory('div', {class: 'checkout-info-item'})

    const checkoutInfoNameAddressTitle = this.elFactory('p', {class: 'checkout-info-item-title'})
    checkoutInfoNameAddressTitle.textContent = 'Enter your name and address:'

    checkoutInfoNameAddress.append(checkoutInfoNameAddressTitle)

    // First name
    const checkoutInfoFirstName = this.elFactory('div', {class: 'checkout-info-field'})
    const checkoutInfoFirstNameInput = this.elFactory('input', {class: 'checkout-info-field-input first-name-input', 
      type: 'text', title: 'Please fill out this field.'})
    const checkoutInfoFirstNameTitle = this.elFactory('span', {class: 'checkout-info-field-input-name'})
    checkoutInfoFirstNameTitle.textContent = 'First Name'

    const checkoutInfoFirstNameError = this.elFactory('div', {class: 'checkout-info-field-error'})
    const checkoutInfoFirstNameErrorText = this.elFactory('span', {class: 'checkout-info-field-error-msg'})
    checkoutInfoFirstNameErrorText.textContent = 'Please enter a valid first name (>2 characters).'

    checkoutInfoFirstNameError.append(renderErrorImg(), checkoutInfoFirstNameErrorText)

    checkoutInfoFirstNameInput.addEventListener('focus', () => {
      checkoutInfoFirstNameTitle.classList.add('active')
      checkoutInfoFirstNameInput.classList.remove('error')
    })
    checkoutInfoFirstNameInput.addEventListener('focusout', () => {
      formValidation = true
      if (checkoutInfoFirstNameInput.value.length === 0) {
        formValidation = false
        checkoutInfoFirstNameTitle.classList.remove('active')
        addErrorClass(checkoutInfoFirstNameTitle, checkoutInfoFirstNameInput, checkoutInfoFirstNameError)
      }
      if (checkoutInfoFirstNameInput.value.length < 3 && checkoutInfoFirstNameInput.value.length !== 0) {
        formValidation = false
        addErrorClass(checkoutInfoFirstNameTitle, checkoutInfoFirstNameInput, checkoutInfoFirstNameError)
      }
    })
    checkoutInfoFirstNameInput.addEventListener('input', () => {
      checkoutInfoFirstNameTitle.classList.remove('error')
      checkoutInfoFirstNameError.classList.remove('active')
      checkoutInfoFirstNameInput.value.length !== 0 ? checkoutInfoFirstNameInput.removeAttribute('title') :
        checkoutInfoFirstNameInput.setAttribute('title', 'Please fill out this field.')
    })

    checkoutInfoFirstName.append(checkoutInfoFirstNameInput, checkoutInfoFirstNameTitle, checkoutInfoFirstNameError)

    // Last name
    const checkoutInfoLastName = this.elFactory('div', {class: 'checkout-info-field'})
    const checkoutInfoLastNameInput = this.elFactory('input', {class: 'checkout-info-field-input last-name-input', 
      type: 'text', title: 'Please fill out this field.'})
    const checkoutInfoLastNameTitle = this.elFactory('span', {class: 'checkout-info-field-input-name'})
    checkoutInfoLastNameTitle.textContent = 'Last Name'

    const checkoutInfoLastNameError = this.elFactory('div', {class: 'checkout-info-field-error'})
    const checkoutInfoLastNameErrorText = this.elFactory('span', {class: 'checkout-info-field-error-msg'})
    checkoutInfoLastNameErrorText.textContent = 'Please enter a valid last name (>2 characters).'
    checkoutInfoLastNameError.append(renderErrorImg(), checkoutInfoLastNameErrorText)

    checkoutInfoLastNameInput.addEventListener('focus', () => {
      checkoutInfoLastNameTitle.classList.add('active')
      checkoutInfoLastNameInput.classList.remove('error')
    })
    checkoutInfoLastNameInput.addEventListener('focusout', () => {
      formValidation = true
      if (checkoutInfoLastNameInput.value.length === 0) {
        formValidation = false
        checkoutInfoLastNameTitle.classList.remove('active')
        addErrorClass(checkoutInfoLastNameTitle, checkoutInfoLastNameInput, checkoutInfoLastNameError)
      }
      if (checkoutInfoLastNameInput.value.length < 3 && checkoutInfoLastNameInput.value.length !== 0) {
        formValidation = false
        addErrorClass(checkoutInfoLastNameTitle, checkoutInfoLastNameInput, checkoutInfoLastNameError)
      }
    })
    checkoutInfoLastNameInput.addEventListener('input', () => {
      checkoutInfoLastNameTitle.classList.remove('error')
      checkoutInfoLastNameError.classList.remove('active')
      checkoutInfoLastNameInput.value.length !== 0 ? checkoutInfoLastNameInput.removeAttribute('title') :
        checkoutInfoLastNameInput.setAttribute('title', 'Please fill out this field.')
    })

    checkoutInfoLastName.append(checkoutInfoLastNameInput, checkoutInfoLastNameTitle, checkoutInfoLastNameError)

    // Address
    const checkoutInfoAddress = this.elFactory('div', {class: 'checkout-info-field'})
    const checkoutInfoAddressInput = this.elFactory('input', {class: 'checkout-info-field-input address-input', 
      type: 'text', title: 'Please fill out this field.'})
    const checkoutInfoAddressTitle = this.elFactory('span', {class: 'checkout-info-field-input-name'})
    checkoutInfoAddressTitle.textContent = 'Address'

    const checkoutInfoAddressError = this.elFactory('div', {class: 'checkout-info-field-error'})
    const checkoutInfoAddressErrorText = this.elFactory('span', {class: 'checkout-info-field-error-msg'})
    checkoutInfoAddressErrorText.textContent = 'Please enter a valid address (>2 words, each >4 characters).'
    checkoutInfoAddressError.append(renderErrorImg(), checkoutInfoAddressErrorText)

    checkoutInfoAddressInput.addEventListener('focus', () => {
      checkoutInfoAddressTitle.classList.add('active')
      checkoutInfoAddressInput.classList.remove('error')
    })
    checkoutInfoAddressInput.addEventListener('focusout', () => {
      formValidation = true
      if (checkoutInfoAddressInput.value.length === 0) {
        formValidation = false
        checkoutInfoAddressTitle.classList.remove('active')
        addErrorClass(checkoutInfoAddressTitle, checkoutInfoAddressInput, checkoutInfoAddressError)
      }
      const inputArr = checkoutInfoAddressInput.value.trim().split(' ')
  
      if (checkoutInfoAddressInput.value.length !== 0 && (inputArr.length < 3 || 
        inputArr.filter(el => el.length < 5).length !== 0)) {
        formValidation = false
        addErrorClass(checkoutInfoAddressTitle, checkoutInfoAddressInput, checkoutInfoAddressError)
      }
    })
    checkoutInfoAddressInput.addEventListener('input', () => {
      checkoutInfoAddressTitle.classList.remove('error')
      checkoutInfoAddressError.classList.remove('active')
      checkoutInfoAddressInput.value.length !== 0 ? checkoutInfoAddressInput.removeAttribute('title') :
        checkoutInfoAddressInput.setAttribute('title', 'Please fill out this field.')
    })

    checkoutInfoAddress.append(checkoutInfoAddressInput, checkoutInfoAddressTitle, checkoutInfoAddressError)
    
    checkoutInfoNameAddress.append(checkoutInfoFirstName, checkoutInfoLastName, checkoutInfoAddress)

    // Contact info block
    const checkoutInfoContacts = this.elFactory('div', {class: 'checkout-info-item'})

    const checkoutInfoContactsTitle = this.elFactory('p', {class: 'checkout-info-item-title'})
    checkoutInfoContactsTitle.textContent = `What\u{2019}s your contact information?`

    checkoutInfoContacts.append(checkoutInfoContactsTitle)

    // Email address
    const checkoutInfoEmailAddress = this.elFactory('div', {class: 'checkout-info-field'})
    const checkoutInfoEmailAddressInput = this.elFactory('input', {class: 'checkout-info-field-input email-input', 
      type: 'text', title: 'Please fill out this field.'})
    const checkoutInfoEmailAddressTitle = this.elFactory('span', {class: 'checkout-info-field-input-name'})
    checkoutInfoEmailAddressTitle.textContent = 'Email Address'

    const checkoutInfoEmailAddressError = this.elFactory('div', {class: 'checkout-info-field-error'})
    const checkoutInfoEmailAddressErrorText = this.elFactory('span', {class: 'checkout-info-field-error-msg'})
    checkoutInfoEmailAddressErrorText.textContent = 'Please enter a valid email address.'
    checkoutInfoEmailAddressError.append(renderErrorImg(), checkoutInfoEmailAddressErrorText)

    checkoutInfoEmailAddressInput.addEventListener('focus', () => {
      checkoutInfoEmailAddressTitle.classList.add('active')
      checkoutInfoEmailAddressInput.classList.remove('error')
    })
    checkoutInfoEmailAddressInput.addEventListener('focusout', () => {
      formValidation = true
      if (checkoutInfoEmailAddressInput.value.length === 0) {
        formValidation = false
        checkoutInfoEmailAddressTitle.classList.remove('active')
        addErrorClass(checkoutInfoEmailAddressTitle, checkoutInfoEmailAddressInput, checkoutInfoEmailAddressError)
      }
      const emailValidation = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      if (checkoutInfoEmailAddressInput.value.length !== 0 && 
        !emailValidation.test(checkoutInfoEmailAddressInput.value)) {
        formValidation = false
        addErrorClass(checkoutInfoEmailAddressTitle, checkoutInfoEmailAddressInput, checkoutInfoEmailAddressError)
      }
    })
    checkoutInfoEmailAddressInput.addEventListener('input', () => {
      checkoutInfoEmailAddressTitle.classList.remove('error')
      checkoutInfoEmailAddressError.classList.remove('active')
      checkoutInfoEmailAddressInput.value.length !== 0 ? checkoutInfoEmailAddressInput.removeAttribute('title') :
        checkoutInfoEmailAddressInput.setAttribute('title', 'Please fill out this field.')
    })

    checkoutInfoEmailAddress.append(checkoutInfoEmailAddressInput, checkoutInfoEmailAddressTitle, checkoutInfoEmailAddressError)

    // Phone
    const checkoutInfoPhoneNum = this.elFactory('div', {class: 'checkout-info-field'})
    const checkoutInfoPhoneNumInput = this.elFactory('input', {class: 'checkout-info-field-input phone-input', 
      type: 'text', title: 'Please fill out this field.'})
    const checkoutInfoPhoneNumTitle = this.elFactory('span', {class: 'checkout-info-field-input-name'})
    checkoutInfoPhoneNumTitle.textContent = 'Phone Number'

    const checkoutInfoPhoneNumError = this.elFactory('div', {class: 'checkout-info-field-error'})
    const checkoutInfoPhoneNumErrorText = this.elFactory('span', {class: 'checkout-info-field-error-msg'})
    checkoutInfoPhoneNumErrorText.textContent = 'Please enter a valid phone number.'
    checkoutInfoPhoneNumError.append(renderErrorImg(), checkoutInfoPhoneNumErrorText)

    checkoutInfoPhoneNumInput.addEventListener('focus', () => {
      checkoutInfoPhoneNumTitle.classList.add('active')
      checkoutInfoPhoneNumInput.classList.remove('error')
    })
    checkoutInfoPhoneNumInput.addEventListener('focusout', () => {
      formValidation = true
      if (checkoutInfoPhoneNumInput.value.length === 0) {
        formValidation = false
        checkoutInfoPhoneNumTitle.classList.remove('active')
        addErrorClass(checkoutInfoPhoneNumTitle, checkoutInfoPhoneNumInput, checkoutInfoPhoneNumError)
      }
      const validPhone = /^\+([0-9]{9,15})?$/
      if (checkoutInfoPhoneNumInput.value.length !== 0 && !validPhone.test(checkoutInfoPhoneNumInput.value)) {
        formValidation = false
        addErrorClass(checkoutInfoPhoneNumTitle, checkoutInfoPhoneNumInput, checkoutInfoPhoneNumError)
      }
    })
    checkoutInfoPhoneNumInput.addEventListener('input', () => {
      var newValue = checkoutInfoPhoneNumInput.value.replace(new RegExp(/[^\d\+]/,'ig'), '');
      checkoutInfoPhoneNumInput.value = newValue;
      checkoutInfoPhoneNumTitle.classList.remove('error')
      checkoutInfoPhoneNumError.classList.remove('active')
      checkoutInfoPhoneNumInput.value.length !== 0 ? checkoutInfoPhoneNumInput.removeAttribute('title') :
        checkoutInfoPhoneNumInput.setAttribute('title', 'Please fill out this field.')
    })

    checkoutInfoPhoneNum.append(checkoutInfoPhoneNumInput, checkoutInfoPhoneNumTitle, checkoutInfoPhoneNumError)

    checkoutInfoContacts.append(checkoutInfoEmailAddress, checkoutInfoPhoneNum)

    // Payment info title
    const checkoutInfoTitle2 = this.elFactory('div', {class: 'checkout-info-title'})
    checkoutInfoTitle2.textContent = 'How do you want to pay?'

    // Card info block
    const checkoutInfoCard = this.elFactory('div', {class: 'checkout-info-item'})

    const checkoutInfoCardTitle = this.elFactory('p', {class: 'checkout-info-item-title'})
    checkoutInfoCardTitle.textContent = `Enter your card information:`

    checkoutInfoCard.append(checkoutInfoCardTitle)

     // Card
     const checkoutInfoCardNum = this.elFactory('div', {class: 'checkout-info-field'})
     const checkoutInfoCardNumInput = this.elFactory('input', {class: 'checkout-info-field-input card-input', 
       type: 'text', maxlength: '19', title: 'Please fill out this field.'})
     const checkoutInfoCardNumTitle = this.elFactory('span', {class: 'checkout-info-field-input-name'})
     checkoutInfoCardNumTitle.textContent = `Credit/Debit Card Number`
 
     const checkoutInfoCardNumError = this.elFactory('div', {class: 'checkout-info-field-error'})
     const checkoutInfoCardNumErrorText = this.elFactory('span', {class: 'checkout-info-field-error-msg'})
     checkoutInfoCardNumErrorText.textContent = 'Please enter a valid card number.'
     checkoutInfoCardNumError.append(renderErrorImg(), checkoutInfoCardNumErrorText)

     const checkoutCardsImgs = this.elFactory('div', {class: 'checkout-info-field-cards'})
     const checkoutCardVisa = this.elFactory('img', {class: 'checkout-info-field-card visa', 
      src: './assets/images/cards/visa.png', alt: 'checkout-info-field-card-img'})
    checkoutCardVisa.ondragstart = () => false
    const checkoutCardMastercard = this.elFactory('img', {class: 'checkout-info-field-card mastercard', 
      src: './assets/images/cards/mastercard.png', alt: 'checkout-info-field-card-img'})
    checkoutCardMastercard.ondragstart = () => false
    const checkoutCardDiscover = this.elFactory('img', {class: 'checkout-info-field-card discover', 
      src: './assets/images/cards/discover.png', alt: 'checkout-info-field-card-img'})
    checkoutCardDiscover.ondragstart = () => false
    checkoutCardsImgs.append(checkoutCardVisa, checkoutCardMastercard, checkoutCardDiscover)

    const cardValidation = (card: string) => {
      const oneNum = card.slice(0, 1)
      const twoNums = card.slice(0, 2)
      const threeNums = card.slice(0, 3)
      const fourNums = card.slice(0, 4)
      if (+oneNum === 4) {
        return {success: true, name: 'visa'}
      }
      if (+twoNums >= 51 && +twoNums <= 55) {
        return {success: true, name: 'mastercard'}
      }
      if (+twoNums === 64 || +twoNums === 65 || +threeNums === 622 || +fourNums === 6011) {
        return {success: true, name: 'discover'}
      }
      return {success: false}
    }

    const reformatInputField = (inputEl: HTMLInputElement, target: string) => {
      const format = (value: string, target: string) => {
          let res = ''
          if (target === 'card-num') {
            res = value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim()
          }
          if (target === 'card-exp') {
            res = value.replace(/[^\dA-Z]/g, '').replace(/(.{2})/g, '$1/').trim()
            if (res[res.length - 1] === '/') {
              res = res.slice(0, res.length - 1)
            }
          }
          return res
      }
      const countSpaces = (text: string) => {
          var spaces = text.match(/(\s+)/g);
          return spaces ? spaces.length : 0;
      }
      const countBackSpaces = (text: string) => {
        var spaces = text.match(/(\/)/g);
        return spaces ? spaces.length : 0;
    }
    const count = (text: string, target: string) => {
      let res = 0
      if (target === 'card-num') {res = countSpaces(text)}
      if (target === 'card-exp') {res = countBackSpaces(text)}
      return res
    }
  
      let position = inputEl.selectionEnd;
      let previousValue = inputEl.value;
      inputEl.value = format(inputEl.value, target);
  
      if (position !== inputEl.value.length) {
          let beforeCaret = previousValue.slice(0, position!);
          var countPrevious = count(beforeCaret, target);
          var countCurrent = count(format(beforeCaret, target), target);
          inputEl.selectionEnd = position! + (countCurrent - countPrevious);
      }
    }
      
     checkoutInfoCardNumInput.addEventListener('focus', () => {
       checkoutInfoCardNumTitle.classList.add('active')
       checkoutInfoCardNumInput.classList.remove('error')
     })
     checkoutInfoCardNumInput.addEventListener('focusout', () => {
       formValidation = true
       if (checkoutInfoCardNumInput.value.length === 0) {
         formValidation = false
         checkoutInfoCardNumTitle.classList.remove('active')
         addErrorClass(checkoutInfoCardNumTitle, checkoutInfoCardNumInput, checkoutInfoCardNumError)
       }

       if (checkoutInfoCardNumInput.value.length !== 0 && (checkoutInfoCardNumInput.value.length !== 19 ||
        !cardValidation(checkoutInfoCardNumInput.value).success)) {
         formValidation = false
         addErrorClass(checkoutInfoCardNumTitle, checkoutInfoCardNumInput, checkoutInfoCardNumError)
       }
     })
     checkoutInfoCardNumInput.addEventListener('input', () => {
      reformatInputField(checkoutInfoCardNumInput, 'card-num')

      if (checkoutInfoCardNumInput.value.length >= 4) {
        if (cardValidation(checkoutInfoCardNumInput.value).success) {
          [...document.querySelectorAll('.checkout-info-field-card')].map(el => {
            el.classList.contains(`${cardValidation(checkoutInfoCardNumInput.value).name}`) ?
             el.classList.add('active') : el.classList.add('hidden')
          })
          
        } else {
          [...document.querySelectorAll('.checkout-info-field-card')].map(el => {
            el.classList.remove('hidden')
            el.classList.remove('active')
          })
        }
      }
      if (checkoutInfoCardNumInput.value.length < 4) {
        [...document.querySelectorAll('.checkout-info-field-card')].map(el => {
          el.classList.remove('hidden')
          el.classList.remove('active')
        })
      }
       checkoutInfoCardNumTitle.classList.remove('error')
       checkoutInfoCardNumError.classList.remove('active')
       checkoutInfoCardNumInput.value.length !== 0 ? checkoutInfoCardNumInput.removeAttribute('title') :
        checkoutInfoCardNumInput.setAttribute('title', 'Please fill out this field.')
     })
 
    checkoutInfoCardNum.append(checkoutInfoCardNumInput, checkoutInfoCardNumTitle, checkoutInfoCardNumError, checkoutCardsImgs)

    // Exparation date and cvv
    const checkoutInfoExpirationDateCVVWrapper = this.elFactory('div', {class: 'checkout-info-wrapper'})

    // Expiration date
    const checkoutInfoExpirationDate = this.elFactory('div', {class: 'checkout-info-field'})
    const checkoutInfoExpirationDateInput = this.elFactory('input', {class: 'checkout-info-field-input card-exp-input', 
      type: 'text', maxlength: '5', title: 'Please fill out this field.'})
    const checkoutInfoExpirationDateTitle = this.elFactory('span', {class: 'checkout-info-field-input-name'})
    checkoutInfoExpirationDateTitle.textContent = 'Expiration MM/YY'

    const checkoutInfoExpirationDateError = this.elFactory('div', {class: 'checkout-info-field-error'})
    const checkoutInfoExpirationDateErrorText = this.elFactory('span', {class: 'checkout-info-field-error-msg'})
    checkoutInfoExpirationDateErrorText.textContent = 'Please enter a valid expiration date.'
    checkoutInfoExpirationDateError.append(renderErrorImg(), checkoutInfoExpirationDateErrorText)

    checkoutInfoExpirationDateInput.addEventListener('focus', () => {
      checkoutInfoExpirationDateTitle.classList.add('active')
      checkoutInfoExpirationDateInput.classList.remove('error')
    })
    checkoutInfoExpirationDateInput.addEventListener('focusout', () => {
      formValidation = true
      if (checkoutInfoExpirationDateInput.value.length === 0) {
        formValidation = false
        checkoutInfoExpirationDateTitle.classList.remove('active')
        addErrorClass(checkoutInfoExpirationDateTitle, checkoutInfoExpirationDateInput, checkoutInfoExpirationDateError)
      }
      if (checkoutInfoExpirationDateInput.value.length !== 0 && 
        (+checkoutInfoExpirationDateInput.value.slice(0, 2) > 12 ||
        +checkoutInfoExpirationDateInput.value.slice(3, 5) < 23)) {
        formValidation = false
        addErrorClass(checkoutInfoExpirationDateTitle, checkoutInfoExpirationDateInput, checkoutInfoExpirationDateError)
      }
    })
    checkoutInfoExpirationDateInput.addEventListener('input', () => {
      reformatInputField(checkoutInfoExpirationDateInput, 'card-exp')
      checkoutInfoExpirationDateTitle.classList.remove('error')
      checkoutInfoExpirationDateError.classList.remove('active')
      checkoutInfoExpirationDateInput.value.length !== 0 ? checkoutInfoExpirationDateInput.removeAttribute('title') :
        checkoutInfoExpirationDateInput.setAttribute('title', 'Please fill out this field.')
    })

    checkoutInfoExpirationDate.append(checkoutInfoExpirationDateInput, checkoutInfoExpirationDateTitle, checkoutInfoExpirationDateError)

    // CVV
    const checkoutInfoCVV = this.elFactory('div', {class: 'checkout-info-field'})
    const checkoutInfoCVVInput = this.elFactory('input', {class: 'checkout-info-field-input card-cvv-input', 
      type: 'text', maxlength: '3', title: 'Please fill out this field.'})
    const checkoutInfoCVVTitle = this.elFactory('span', {class: 'checkout-info-field-input-name'})
    checkoutInfoCVVTitle.textContent = 'CVV'

    const checkoutInfoCVVError = this.elFactory('div', {class: 'checkout-info-field-error'})
    const checkoutInfoCVVErrorText = this.elFactory('span', {class: 'checkout-info-field-error-msg'})
    checkoutInfoCVVErrorText.textContent = 'Please enter a valid security code.'
    checkoutInfoCVVError.append(renderErrorImg(), checkoutInfoCVVErrorText)

    checkoutInfoCVVInput.addEventListener('focus', () => {
      checkoutInfoCVVTitle.classList.add('active')
      checkoutInfoCVVInput.classList.remove('error')
    })
    checkoutInfoCVVInput.addEventListener('focusout', () => {
      formValidation = true
      if (checkoutInfoCVVInput.value.length === 0) {
        formValidation = false
        checkoutInfoCVVTitle.classList.remove('active')
        addErrorClass(checkoutInfoCVVTitle, checkoutInfoCVVInput, checkoutInfoCVVError)
      }

      if (checkoutInfoCVVInput.value.length !== 0 && checkoutInfoCVVInput.value.length !== 3) {
        formValidation = false
        addErrorClass(checkoutInfoCVVTitle, checkoutInfoCVVInput, checkoutInfoCVVError)
      }
    })
    checkoutInfoCVVInput.addEventListener('input', () => {
      checkoutInfoCVVInput.value = checkoutInfoCVVInput.value.replace(/[^\dA-Z]/g, '')
      checkoutInfoCVVTitle.classList.remove('error')
      checkoutInfoCVVError.classList.remove('active')
    })

    checkoutInfoCVV.append(checkoutInfoCVVInput, checkoutInfoCVVTitle, checkoutInfoCVVError)

    checkoutInfoExpirationDateCVVWrapper.append(checkoutInfoExpirationDate, checkoutInfoCVV)

    checkoutInfoCard.append(checkoutInfoCardNum, checkoutInfoExpirationDateCVVWrapper)
    
    checkoutInfo.append(checkoutInfoTitle)

    checkoutInfo.append(checkoutInfoNameAddress)
    checkoutInfo.append(checkoutInfoContacts)
    
    checkoutInfo.append(checkoutInfoTitle2)
    checkoutInfo.append(checkoutInfoCard)

    const checkoutSubmit = this.elFactory('button', {class: 'checkout-submit-btn', disabled: 'true'})
    checkoutSubmit.textContent = 'Place Our Order'
    checkoutInfo.append(checkoutSubmit)

    checkout.append(checkoutHeader)
    checkout.append(checkoutInfo)
    

    return checkout
  }

  render() {
    const darkBg = this.elFactory('div', {class: 'dark-bg'})
    darkBg.addEventListener('click', () => {
      this.closeCheckoutWindow()
    })
    this.container.append(darkBg)
   
    const bagHeader = this.createBagHeader()
    this.container.append(bagHeader)
    const bagGoods =  this.elFactory('div', {class: 'bag-goods'})
    this.container.append(bagGoods)
    
    Bag.bagItems.map(el => bagGoods.prepend(this.createBagItem(el.id)))

    this.container.append(this.createBadTotal());

     this.container.append(this.createCheckoutWindow());

    if (Bag.bagItems.length !== 0) {
      [...bagHeader.children][0].textContent = `Your bag total is $ 
        ${this.convertNumToSplitString(this.totalPrice)}.`
    }

    document.querySelector('.header-search')?.classList.add('hidden')

    Bag.updateBagCount() 
   
    return this.container;
  }
}