import Component from '../../../core/templates/components';
import productDB from '../../../db/productDB';
import ProductInterface from '../../../models/products';

export const typeSafe = (parent: ParentNode, selector: string): HTMLElement => {
    
    const node = parent.querySelector(selector);
    
    if (!(node instanceof HTMLElement)) {
        throw new Error('Must be an HTMLElement!');
    } 
    return node;
};


class Goods extends Component {

    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderMainBlock(list: HTMLUListElement) {
        const mainBlock = document.createElement('div');  
        mainBlock.classList.add('main__wrapper');  
        mainBlock.append(list);
    }

    renderItems(arr: ProductInterface[]): HTMLUListElement {
        const items = arr.map((item) => { 

            const listItem = this.createElem({tagName: 'li',
                className: 'goods__item',});
                
            const imgDiv =  this.createElem({tagName: 'div',
            className: 'goods__item_img' });

            const imgItem = this.createElem({tagName: 'img',
                className: 'img', src: item.img });

            const nameModel = this.createElem({tagName: 'div',
            className: 'goods__item_description',});

            const nameItem = this.createElem({tagName: 'div',
            className: 'goods__item_description-name',});

            const modelItem = this.createElem({tagName: 'div',
            className: 'goods__item_description-model',});

            const priceAndBuy = this.createElem({tagName: 'div',
            className: 'goods__item_wrapper',});

            const price = this.createElem({tagName: 'div',
            className: 'goods__item_wrapper-price',});

            const buyButton = this.createElem({tagName: 'button',
            className: 'goods__item_wrapper-buyButton',});  
            

            listItem.id = item.id;
            
            
            nameItem.textContent = `${item.name} ${item.capacity}`;
            modelItem.textContent = `${item.color} ${item.model}`;
            price.textContent = item.price + '$';
            buyButton.textContent = 'Buy';

            
            
            imgDiv.append(imgItem);
            listItem.append(imgDiv);
            nameModel.append(nameItem);
            nameModel.append(modelItem);            
            listItem.append(nameModel);
            priceAndBuy.append(price);
            priceAndBuy.append(buyButton);
            listItem.append(priceAndBuy);

            return listItem;
        });
        
        
        const unOrderedListItem: HTMLUListElement = document.createElement('ul');
        unOrderedListItem.classList.add('goods');
        unOrderedListItem.append(...items);
        return unOrderedListItem;
    }
   

    render() {        
        
        const items = this.renderItems(productDB);
        
        this.renderMainBlock(items);
        
        this.container.append(items); 

        return this.container;       
        
    }
}

export default Goods;