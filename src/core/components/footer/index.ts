import Component from '../../templates/components';

export default class Footer extends Component {
    constructor(tagName: string, className: string) {
      super(tagName, className);
    }
  
    createBreadcrumbsPath(){
        const breadcrumbsPath = this.elFactory('div', {class: 'footer-breadcrumbs-path'})

        const onlineStoreItem = this.elFactory('div', {class: 
            'footer-breadcrumbs-path-el'})
        const onlineStoreItemLink = this.elFactory('a', {class: 'footer-breadcrumbs-path-el-link', 
            href: '/#main'})    
        onlineStoreItemLink.textContent = 'Online Store'  
        onlineStoreItem.append(onlineStoreItemLink)  
        breadcrumbsPath.append(onlineStoreItem)

        return breadcrumbsPath
    }
  
    render() {
      const footerDiv = this.elFactory('div', {class: 'footer'})

      footerDiv.append(this.createBreadcrumbsPath())

      this.container.append(footerDiv)
  
      return this.container;
    }
}