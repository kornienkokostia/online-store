import Page from '../../core/templates/page';
import Goods from '../../core/components/main/index';

class MainPage extends Page {
    
    static textObject = {
        MainTitle: 'Main Page'
    };

    public goods: Goods = new Goods('div', 'goods__wrapper');

    constructor(id: string) {
        super(id);
        
    }  

    render() {
        const title = this.createHeaderTitle(MainPage.textObject.MainTitle);
        this.container.append(title);
        this.container.append(this.goods.render());          

        return this.container;
    }
}

export default MainPage;