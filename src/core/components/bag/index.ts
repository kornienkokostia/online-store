import Component from '../../templates/components';
import ProductInterface from 'models/products';

export default class Bag extends Component {
  private totalPrice = '0'

  static bagItems: ProductInterface[] = []

  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  convertStringWithCommasToDefault = (str: string) => str.replace(/,/g,'')

  convertNumToSplitString = (str: string) => str.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")

  updateBagHeaderTitle(){
    
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

  createBagItem(item: ProductInterface){
    const bagItemDiv = this.elFactory('div', {class: 'bag-item', 'good-id': item.id})
    const bagItemImgDiv = this.elFactory('div', {class: 'bag-item-img'})
    const bagItemImg = this.elFactory('img', {class: 'img', src: item.imgs[0], alt: 'bag-item-img'})
    bagItemImg.ondragstart = () => false
    bagItemImgDiv.append(bagItemImg)

    const bagItemName = this.elFactory('div', {class: 'bag-item-name'})
    bagItemName.textContent = this.setGoodsItemName(item)
    const bagItemQuantity = this.elFactory('div', {class: 'bag-item-quantity'})
    
    const bagItemQuantityMinus = this.elFactory('button', {class: 'bag-item-quantity-btn bag-item-quantity-minus'},
      this.elFactory('img', {class: 'bag-item-quantity-btn-img', 
        src: './assets/images/icons/bag-item-quantity-minus.svg', alt: 'bag-item-quantity-minus-img'})) 

    const bagItemQuantityPlus = this.elFactory('button', {class: 'bag-item-quantity-btn bag-item-quantity-plus'},
      this.elFactory('img', {class: 'bag-item-quantity-btn-img', 
        src: './assets/images/icons/bag-item-quantity-plus.svg', alt: 'bag-item-quantity-plus-img'}))

    const bagItemQuantityInput = this.elFactory('input', {class: 'bag-item-quantity-input', 
      type: 'number', min: '1', oninput: `validity.valid||(value='')`}) 
    bagItemQuantityInput.value = '1'  
    
    const updateItemPrice = () => {
      const curPrice = +this.convertStringWithCommasToDefault(item.price) * +bagItemQuantityInput.value
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
      bagTitle.textContent = `Your bag total is $ 
        ${this.convertNumToSplitString(this.totalPrice)}.`
    }
    
    bagItemQuantityMinus.addEventListener('click', () => {
      if (+bagItemQuantityInput.value > 1) {
        bagItemQuantityInput.value = `${+bagItemQuantityInput.value - 1}`
        bagItemQuantity.classList.remove('max-stock')
        updateItemPrice()
        updateTotalPrice()
        updateBagTitle()
      }
    })  

    bagItemQuantityPlus.addEventListener('click', () => {
      if (+bagItemQuantityInput.value < +item.stock) {
        bagItemQuantityInput.value = `${+bagItemQuantityInput.value + 1}`
        updateItemPrice()
        updateTotalPrice()
        updateBagTitle()        
      } else {
        bagItemQuantity.classList.add('max-stock')
      }
    })  

    bagItemQuantityInput.addEventListener('input', () => {
      if (+bagItemQuantityInput.value > 3) bagItemQuantityInput.value = bagItemQuantityInput.value.slice(0, 3)
      if (+bagItemQuantityInput.value > +item.stock) {
        bagItemQuantityInput.value = `${item.stock}`
        bagItemQuantity.classList.add('max-stock')
        updateItemPrice()
        updateTotalPrice()
      } else {
        if (+bagItemQuantityInput.value > 0) {
          updateItemPrice()
          updateTotalPrice()
        }
        bagItemQuantity.classList.remove('max-stock')
      }
    })
    
    bagItemQuantity.append(bagItemQuantityMinus)
    bagItemQuantity.append(bagItemQuantityInput)
    bagItemQuantity.append(bagItemQuantityPlus)
       
    const bagItemPriceDetails = this.elFactory('div', {class: 'bag-item-price-details'})

    const bagItemPriceValue = this.elFactory('span', {class: 'bag-item-price-value'})
    bagItemPriceValue.textContent = this.convertNumToSplitString(`${+this.convertStringWithCommasToDefault(item.price) * 
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
      updateTotalPrice()
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
    
    Bag.bagItems.map(el => bagGoods.append(this.createBagItem(el)))

    this.container.append(this.createBadTotal());

    if (Bag.bagItems.length !== 0) {
      [...bagHeader.children][0].textContent = `Your bag total is $ 
        ${this.convertNumToSplitString(this.totalPrice)}.`
    }
   
    return this.container;
  }
}