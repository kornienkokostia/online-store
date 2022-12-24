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

      const imgItem = this.elFactory("img", { class: "img", src: item.img });

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

      const diagonalItem = this.elFactory("div", {
        class: "goods-item-description-diagonal",
      });

      const cameraItem = this.elFactory("div", {
        class: "goods-item-description-camera",
      });

      const capacityItem = this.elFactory("div", {
        class: "goods-item-description-capacity",
      });

      const cpuItem = this.elFactory("div", {
        class: "goods-item-description-cpu",
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

      const availability = this.elFactory("div", {
        class: "goods-item-wrapper-availability",
      });
      
      const spanavailability = document.createElement('span');

      const buyButton = this.elFactory("button", {
        class: "goods-item-wrapper-buyButton",
      });

      buyButton.addEventListener("click", (e) => {
        const target = e.target;

        if (target instanceof Element) {
          target.classList.toggle("goods-item-wrapper-buyButton-select");
        }
      });

      nameItem.textContent = `${item.name} ${item.capacity} ${item.color} ${item.model}`;

      price.textContent = item.price + "$";
      buyButton.textContent = "Buy";
      availability.textContent = `${item.availabilityCount}`;
      spanavailability.textContent = "In stock: "
      availability.prepend(spanavailability);

      imgDiv.append(imgItem);
      listItem.append(imgDiv);
      description.append(nameItem);

      if (this.orient === "horizontal") {
        const spanName = document.createElement("span");
        spanName.textContent = "Name: ";
        nameItem.prepend(spanName);

        const spanDiagonal = document.createElement("span");
        spanDiagonal.textContent = "Diagonal: ";
        diagonalItem.textContent = `${item.diagonal};`;
        diagonalItem.prepend(spanDiagonal);
        description.append(diagonalItem);

        const spanCamera = document.createElement("span");
        spanCamera.textContent = "Camera: ";
        cameraItem.textContent = `${item.camera}`;
        cameraItem.prepend(spanCamera);
        description.append(cameraItem);

        const spanCapacity = document.createElement("span");
        spanCapacity.textContent = "Capacity: ";
        capacityItem.textContent = `${item.capacity}`;
        capacityItem.prepend(spanCapacity);
        description.append(capacityItem);

        const spanCPU = document.createElement("span");
        spanCPU.textContent = "CPU: ";
        cpuItem.textContent = `${item.cpu}`;
        cpuItem.prepend(spanCPU);
        description.append(cpuItem);

        const spanProtection = document.createElement("span");
        spanProtection.textContent = "Protection Standard: ";
        protectionItem.textContent = `${item.protection}`;
        protectionItem.prepend(spanProtection);
        description.append(protectionItem);

        const spanNFC = document.createElement("span");
        spanNFC.textContent = "NFC: ";
        nfcItem.textContent = `${item.nfc}`;
        nfcItem.prepend(spanNFC);
        description.append(nfcItem);

        const spanMaterial = document.createElement("span");
        spanMaterial.textContent = "Material: ";
        materialItem.textContent = `${item.material}`;
        materialItem.prepend(spanMaterial);
        description.append(materialItem);
      }

      listItem.append(description);
      priceAndBuy.append(price);
      priceAndBuy.append(availability)
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
