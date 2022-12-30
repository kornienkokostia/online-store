import ProductInterface from "models/products";

interface AttributeCollection {
    [name: string]: string | boolean;
}

abstract class Component {

    protected container: HTMLElement;

    constructor(tagName: string, className: string) {
        this.container = document.createElement(tagName);
        this.container.className = className;
    }

    protected elFactory <K extends keyof HTMLElementTagNameMap> 
        (tagName: K, attributes: AttributeCollection | null, ...children: HTMLElement[])
        : HTMLElementTagNameMap[K] {   
        const element = document.createElement(tagName);
        if (attributes) {
            for (const key of Object.keys(attributes)) {
                const attributeValue = attributes[key];
                if (typeof attributeValue === "boolean" && attributeValue) {
                    element.setAttribute(key, "");
                } else {
                    element.setAttribute(key, attributeValue as string);
                }
            }
        }

        for (const child of children) {
            element.append(child)
        }

        return element;
    }

    protected capitilizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

    protected setGoodsItemName = (item: ProductInterface) => `${this.capitilizeFirstLetter(item.brand)} 
        ${item.name} 
        ${item.category === 'laptops' ? item.displaySize : ''} 
        ${item.storage && item.category !== 'watches' && item.brand !== 'samsung' ? item.storage : ''} 
        ${(item.category !== 'headphones' && item.category !== 'watches') || item.brand !== 'apple' 
        ? item.color : ''} 
        ${item.model}`
    
    render() {
        return this.container;
    }
}

export default Component;