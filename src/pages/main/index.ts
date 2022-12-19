import Page from '../../core/templates/page'

class MainPage extends Page {
    
    static textObject = {
        MainTitle: 'Main Page'
    };

    constructor(id: string) {
        super(id);
        
    }  

    render() {
        const title = this.createHeaderTitle(MainPage.textObject.MainTitle);
        this.container.append(title);
        return this.container;
    }
}

export default MainPage;