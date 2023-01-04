import Component from "../../templates/components";
import productDB from "../../../db/productDB";
import ProductInterface from "../../../models/products";
import GoodsNav from "../goods_navigation/index";
import AppState from "../save-goods-state/index";
import Bag from "../bag/index";

export default class Goods extends Component {
  protected goodsPerPage: number = 12;
  protected currentPage: number = 1;
  protected orient: string = AppState.getGoodsOrientation();
  protected product: ProductInterface[] = productDB;

  constructor(
    tagName: string,
    className: string,
    goodsPerPage: number,
    currentPage: number,
    product: ProductInterface[]
  ) {
    super(tagName, className);
    this.goodsPerPage = goodsPerPage;
    this.currentPage = currentPage;
    this.product = product;
  }

  renderItems(
    arrData: ProductInterface[],
    goodsPerPage: number,
    currentPage: number,
  ) {
    this.product = arrData;
    this.goodsPerPage = goodsPerPage;
    this.currentPage = currentPage;

    if (this.product.length === 0) {
      this.container?.classList.add('not-found')
    }

    const pagesCount = Math.ceil(arrData.length / this.goodsPerPage);
    if (pagesCount < this.currentPage) {
      this.currentPage = pagesCount;
    }

    const start = this.goodsPerPage * (this.currentPage - 1);
    const end = start + this.goodsPerPage;
    const paginatedData = arrData.slice(start, end);

    const items = paginatedData.map((item) => {
      const listItem = this.elFactory("li", {
        class: `${
          this.orient === "vertical"
            ? "goods-item"
            : "goods-item goods-item-horizontal"
        }`,
        id: item.id,
      });

      const imgDiv = this.elFactory("div", { class: "goods-item-img" });
      
      const imgItem = this.elFactory("img", { class: "img", src: item.imgs[0] });
      imgItem.ondragstart = () => false
      
      imgDiv.append(imgItem)
      const imgDivWrapper = this.elFactory('a', {class: 'goods-item-img-wrapper', href: `./#product&id=${item.id}`}, imgDiv)

      const description = this.elFactory("div", {
        class: `${
          this.orient === "vertical"
            ? "goods-item-description"
            : "goods-item-description goods-item-description-horizontal"
        }`,
      });     

      const nameItem = this.elFactory("a", {
        class: "goods-item-description-name", href: `./#product&id=${item.id}`
      });

      const priceAndBuy = this.elFactory("div", {
        class: `${
          this.orient === "vertical"
            ? "goods-item-wrapper"
            : "goods-item-wrapper goods-item-wrapper-horizontal"
        }`,
      });

      const price = this.elFactory("div", {
        class: "goods-item-wrapper-price",
      });

      const stock = this.elFactory("div", {
        class: "goods-item-wrapper-stock",
      });

      const rating = this.elFactory("div", {
        class: "goods-item-wrapper-rating",
      });
      
      const spanStock = document.createElement('span');

      const addToBagBtn = this.elFactory("button", {
        class: "goods-item-wrapper-add-to-bag-btn goods-item-wrapper-btn",
      });
      addToBagBtn.textContent = "Buy";
      const goodInBag = this.elFactory("div", {
        class: "goods-item-wrapper-good-in-bag goods-item-wrapper-btn hidden",
      }, this.elFactory('img', {
        class: 'goods-item-wrapper-good-in-bag-img',
        src: './assets/images/icons/selected-item.svg',
      }));

      if (Bag.bagItems.filter(el => +el.id === +item.id).length > 0) {
        addToBagBtn.classList.add('hidden')
        goodInBag.classList.remove('hidden')
      }
      
      addToBagBtn.addEventListener("click", () => {
        Bag.bagItems.push({id: +item.id, count: 1})
        Bag.updateBagCount()
        addToBagBtn.classList.add('hidden')
        goodInBag.classList.remove('hidden')

        AppState.setGoodsInBag(Bag.bagItems)
      });

      // name
      nameItem.textContent = this.setGoodsItemName(item);

      price.textContent = "$" + item.price;
      stock.textContent = `${item.stock}`;
      spanStock.textContent = "In stock: "
      stock.prepend(spanStock);

      
      listItem.append(imgDivWrapper);
      description.append(nameItem);
      
      // rating
      const ratingStars = this.elFactory('div', {class: 'goods-item-wrapper-rating-stars'})
      for (let i = 0; i < 5; i++) {
        if (i < item.rating) {
          const ratingImg = this.elFactory('img', {class: 'goods-item-wrapper-rating-star', 
          src: './assets/images/icons/rating-full.svg', alt: 'rating-star'})
          ratingImg.ondragstart = () => false
          ratingStars.append(ratingImg)
        } else {
          const ratingImg = this.elFactory('img', {class: 'goods-item-wrapper-rating-star', 
          src: './assets/images/icons/rating-empty.svg', alt: 'rating-star'})
          ratingImg.ondragstart = () => false
          ratingStars.append(ratingImg)
        }
      }
      rating.append(ratingStars)

      const addItemOnHorizontalOrient = (name: string, title: string, value: string) => {
        const itemDiv = this.elFactory('div', {class: `goods-item-description-${name}`})
        const spanEl = this.elFactory('span', {})
          spanEl.textContent = title;
          itemDiv.textContent = `${this.capitilizeFirstLetter(value)};`;
          itemDiv.prepend(spanEl);
          description.append(itemDiv);
      }

      if (this.orient === "horizontal") {
        if (item.displaySize) {
          addItemOnHorizontalOrient('screen-size', 'Screen size: ', item.displaySize)
        }
        
        if (item.cameras) {
          addItemOnHorizontalOrient('cameras', 'Cameras: ', item.cameras)
        }

        if (item.storage) {
          addItemOnHorizontalOrient('storage', 'Storage: ', item.storage)
        }

        if (item.chipset) {
          addItemOnHorizontalOrient('chipset', 'Chipset: ', item.chipset)
        }

        if (item.protection) {
          addItemOnHorizontalOrient('release-year', 'Release year: ', item.release)
        }

        if (item.bandColor) {
          addItemOnHorizontalOrient('band-color', 'Band color: ', item.bandColor)
        } 

        if (item.nfc) {
          addItemOnHorizontalOrient('nfc', 'NFC: ', item.nfc)
        }

        if (item.material) {
          addItemOnHorizontalOrient('matherial', 'Material: ', item.material)
        }  

        if (item.earpieceDesign) {
          addItemOnHorizontalOrient('earpiece-design', 'Earpiece design: ', item.earpieceDesign)
        } 

        if (item.construction) {
          addItemOnHorizontalOrient('construction', 'Construction: ', item.construction)
        }       

        if (item.connection) {
          addItemOnHorizontalOrient('connection', 'Connection: ', item.connection)
        } 
        if (item.ram && item.brand !== 'samsung') {
          addItemOnHorizontalOrient('ram', 'RAM: ', item.ram)
        }    
        if (item.storageType) {
          addItemOnHorizontalOrient('storage-type', 'Storage type: ', item.storageType)
        }  
      }

      if (this.orient !== "vertical") {
        let lastDescriptionEl = [...description.children][[...description.children].length - 1]
        lastDescriptionEl.innerHTML = lastDescriptionEl.innerHTML.slice(0, -1)
      }
      

      listItem.append(description);
      priceAndBuy.append(price);
      listItem.append(stock)
      listItem.append(rating)
      priceAndBuy.append(addToBagBtn);
      priceAndBuy.append(goodInBag)
      listItem.append(priceAndBuy);

      return listItem;
    });

    const unOrderedListItem = this.elFactory("ul", {
      class: `${
        this.orient === "vertical" ? "goods" : "goods goods-horizontal"
      }`,
    });
    unOrderedListItem.append(...items);

    const mainBlock = this.elFactory("div", { class: "main-wrapper" });
    mainBlock.append(unOrderedListItem);

    return mainBlock;
  }

  render() {
    const items = this.renderItems(
      this.product,
      this.goodsPerPage,
      this.currentPage,
    );
    const goodsNav = new GoodsNav(
      this.product,
      "div",
      "navigation-wrapper",
      this.currentPage,
      this.goodsPerPage
    ).render();

    this.container.append(items);
    this.container.append(goodsNav);

    document.querySelector('.header-search')?.classList.remove('hidden')

    Bag.updateBagCount()

    return this.container;
  }
}
