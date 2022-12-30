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

  static updateBagCount(){
    document.querySelector('.header-bag-items-count')?.classList.remove('two-num')
    document.querySelector('.header-bag-items-count')?.classList.remove('two-num-plus')
    document.querySelector('.header-bag-img')?.classList.remove('two-num')
    document.querySelector('.header-bag-img')?.classList.remove('two-num-plus')

    const totalCount = Bag.bagItems.reduce((partialSum, a) => partialSum + +a.count, 0)
    document.querySelector('.header-bag-items-count')?.classList.add('active')

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
    const continueShoppingBtn = this.elFactory('button', {class: 'bag-btn bag-btn-continue-shopping'})
    continueShoppingBtn.textContent = 'Continue Shopping'
    continueShoppingBtn.addEventListener('click', () => {
      window.location.hash='';
      document.querySelector('.header-search')?.classList.remove('hidden')
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

    bagTotalDiv.append(bagTotalSummary)
    bagTotalDiv.append(checkOutBtn)

    return bagTotalDiv
  }

  createBagItem(itemId: number, count: number){
    const currentDBItem = productDB.filter(el => +el.id === itemId )[0]
  
    const bagItemDiv = this.elFactory('div', {class: 'bag-item', 'good-id': currentDBItem.id})
    const bagItemImgDiv = this.elFactory('div', {class: 'bag-item-img'})
    const bagItemImg = this.elFactory('img', {class: 'img', src: currentDBItem.imgs[0], alt: 'bag-item-img'})
    bagItemImg.ondragstart = () => false
    bagItemImgDiv.append(bagItemImg)

    const bagItemName = this.elFactory('div', {class: 'bag-item-name'})
    bagItemName.textContent = this.setGoodsItemName(currentDBItem)
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
    
    bagItemQuantityMinus.addEventListener('mousedown', () => {
      if (+bagItemQuantityInput.value > 1) {
        const valMinus = +bagItemQuantityInput.value - 1
        bagItemQuantityInput.value = `${valMinus}`
        Bag.bagItems.map(x => x.id === itemId ? x.count = valMinus : false);
        bagItemQuantity.classList.remove('max-stock')
        updateAllInfo()
      }
    })  

    bagItemQuantityPlus.addEventListener('mousedown', () => {
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
      document.querySelector('.bag-goods')?.removeChild(closestItem)
      const itemId = closestItem.getAttribute('good-id')
      Bag.bagItems.map(el => el.id === +itemId! ? Bag.bagItems.splice(Bag.bagItems.indexOf(el), 1) : false)
      updateTotalPrice()
      updateBagTitle()
      Bag.updateBagCount()
      if (Bag.bagItems.length === 0) {
        document.querySelector('.bag-total')!.classList.remove('active')
      }
    })

    bagItemPriceDetails.append(bagItemPriceValueWrapper)
    bagItemPriceDetails.append(bagItemRemoveBtn)

    bagItemDiv.append(bagItemImgDiv)
    bagItemDiv.append(bagItemName)
    bagItemDiv.append(bagItemQuantity)
    bagItemDiv.append(bagItemPriceDetails)

    this.totalPrice = `${+this.totalPrice + 
      +this.convertStringWithCommasToDefault(this.convertStringWithCommasToDefault(
        bagItemPriceValue.textContent))}`

    return bagItemDiv
  }

  

  render() {
    const bagHeader = this.createBagHeader()
    this.container.append(bagHeader)
    const bagGoods =  this.elFactory('div', {class: 'bag-goods'})
    this.container.append(bagGoods)
    
    Bag.bagItems.map(el => bagGoods.append(this.createBagItem(el.id, el.count)))

    this.container.append(this.createBadTotal());

    if (Bag.bagItems.length !== 0) {
      [...bagHeader.children][0].textContent = `Your bag total is $ 
        ${this.convertNumToSplitString(this.totalPrice)}.`
    }

    document.querySelector('.header-search')?.classList.add('hidden')
   
    return this.container;
  }
}