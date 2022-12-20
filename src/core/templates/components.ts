
 interface elementParams{
    tagName: string,
    className: string,
    alt?: string,
    href?: string,
    src?: string,
    type?: string,
    placeholder?: string
}

abstract class Component {

    protected container: HTMLElement;

    constructor(tagName: string, className: string) {
        this.container = document.createElement(tagName);
        this.container.className = className;
    }

    protected createElem(params: elementParams) {

        const element = document.createElement(params.tagName);
    
        element.classList.add(params.className);        
        
        if (params.tagName == 'img' && params.alt !== undefined) {
            element.setAttribute('alt', params.alt);                   
        } else if (params.tagName == 'img' && params.src !== undefined) {
            element.setAttribute('src', params.src);  
        }
    
        return element;
    }
    

    render() {
        return this.container;
    }
}

export default Component;