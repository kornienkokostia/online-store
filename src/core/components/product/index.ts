import productDB from '../../../db/productDB';
import Component from '../../templates/components';

export default class Product extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  private productId = window.location.hash.split('id=')[1]
  private product = productDB.filter(el => +el.id === +this.productId)[0]

  convertNumToSplitString = (str: string) => str.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")

  createProductHeader(){
    const productHeader = this.elFactory('div', {class: 'product-header'})
    const productHeaderTitle = this.elFactory('h1', {class: 'product-header-title'})
    productHeaderTitle.textContent = this.setGoodsItemName(this.product)

    productHeader.append(productHeaderTitle)

    return productHeader
  }

  createProductMainInfo(){
    const productMainInfoDiv = this.elFactory('div', {class: 'product-main-info-wrapper'})

    const productImagesSliderWrapper = this.elFactory('div', {class: 'product-images-slider-wrapper'})

    const productImagesSliderPrevBtnImg = this.elFactory('img', {class: 'product-images-slider-btn-img', 
      src: './assets/images/icons/images-slider-prev.svg', alt: 'product-images-slider-btn-img'})
    productImagesSliderPrevBtnImg.ondragstart = () => false

    const productImagesSliderPrevBtn = this.elFactory('button', 
        {class: 'product-images-slider-btn prev hidden'}, productImagesSliderPrevBtnImg)

    const productImagesSliderNextBtnImg = this.elFactory('img', {class: 'product-images-slider-btn-img', 
        src: './assets/images/icons/images-slider-next.svg', alt: 'product-images-slider-btn-img'})
    productImagesSliderNextBtnImg.ondragstart = () => false    

    const productImagesSliderNextBtn = this.elFactory('button', 
        {class: 'product-images-slider-btn next'}, productImagesSliderNextBtnImg) 

    const productImagesSlider = this.elFactory('div', {class: 'product-images-slider'})
    const productImages = this.elFactory('div', {class: 'product-images', 'current-item': '1'})

    const changeDot = (num: number) => {
        const arr = [...document.querySelectorAll('.product-dot')]
        arr.map(el => el.classList.remove('active'))
        arr[num].classList.add('active')
    }
    
    productImagesSliderNextBtn.addEventListener('mouseup', () => {
        let currentItem = +productImages.getAttribute('current-item')!
        
        if (currentItem < this.product.imgs.length) {
            productImages.style.left = `-${currentItem * 100}%`
            productImages.setAttribute('current-item', `${currentItem + 1}`)
            changeDot(currentItem)
            if (currentItem === 1) {
                productImagesSliderPrevBtn.classList.remove('hidden')
            }
            if (currentItem === this.product.imgs.length-1) {
                productImagesSliderNextBtn.classList.add('hidden')
            }
        }
        
    })
    productImagesSliderPrevBtn.addEventListener('mouseup', () => {
        let currentItem = +productImages.getAttribute('current-item')! - 1
        if (currentItem < this.product.imgs.length && currentItem > 0) {
            productImages.style.left = `-${currentItem * 100 - 100}%`
            productImages.setAttribute('current-item', `${currentItem}`)
            changeDot(currentItem-1)
            if (currentItem === 1) {
                productImagesSliderPrevBtn.classList.add('hidden')
            }
            if (currentItem === this.product.imgs.length-1) {
                productImagesSliderNextBtn.classList.remove('hidden')
            }
        }
    })

    const productDotsWrapper = this.elFactory('div', {class: 'product-dots-wrapper'})
    const productDots = this.elFactory('div', {class: 'product-dots'})

    this.product.imgs.map((el, i) => {
        const productImageWrapper = this.elFactory('div', {class: 'product-image-wrapper'})
        const productImage = this.elFactory('div', {class: 'product-image'})
        const productImg = this.elFactory('img', {class: 'product-img', src: el, alt: 'product-image'})    
        productImg.ondragstart = () => false  
        productImage.append(productImg)
        productImageWrapper.append(productImage)
        productImages.append(productImageWrapper)

        const productDot = this.elFactory('div', {class: 'product-dot'})
        i === 0 ? productDot.classList.add('active') : false
        productDots.append(productDot)
    })

    productDotsWrapper.append(productDots)

    productImagesSlider.append(productImages)

    productImagesSliderWrapper.append(productImagesSliderPrevBtn)
    productImagesSliderWrapper.append(productImagesSlider)
    productImagesSliderWrapper.append(productImagesSliderNextBtn)
    productImagesSliderWrapper.append(productDotsWrapper)


    const productMainInfo = this.elFactory('div', {class: 'product-main-info'})

    

    const productMainInfoSpecs = this.elFactory('div', {class: 'product-main-info-specs'})

    const productMainInfoSpecsTitle = this.elFactory('div', {class: 'product-main-info-specs-title'})
    productMainInfoSpecsTitle.textContent = 'Product details'

    productMainInfoSpecs.append(productMainInfoSpecsTitle)

    const addItemToSpecs = (title: string, value: string) => {
        const itemDiv = this.elFactory('div', {class: `product-main-info-spec-item`})
        const itemName = this.elFactory('span', {class: 'product-main-info-spec-item-name'})
        const itemValue = this.elFactory('span', {class: 'product-main-info-spec-item-value'})
        itemName.textContent = title;
        itemValue.textContent = `${this.capitilizeFirstLetter(value)}`;
        itemDiv.append(itemName);
        itemDiv.append(itemValue)
        productMainInfoSpecs.append(itemDiv);
    }

    if (this.product.displaySize) {
        addItemToSpecs('Screen size: ', this.product.displaySize)
    }
    
    if (this.product.cameras) {
        addItemToSpecs('Cameras: ', this.product.cameras)
    }

    if (this.product.storage) {
        addItemToSpecs('Storage: ', this.product.storage)
    }

    if (this.product.chipset) {
        addItemToSpecs('Chipset: ', this.product.chipset)
    }

    if (this.product.protection) {
        addItemToSpecs('Release year: ', this.product.release)
    }

    if (this.product.bandColor) {
        addItemToSpecs('Band color: ', this.product.bandColor)
    } 

    if (this.product.nfc) {
        addItemToSpecs('NFC: ', this.product.nfc)
    }

    if (this.product.material) {
        addItemToSpecs('Material: ', this.product.material)
    }  

    if (this.product.earpieceDesign) {
        addItemToSpecs('Earpiece design: ', this.product.earpieceDesign)
    } 

    if (this.product.construction) {
        addItemToSpecs('Construction: ', this.product.construction)
    }       

    if (this.product.connection) {
        addItemToSpecs('Connection: ', this.product.connection)
    } 
    if (this.product.ram && this.product.brand !== 'samsung') {
        addItemToSpecs('RAM: ', this.product.ram)
    }    
    if (this.product.storageType) {
        addItemToSpecs('Storage type: ', this.product.storageType)
    }  
    
    const productMainInfoBuy = this.elFactory('div', {class: 'product-main-info-buy'})

    const productMainInfoBuyRating = this.elFactory('div', {class: 'product-main-info-buy-rating'})
    for (let i = 0; i < 5; i++) {
        if (i < this.product.rating) {
            const ratingImg = this.elFactory('img', {class: 'product-main-info-buy-rating-star', 
            src: './assets/images/icons/rating-full.svg', alt: 'rating-star'})
            ratingImg.ondragstart = () => false
            productMainInfoBuyRating.append(ratingImg)
        } else {
            const ratingImg = this.elFactory('img', {class: 'product-main-info-buy-rating-star', 
            src: './assets/images/icons/rating-empty.svg', alt: 'rating-star'})
            ratingImg.ondragstart = () => false
            productMainInfoBuyRating.append(ratingImg)
        }
    }

    const productMainInfoBuyPrice = this.elFactory('div', {class: 'product-main-info-buy-price'})
    const productMainInfoBuyPriceValue = this.elFactory('span', {class: 'product-main-info-buy-price-value'})
    productMainInfoBuyPriceValue.textContent = `$${this.convertNumToSplitString(this.product.price)}`
    
    productMainInfoBuyPrice.append(productMainInfoBuyPriceValue)

    const productMainInfoBuyBtns = this.elFactory('div', {class: 'product-main-info-buy-btns-wrapper'})

    const buyBtn = this.elFactory('button', {
        class: 'product-main-info-buy-add-to-bag-btn product-main-info-buy-btn'})
    buyBtn.textContent = 'Add to Bag'

    const buyNowBtn = this.elFactory('button', {
        class: 'product-main-info-buy-now-btn product-main-info-buy-btn'})
    buyNowBtn.textContent = 'Buy Now'

    productMainInfoBuyBtns.append(buyNowBtn, buyBtn)

    productMainInfoBuy.append(productMainInfoBuyRating)
    productMainInfoBuy.append(productMainInfoBuyPrice)
    productMainInfoBuy.append(productMainInfoBuyBtns)

    productMainInfo.append(productMainInfoSpecs)
    productMainInfo.append(productMainInfoBuy)
    

    productMainInfoDiv.append(productImagesSliderWrapper)
    productMainInfoDiv.append(productMainInfo)

    return productMainInfoDiv
  }

  


  render() {
    this.container.append(this.createProductHeader())

    this.container.append(this.createProductMainInfo())

    document.querySelector('.header-search')?.classList.add('hidden')

    window.scrollTo(0, 0)

    return this.container;
  }
}