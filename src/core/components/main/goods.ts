import Component from "../../templates/components";
import productDB from "../../../db/productDB";
import ProductInterface from "../../../models/products";
import GoodsNav from "../goods_navigation/index";

export default class Goods extends Component {
  protected goodsPerPage: number = 12;
  protected currentPage: number = 1;
  protected orient: string = "vertical";

  constructor(
    tagName: string,
    className: string,
    goodsPerPage: number,
    currentPage: number,
    orient: string
  ) {
    super(tagName, className);
    this.goodsPerPage = goodsPerPage;
    this.currentPage = currentPage;
    this.orient = orient;
  }

  renderItems(
    arrData: ProductInterface[],
    goodsPerPage: number,
    currentPage: number,
    orient: string
  ) {
    this.goodsPerPage = goodsPerPage;
    this.currentPage = currentPage;
    this.orient = orient;

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

      const description = this.elFactory("div", {
        class: `${
          this.orient === "vertical"
            ? "goods-item-description"
            : "goods-item-description goods-item-description-horizontal"
        }`,
      });

      const nameItem = this.elFactory("div", {
        class: "goods-item-description-name",
      });

      const screenSizeItem = this.elFactory("div", {
        class: "goods-item-description-screen-size",
      });

      const cameraItem = this.elFactory("div", {
        class: "goods-item-description-camera",
      });

      const memoryItem = this.elFactory("div", {
        class: "goods-item-description-memory",
      });

      const chipsetItem = this.elFactory("div", {
        class: "goods-item-description-chipset",
      });

      const protectionItem = this.elFactory("div", {
        class: "goods-item-description-protection",
      });

      const nfcItem = this.elFactory("div", {
        class: "goods-item-description-nfc",
      });

      const materialItem = this.elFactory("div", {
        class: "goods-item-description-material",
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

      const buyButton = this.elFactory("button", {
        class: "goods-item-wrapper-buyButton",
      });

      buyButton.addEventListener("click", (e) => {
        const target = e.target;

        if (target instanceof Element) {
          target.classList.toggle("goods-item-wrapper-buyButton-select");
        }
      });

      nameItem.textContent = `${this.capitilizeFirstLetter(item.brand)} 
        ${item.name} ${item.memory} ${item.color} ${item.model}`;

      price.textContent = item.price + "$";
      buyButton.textContent = "Buy";
      stock.textContent = `${item.stock}`;
      spanStock.textContent = "In stock: "
      stock.prepend(spanStock);

      imgDiv.append(imgItem);
      listItem.append(imgDiv);
      description.append(nameItem);
      
      // rating
      const ratingStars = this.elFactory('div', {class: 'goods-item-wrapper-rating-stars'})
      for (let i = 0; i < 5; i++) {
        if (i < item.rating) {
          const ratingImg = this.elFactory('img', {class: 'goods-item-wrapper-rating-star', 
          src: './assets/images/icons/rating-full.svg'})
          ratingStars.append(ratingImg)
        } else {
          const ratingImg = this.elFactory('img', {class: 'goods-item-wrapper-rating-star', 
          src: './assets/images/icons/rating-empty.svg'})
          ratingStars.append(ratingImg)
        }
      }
      rating.append(ratingStars)

      if (this.orient === "horizontal") {
        const spanName = document.createElement("span");
        spanName.textContent = "Name: ";
        nameItem.prepend(spanName);
        nameItem.append(';')

        const spanScreenSize = document.createElement("span");
        spanScreenSize.textContent = "Screen size: ";
        screenSizeItem.textContent = `${item.displaySize};`;
        screenSizeItem.prepend(spanScreenSize);
        description.append(screenSizeItem);

        const spanCamera = document.createElement("span");
        spanCamera.textContent = "Cameras: ";
        cameraItem.textContent = `${item.cameras};`;
        cameraItem.prepend(spanCamera);
        description.append(cameraItem);

        const spanMemory = document.createElement("span");
        spanMemory.textContent = "Memory: ";
        memoryItem.textContent = `${item.memory};`;
        memoryItem.prepend(spanMemory);
        description.append(memoryItem);

        const spanChipset = document.createElement("span");
        spanChipset.textContent = "Chipset: ";
        chipsetItem.textContent = `${item.chipset};`;
        chipsetItem.prepend(spanChipset);
        description.append(chipsetItem);

        const spanProtection = document.createElement("span");
        spanProtection.textContent = "Protection: ";
        protectionItem.textContent = `${item.protection};`;
        protectionItem.prepend(spanProtection);
        description.append(protectionItem);

        const spanNFC = document.createElement("span");
        spanNFC.textContent = "NFC: ";
        nfcItem.textContent = `${this.capitilizeFirstLetter(item.nfc)};`;
        nfcItem.prepend(spanNFC);
        description.append(nfcItem);

        const spanMaterial = document.createElement("span");
        spanMaterial.textContent = "Material: ";
        materialItem.textContent = `${this.capitilizeFirstLetter(item.material)}`;
        materialItem.prepend(spanMaterial);
        description.append(materialItem);
      }

      listItem.append(description);
      priceAndBuy.append(price);
      listItem.append(stock)
      listItem.append(rating)
      priceAndBuy.append(buyButton);
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
      productDB,
      this.goodsPerPage,
      this.currentPage,
      this.orient
    );
    const goodsNav = new GoodsNav(
      "div",
      "navigation-wrapper",
      this.currentPage,
      this.goodsPerPage,
      this.orient
    ).render();

    this.container.append(items);
    this.container.append(goodsNav);

    return this.container;
  }
}
