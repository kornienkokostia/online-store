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

    const checkoutInfo = this.elFactory('div', {class: 'checkout-info'})

    const checkoutInfoTitle = this.elFactory('div', {class: 'checkout-info-title'})
    checkoutInfoTitle.textContent = 'Where should we send your order?'

    checkoutInfo.append(checkoutInfoTitle)

    // name adress block
    const checkoutInfoNameAddress = this.elFactory('div', {class: 'checkout-info-item'})

    const checkoutInfoNameAddressTitle = this.elFactory('p', {class: 'checkout-info-item-title'})
    checkoutInfoNameAddressTitle.textContent = 'Enter your name and address:'

    checkoutInfoNameAddress.append(checkoutInfoNameAddressTitle)

    const errorMsgImg = this.elFactory('img', {class: 'checkout-info-field-error-img', 
    src: './assets/images/icons/error.svg', alt: 'checkout-info-field-error-img'})
    errorMsgImg.ondragstart = () => false

    // First name
    const checkoutInfoFirstName = this.elFactory('div', {class: 'checkout-info-field'})
    const checkoutInfoFirstNameInput = this.elFactory('input', {class: 'checkout-info-field-input', 
      type: 'text'})
    const checkoutInfoFirstNameTitle = this.elFactory('span', {class: 'checkout-info-field-input-name'})
    checkoutInfoFirstNameTitle.textContent = 'First Name'

    const checkoutInfoFirstNameError = this.elFactory('div', {class: 'checkout-info-field-error'})
    const checkoutInfoFirstNameErrorText = this.elFactory('span', {class: 'checkout-info-field-error-msg'})
    checkoutInfoFirstNameErrorText.textContent = 'Please enter a first name.'
    
    checkoutInfoFirstNameError.append(errorMsgImg, checkoutInfoFirstNameErrorText)

    checkoutInfoFirstNameInput.addEventListener('focus', () => {
      checkoutInfoFirstNameTitle.classList.add('active')
      checkoutInfoFirstNameInput.classList.remove('error')
    })
    checkoutInfoFirstNameInput.addEventListener('focusout', () => {
      formValidation = true
      if (checkoutInfoFirstNameInput.value.length === 0) {
        formValidation = false
        checkoutInfoFirstNameTitle.classList.remove('active')
        checkoutInfoFirstNameTitle.classList.add('error')
        checkoutInfoFirstNameInput.classList.add('error')
        checkoutInfoFirstNameError.classList.add('active')
        checkoutInfoFirstNameErrorText.textContent = 'Please enter a first name.'
      }
      if (checkoutInfoFirstNameInput.value.length < 3 && checkoutInfoFirstNameInput.value.length !== 0) {
        formValidation = false
        checkoutInfoFirstNameError.classList.add('active')
        checkoutInfoFirstNameInput.classList.add('error')
        checkoutInfoFirstNameTitle.classList.add('error')
        checkoutInfoFirstNameErrorText.textContent = 'Please enter a valid first name (>2 characters).'
      }
    })
    checkoutInfoFirstNameInput.addEventListener('input', () => {
      checkoutInfoFirstNameTitle.classList.remove('error')
      checkoutInfoFirstNameError.classList.remove('active')
    })

    checkoutInfoFirstName.append(checkoutInfoFirstNameInput, checkoutInfoFirstNameTitle, checkoutInfoFirstNameError)

    // Last name
    const checkoutInfoLastName = this.elFactory('div', {class: 'checkout-info-field'})
    const checkoutInfoLastNameInput = this.elFactory('input', {class: 'checkout-info-field-input', 
      type: 'text'})
    const checkoutInfoLastNameTitle = this.elFactory('span', {class: 'checkout-info-field-input-name'})
    checkoutInfoLastNameTitle.textContent = 'Last Name'

    const checkoutInfoLastNameError = this.elFactory('div', {class: 'checkout-info-field-error'})
    const checkoutInfoLastNameErrorText = this.elFactory('span', {class: 'checkout-info-field-error-msg'})
    checkoutInfoLastNameErrorText.textContent = 'Please enter a last name.'
    checkoutInfoLastNameError.append(errorMsgImg, checkoutInfoLastNameErrorText)

    checkoutInfoLastNameInput.addEventListener('focus', () => {
      checkoutInfoLastNameTitle.classList.add('active')
      checkoutInfoLastNameInput.classList.remove('error')
    })
    checkoutInfoLastNameInput.addEventListener('focusout', () => {
      formValidation = true
      if (checkoutInfoLastNameInput.value.length === 0) {
        formValidation = false
        checkoutInfoLastNameTitle.classList.remove('active')
        checkoutInfoLastNameTitle.classList.add('error')
        checkoutInfoLastNameInput.classList.add('error')
        checkoutInfoLastNameError.classList.add('active')
        checkoutInfoLastNameErrorText.textContent = 'Please enter a last name.'
      }
      if (checkoutInfoLastNameInput.value.length < 3 && checkoutInfoLastNameInput.value.length !== 0) {
        formValidation = false
        checkoutInfoLastNameError.classList.add('active')
        checkoutInfoLastNameInput.classList.add('error')
        checkoutInfoLastNameTitle.classList.add('error')
        checkoutInfoLastNameErrorText.textContent = 'Please enter a valid last name (>2 characters).'
      }
    })
    checkoutInfoLastNameInput.addEventListener('input', () => {
      checkoutInfoLastNameTitle.classList.remove('error')
      checkoutInfoLastNameError.classList.remove('active')
    })

    checkoutInfoLastName.append(checkoutInfoLastNameInput, checkoutInfoLastNameTitle, checkoutInfoLastNameError)

    // Address
    const checkoutInfoAddress = this.elFactory('div', {class: 'checkout-info-field'})
    const checkoutInfoAddressInput = this.elFactory('input', {class: 'checkout-info-field-input', 
      type: 'text'})
    const checkoutInfoAddressTitle = this.elFactory('span', {class: 'checkout-info-field-input-name'})
    checkoutInfoAddressTitle.textContent = 'Address'

    const checkoutInfoAddressError = this.elFactory('div', {class: 'checkout-info-field-error'})
    const checkoutInfoAddressErrorText = this.elFactory('span', {class: 'checkout-info-field-error-msg'})
    checkoutInfoAddressErrorText.textContent = 'Please enter an address.'
    checkoutInfoAddressError.append(errorMsgImg, checkoutInfoAddressErrorText)

    checkoutInfoAddressInput.addEventListener('focus', () => {
      checkoutInfoAddressTitle.classList.add('active')
      checkoutInfoAddressInput.classList.remove('error')
    })
    checkoutInfoAddressInput.addEventListener('focusout', () => {
      formValidation = true
      if (checkoutInfoAddressInput.value.length === 0) {
        formValidation = false
        checkoutInfoAddressTitle.classList.remove('active')
        checkoutInfoAddressTitle.classList.add('error')
        checkoutInfoAddressInput.classList.add('error')
        checkoutInfoAddressError.classList.add('active')
        checkoutInfoAddressErrorText.textContent = 'Please enter an address.'
      }
      const inputArr = checkoutInfoAddressInput.value.trim().split(' ')
  
      if (checkoutInfoAddressInput.value.length !== 0 && (inputArr.length < 3 || 
        inputArr.filter(el => el.length < 5).length !== 0)) {
        formValidation = false
        checkoutInfoAddressError.classList.add('active')
        checkoutInfoAddressInput.classList.add('error')
        checkoutInfoAddressTitle.classList.add('error')
        checkoutInfoAddressErrorText.textContent = 'Please enter a valid address (>2 words, each >4 characters).'
      }
    })
    checkoutInfoAddressInput.addEventListener('input', () => {
      checkoutInfoAddressTitle.classList.remove('error')
      checkoutInfoAddressError.classList.remove('active')
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
    const checkoutInfoEmailAddressInput = this.elFactory('input', {class: 'checkout-info-field-input', 
      type: 'text'})
    const checkoutInfoEmailAddressTitle = this.elFactory('span', {class: 'checkout-info-field-input-name'})
    checkoutInfoEmailAddressTitle.textContent = 'Email Address'

    const checkoutInfoEmailAddressError = this.elFactory('div', {class: 'checkout-info-field-error'})
    const checkoutInfoEmailAddressErrorText = this.elFactory('span', {class: 'checkout-info-field-error-msg'})
    checkoutInfoEmailAddressErrorText.textContent = 'Please enter an email address.'
    checkoutInfoEmailAddressError.append(errorMsgImg, checkoutInfoEmailAddressErrorText)

    checkoutInfoEmailAddressInput.addEventListener('focus', () => {
      checkoutInfoEmailAddressTitle.classList.add('active')
      checkoutInfoEmailAddressInput.classList.remove('error')
    })
    checkoutInfoEmailAddressInput.addEventListener('focusout', () => {
      formValidation = true
      if (checkoutInfoEmailAddressInput.value.length === 0) {
        formValidation = false
        checkoutInfoEmailAddressTitle.classList.remove('active')
        checkoutInfoEmailAddressTitle.classList.add('error')
        checkoutInfoEmailAddressInput.classList.add('error')
        checkoutInfoEmailAddressError.classList.add('active')
        checkoutInfoEmailAddressErrorText.textContent = 'Please enter an email address.'
      }
      const emailValidation = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      
      if (checkoutInfoEmailAddressInput.value.length !== 0 && 
        !emailValidation.test(checkoutInfoEmailAddressInput.value)) {
        formValidation = false
        checkoutInfoEmailAddressError.classList.add('active')
        checkoutInfoEmailAddressInput.classList.add('error')
        checkoutInfoEmailAddressTitle.classList.add('error')
        checkoutInfoEmailAddressErrorText.textContent = 'Please enter a valid email address.'
      }
    })
    checkoutInfoEmailAddressInput.addEventListener('input', () => {
      checkoutInfoEmailAddressTitle.classList.remove('error')
      checkoutInfoEmailAddressError.classList.remove('active')
    })

    checkoutInfoEmailAddress.append(checkoutInfoEmailAddressInput, checkoutInfoEmailAddressTitle, checkoutInfoEmailAddressError)

    // Phone
    const checkoutInfoPhoneNum = this.elFactory('div', {class: 'checkout-info-field'})
    const checkoutInfoPhoneNumInput = this.elFactory('input', {class: 'checkout-info-field-input', 
      type: 'text'})
    const checkoutInfoPhoneNumTitle = this.elFactory('span', {class: 'checkout-info-field-input-name'})
    checkoutInfoPhoneNumTitle.textContent = 'Phone Number'

    const checkoutInfoPhoneNumError = this.elFactory('div', {class: 'checkout-info-field-error'})
    const checkoutInfoPhoneNumErrorText = this.elFactory('span', {class: 'checkout-info-field-error-msg'})
    checkoutInfoPhoneNumErrorText.textContent = 'Please enter a phone number.'
    checkoutInfoPhoneNumError.append(errorMsgImg, checkoutInfoPhoneNumErrorText)

    checkoutInfoPhoneNumInput.addEventListener('focus', () => {
      checkoutInfoPhoneNumTitle.classList.add('active')
      checkoutInfoPhoneNumInput.classList.remove('error')
    })
    checkoutInfoPhoneNumInput.addEventListener('focusout', () => {
      formValidation = true
      if (checkoutInfoPhoneNumInput.value.length === 0) {
        formValidation = false
        checkoutInfoPhoneNumTitle.classList.remove('active')
        checkoutInfoPhoneNumTitle.classList.add('error')
        checkoutInfoPhoneNumInput.classList.add('error')
        checkoutInfoPhoneNumError.classList.add('active')
        checkoutInfoPhoneNumErrorText.textContent = 'Please enter a phone number.'
      }
      if (checkoutInfoPhoneNumInput.value.length < 3 && checkoutInfoPhoneNumInput.value.length !== 0) {
        formValidation = false
        checkoutInfoPhoneNumError.classList.add('active')
        checkoutInfoPhoneNumInput.classList.add('error')
        checkoutInfoPhoneNumTitle.classList.add('error')
        checkoutInfoPhoneNumErrorText.textContent = 'Please enter a valid phone number.'
      }
    })
    checkoutInfoPhoneNumInput.addEventListener('input', () => {
      checkoutInfoPhoneNumTitle.classList.remove('error')
      checkoutInfoPhoneNumError.classList.remove('active')
    })

    checkoutInfoPhoneNum.append(checkoutInfoPhoneNumInput, checkoutInfoPhoneNumTitle, checkoutInfoPhoneNumError)

    checkoutInfoContacts.append(checkoutInfoEmailAddress, checkoutInfoPhoneNum)

    checkoutInfo.append(checkoutInfoNameAddress)
    checkoutInfo.append(checkoutInfoContacts)

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
   
    return this.container;
  }
}