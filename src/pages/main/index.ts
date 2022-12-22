import Page from '../../core/templates/page';
import Goods from '../../core/components/main/goods';
import TopPanel from '../../core/components/main/top-panel';
import Filters from '../../core/components/main/filters';

class MainPage extends Page {
    
    static textObject = {
        MainTitle: 'Main Page'
    };

    public filters: Filters = new Filters('div', 'filters-wrapper')
    public topPanel: TopPanel = new TopPanel('div', 'top-panel-wrapper')
    public goods: Goods = new Goods('div', 'goods-wrapper');
    

    constructor(id: string) {
        super(id);
        
    }  

    render() {
        const mainDiv = document.createElement('main')
        mainDiv.classList.add('main')
        mainDiv.append(this.filters.render());
        mainDiv.append(this.topPanel.render());
        mainDiv.append(this.goods.render());    
        this.container.append(mainDiv) 

        return this.container;
    }
}

export default MainPage;