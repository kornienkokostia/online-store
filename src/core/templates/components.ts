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
    
    render() {
        return this.container;
    }
}

export default Component;