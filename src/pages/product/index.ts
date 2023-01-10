import Product from '../../core/components/product/index';
import Page from '../../core/templates/page';

class ProductPage extends Page {
    public product: Product = new Product("div", "product");

    constructor(id: string) {
        super(id)
    }

    render() {
        const productDiv = document.createElement("div");
        productDiv.classList.add('product-wrapper')
        productDiv.append(this.product.render())
        this.container.append(productDiv)
        return this.container;
    }

}

export default ProductPage;