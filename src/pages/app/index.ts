import StatisticsPage from '../../pages/statistics/index'
import Page from '../../core/templates/page';
import MainPage from '../main/index';
import BagPage from '../bag/index';
import Header from '../../core/components/header/index';
import ErrorPage, {ErrorTypes} from '../../pages/error/index';

export const enum PageIDs {
    MainPage = 'main',
    BagPage = 'bag',
    StatisticsPage = 'statistics-page',
}

class App {
    private static container: HTMLElement = document.body;
    private static defaultPageID = 'current-page'
    private initialPage: MainPage;
    private header: Header;

    static renderNewPage(idPage: string) { 
        const currentPageHTML = document.querySelector(`#${App.defaultPageID}`);
        
        if (currentPageHTML) {
            currentPageHTML.remove();
        }

        let page: Page | null = null;

        if (idPage == PageIDs.MainPage) {
            page = new MainPage(idPage);
        } else if (idPage == PageIDs.BagPage) {
            page = new BagPage(idPage);
        } else if (idPage == PageIDs.StatisticsPage) {
            page = new StatisticsPage(idPage)
        } else {
            page = new ErrorPage(idPage, ErrorTypes.Error_404);
        }

        if (page) {
            const PageHTML = page.render();
            PageHTML.id = App.defaultPageID
            App.container.append(PageHTML);
        }
    }

    private hashChangeHandle() {
        const hash = window.location.hash.slice(1);   
        hash ? App.renderNewPage(hash) : App.renderNewPage('main');  
    }

    private enableRouteChange() {
        window.addEventListener('hashchange', this.hashChangeHandle)
    }

    private enableRouteChangeReload() {
        window.addEventListener('DOMContentLoaded', this.hashChangeHandle)
    }

    constructor() {        
        this.initialPage = new MainPage('main');
        this.header = new Header('header', 'header-wrapper');
    }

    run() {
        App.container.append(this.header.render());
        App.renderNewPage('main');         
        this.enableRouteChange();    
        this.enableRouteChangeReload();
    }
}

export default App;