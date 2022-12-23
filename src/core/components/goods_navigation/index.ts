import Component from '../../../core/templates/components';
import productDB from '../../../db/productDB';
import ProductInterface from '../../../models/products';
import Pagination from '../pagination/pagination';

class GoodsNav extends Component {

    protected currentPage: number = 1;    
    protected goodsPerPage: number = 12;

  constructor(tagName: string, className: string, currentPage: number, goodsPerPage: number = 12) {
    super(tagName, className);
    this.currentPage = currentPage;
    this.goodsPerPage = goodsPerPage;
  }  

  displayNavBtn(arrData: ProductInterface[], goodsPerPage: number, currentPage: number) {

    

    const pagesCount: number = Math.ceil(arrData.length / goodsPerPage);
    const unOrderedListItem = this.elFactory('ul', { class: 'navigation-wrapper-goods' });
    

    for (let i = 1; i <= pagesCount; i++) {

        const listItem = this.elFactory('li', {class: 'navigation-wrapper-goods-item'});
        listItem.textContent = `${i}`;          
                 
        if (+(listItem.textContent) === currentPage)  {
          listItem.classList.add('active')          
        }   

        listItem.addEventListener('click', () => {
          
          
          this.currentPage = i;
          console.log(this.currentPage);
             
          Pagination.paginationBtn(this.currentPage);       
        })
        
        unOrderedListItem.append(listItem); 
        
    }    

    return unOrderedListItem;
  }

  render(num: number = 1) {

    const items = this.displayNavBtn(productDB, this.goodsPerPage, num);    
    
    this.container.append(items);    
    
    return this.container;
  }
}

export default GoodsNav;
