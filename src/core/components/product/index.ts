import productDB from '../../../db/productDB';
import Component from '../../templates/components';
import Bag from '../bag/index';
import AppState from '../save-goods-state/index';

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
    
    const productMainInfoRatingPrice = this.elFactory('div', {class: 'product-main-info-rating-price'})

    const productMainInfoRating = this.elFactory('div', {class: 'product-main-info-rating'})

    const productSeeAllSpecsBtn = this.elFactory('button', {class: 'product-main-info-all-specs-btn'})
    productSeeAllSpecsBtn.textContent = 'See full specs'

    productSeeAllSpecsBtn.addEventListener('click', () => {
        const wrapper = document.querySelector('.product-main-info-wrapper') as HTMLElement
        console.log(wrapper.offsetHeight)
        window.scrollTo(0, wrapper.offsetHeight + 75 + 20 + 54)
    })

    productMainInfoRating.append(productSeeAllSpecsBtn)

    for (let i = 0; i < 5; i++) {
        if (i < this.product.rating) {
            const ratingImg = this.elFactory('img', {class: 'product-main-info-rating-star', 
            src: './assets/images/icons/rating-full.svg', alt: 'rating-star'})
            ratingImg.ondragstart = () => false
            productMainInfoRating.append(ratingImg)
        } else {
            const ratingImg = this.elFactory('img', {class: 'product-main-info-rating-star', 
            src: './assets/images/icons/rating-empty.svg', alt: 'rating-star'})
            ratingImg.ondragstart = () => false
            productMainInfoRating.append(ratingImg)
        }
    }

    const productMainInfoPrice = this.elFactory('div', {class: 'product-main-info-price'})
    const productMainInfoPriceValue = this.elFactory('span', {class: 'product-main-info-price-value'})
    productMainInfoPriceValue.textContent = `$${this.convertNumToSplitString(this.product.price)}`
    
    productMainInfoPrice.append(productMainInfoPriceValue)

    const productMainInfoBuyBtns = this.elFactory('div', {class: 'product-main-info-buy-btns-wrapper'})

    const buyBtn = this.elFactory('button', {
        class: 'product-main-info-buy-add-to-bag-btn product-main-info-buy-btn'})
    buyBtn.textContent = 'Add to Bag'

    const buyNowBtn = this.elFactory('button', {
        class: 'product-main-info-buy-now-btn product-main-info-buy-btn'})
    buyNowBtn.textContent = 'Buy Now'

    if (Bag.bagItems.filter(el => +el.id === +this.product.id).length > 0) {
        buyBtn.setAttribute('disabled', 'true')
        buyBtn.textContent = 'Added to Bag'
    }
      
    buyBtn.addEventListener("click", () => {
        Bag.bagItems.push({id: +this.product.id, count: 1})
        Bag.updateBagCount()
        buyBtn.setAttribute('disabled', 'true')
        buyBtn.textContent = 'Added to Bag'
        AppState.setGoodsInBag(Bag.bagItems)
    });

    productMainInfoBuyBtns.append(buyNowBtn, buyBtn)

    productMainInfoRatingPrice.append(productMainInfoRating)
    productMainInfoRatingPrice.append(productMainInfoPrice)
    

    productMainInfo.append(productMainInfoSpecs)
    productMainInfo.append(productMainInfoRatingPrice, productMainInfoBuyBtns)
    

    productMainInfoDiv.append(productImagesSliderWrapper)
    productMainInfoDiv.append(productMainInfo)

    return productMainInfoDiv
  }

  createAllSpecs(){
    const allSpecsInfoWrapper = this.elFactory('div', {class: 'product-all-info-wrapper'})

    const allSpecsTitle = this.elFactory('h2', {class: 'product-all-info-title'})
    allSpecsTitle.textContent = 'Full product specifications'

    const allSpecsInfo = this.elFactory('div', {class: 'product-all-info'})

    const addItemToSpecs = (title: string, value: string, capitalize: boolean) => {
        const itemDiv = this.elFactory('div', {class: `product-all-info-spec-item`})
        const itemName = this.elFactory('div', {class: 'product-all-info-spec-item-name'})
        const itemDots = this.elFactory('div', {class: 'product-all-info-spec-item-dots'})
        const itemValue = this.elFactory('div', {class: 'product-all-info-spec-item-value'})
        const itemNameSpan = this.elFactory('span', {})
        const itemValueSpan = this.elFactory('span', {})
        itemNameSpan.textContent = title;
        itemValueSpan.textContent = `${capitalize ? this.capitilizeFirstLetter(value) : value}`;
        itemName.append(itemNameSpan)
        itemValue.append(itemValueSpan)
        itemDiv.append(itemName);
        itemDiv.append(itemDots)
        itemDiv.append(itemValue)
        allSpecsInfo.append(itemDiv);
    }

    
    addItemToSpecs('Category', this.product.category, false)
    addItemToSpecs('Brand', this.product.brand, true)
    addItemToSpecs('Release year ', this.product.release, false)
    if (this.product.color) {
        addItemToSpecs('Color', this.product.color, false)
    }
    if (this.product.storage) {
        addItemToSpecs('Storage', this.product.storage, false)
    }
    if (this.product.displaySize) {
        addItemToSpecs('Display size', this.product.displaySize, false)
    }
    if (this.product.display) {
        addItemToSpecs('Display', this.product.display, true)
    }
    if (this.product.resolution) {
        addItemToSpecs('Resolution', this.product.resolution, false)
    }
    if (this.product.coating) {
        addItemToSpecs('Coating', this.product.coating, false)
    }
    if (this.product.bodyShape) {
        addItemToSpecs('Body shape', this.product.bodyShape, false)
    }
    if (this.product.ppi) {
        addItemToSpecs('Pixels per inch', this.product.ppi, false)
    }
    if (this.product.refreshRate) {
        addItemToSpecs('Refresh rate', this.product.refreshRate, false)
    }
    if (this.product.communication) {
        addItemToSpecs('Communication', this.product.communication, false)
    }
    if (this.product.features) {
        addItemToSpecs('Features', this.product.features, false)
    }
    if (this.product.batteryType) {
        addItemToSpecs('Battery type', this.product.batteryType, false)
    }
    if (this.product.sdCardSupport) {
        addItemToSpecs('SD card support', this.product.sdCardSupport, false)
    }
    if (this.product.internet) {
        addItemToSpecs('Internet', this.product.internet, false)
    }
    if (this.product.numOfSIMs) {
        addItemToSpecs('Number of SIMs', this.product.numOfSIMs, false)
    }
    if (this.product.typeOfSIM) {
        addItemToSpecs('Type of SIM', this.product.typeOfSIM, false)
    }
    if (this.product.chipset) {
        addItemToSpecs('Chipset', this.product.chipset, false)
    }
    if (this.product.chipsetCores) {
        addItemToSpecs('Chipset cores', this.product.chipsetCores, false)
    }
    if (this.product.ram) {
        addItemToSpecs('RAM', this.product.ram, false)
    }
    if (this.product.storageType) {
        addItemToSpecs('Storage type', this.product.storageType, false)
    }
    if (this.product.graphicsCardType) {
        addItemToSpecs('Graphics card type', this.product.graphicsCardType, false)
    }
    if (this.product.ports) {
        addItemToSpecs('Ports', this.product.ports, false)
    }
    if (this.product.earpieceDesign) {
        addItemToSpecs('Earpiece design', this.product.earpieceDesign, false)
    }
    if (this.product.construction) {
        addItemToSpecs('Construction', this.product.construction, false)
    }
    if (this.product.connection) {
        addItemToSpecs('Connection', this.product.connection, false)
    }
    if (this.product.activeNoiseCancellation) {
        addItemToSpecs('Active noise cancellation', this.product.activeNoiseCancellation, false)
    }
    if (this.product.numOfMics) {
        addItemToSpecs('Number of microphones', this.product.numOfMics, false)
    }
    if (this.product.sensors) {
        addItemToSpecs('Sensors', this.product.sensors, false)
    }
    if (this.product.control) {
        addItemToSpecs('Control', this.product.control, false)
    }
    if (this.product.training) {
        addItemToSpecs('Training', this.product.training, false)
    }
    if (this.product.audioCodec) {
        addItemToSpecs('Audio codec', this.product.audioCodec, false)
    }
    if (this.product.cameras) {
        addItemToSpecs('Cameras', this.product.cameras, false)
    }
    if (this.product.webCamera) {
        addItemToSpecs('Web camera', this.product.webCamera, false)
    }
    if (this.product.maxVideoRecording) {
        addItemToSpecs('Maximum video recording capability', this.product.maxVideoRecording, false)
    }
    if (this.product.bluetooth) {
        addItemToSpecs('Bluetooth version', this.product.bluetooth, false)
    }
    if (this.product.wifiStandart) {
        addItemToSpecs('Wi-fi standart', this.product.wifiStandart, false)
    }
    if (this.product.nfc) {
        addItemToSpecs('NFC', this.product.nfc, false)
    }
    if (this.product.os) {
        addItemToSpecs('OS', this.product.os, false)
    }
    if (this.product.osVersion) {
        addItemToSpecs('OS version', this.product.osVersion, false)
    }
    if (this.product.protection) {
        addItemToSpecs('Protection', this.product.protection, false)
    }
    if (this.product.material) {
        addItemToSpecs('Material', this.product.material, false)
    }
    if (this.product.size) {
        addItemToSpecs('Size', this.product.size, false)
    }
    if (this.product.caseSize) {
        addItemToSpecs('Case size', this.product.caseSize, false)
    }
    addItemToSpecs('Weight', this.product.weight, false)


    allSpecsInfoWrapper.append(allSpecsTitle)
    allSpecsInfoWrapper.append(allSpecsInfo)

    return allSpecsInfoWrapper
  }


  render() {
    this.container.append(this.createProductHeader())

    this.container.append(this.createProductMainInfo())

    this.container.append(this.createAllSpecs())

    document.querySelector('.header-search')?.classList.add('hidden')

    window.scrollTo(0, 0)

    return this.container;
  }
}