import Component from '../../../core/templates/components';
import Goods from '../../../core/components/main/goods';

class Pagination extends Component {    

  constructor(tagName: string, className: string) {
    super(tagName, className);
    
  }  

  static displayList() {
    
    

    

  }

  static paginationBtn(num: number) {

    

     const btns = document.querySelector('.main');
    const ids = document.querySelector('.goods-wrapper');




     console.log(num);
      
    ids?.remove();
    
    const goods = (new Goods('div', 'goods-wrapper', 12, num)).render(num);
    btns?.append(goods)
    
    // return goods
    
  }

  
  render() {

    const goods = new Goods('div', 'goods-wrapper', 12 , 1);
    
    
    
    return this.container;
  }



}

export default Pagination;
