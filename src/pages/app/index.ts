import Page from '../../core/templates/page';
import MainPage from '../main/index';
import BagPage from '../bag/index';
import Header from '../../core/components/header/index';
import ErrorPage, {ErrorTypes} from '../../pages/error/index';
import ProductPage from '../product/index';

export const enum PageIDs {
    MainPage = 'main',
    BagPage = 'bag',
    ProductPage = 'product',
}

class App {
    private static container: HTMLElement = document.body;
    private static defaultPageID = 'current-page'
    private initialPage: MainPage;
    private header: Header;
    static stringURL: string = '';
    static currentURL: string = '#main'

    static renderNewPage(idPage: string) { 
        const idURL = idPage.split('&')[0]
        this.currentURL = idPage

        const currentPageHTML = document.querySelector(`#${App.defaultPageID}`);
        
        if (currentPageHTML) {
            currentPageHTML.remove();
        }

        let page: Page | null = null;

        if (idURL == PageIDs.MainPage) {
            page = new MainPage(idURL);
        } else if (idURL == PageIDs.BagPage) {
            page = new BagPage(idURL);
        } else if (idURL == PageIDs.ProductPage && idPage.split('id=')[1].length !== 0) {
            page = new ProductPage(idURL)
        } else {
            page = new ErrorPage(idURL, ErrorTypes.Error_404);
        }

        if (page) {
            const PageHTML = page.render();
            PageHTML.id = App.defaultPageID
            App.container.append(PageHTML);
        }
    }

    private hashChangeHandle() {
        const hash = window.location.hash.slice(1);   
        if (hash) {
            App.renderNewPage(hash)
        } else {
           App.renderNewPage('main');   
           window.location.hash = 'main'
        }
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