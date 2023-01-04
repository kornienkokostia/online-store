import Page from '../../core/templates/page';
import MainPage from '../main/index';
import BagPage from '../bag/index';
import Header from '../../core/components/header/index';
import ErrorPage, {ErrorTypes} from '../../pages/error/index';
import ProductPage from '../product/index';
import AppState from '../../core/components/save-goods-state/index';
import Routing from "../../core/components/routing/routing";
import RoutingWithReload from "../../core/components/routing/routingReload"
import Filtration from "../../core/components/filtration/filtration";
import Footer from '../../core/components/footer/index';
import Product from '../../core/components/product/index';

export const enum PageIDs {
    MainPage = 'main',
    BagPage = 'bag',
    ProductPage = 'product',
}

class App {
    private static container: HTMLElement = document.body;
    private static defaultPageID = 'current-page'
    //private initialPage: MainPage;
    private header: Header;
    private footer: Footer;
    static stringURL: string = '';
    static currentURL: string = 'main'

    static renderNewPage(idPage: string) { 

        const idURL = idPage.split('&')[0]

        this.currentURL = idURL

        const restURL = `${idPage}`;
        
        const currentPageHTML = document.querySelector(`#${App.defaultPageID}`);
        
        if (currentPageHTML) {
            currentPageHTML.remove();
        }

        let page: Page | null;

       

        if (idURL == PageIDs.MainPage) {

            page = new MainPage(idURL);
        } else if (idURL == PageIDs.BagPage) {
            page = new BagPage(idURL);
        } else if (idURL == PageIDs.ProductPage) { 
                   
            const currentPage = idPage.split('&')[1].split('=')[1];
            let checkNumber = !/^[0-9]+$/.test(currentPage)
            
            if (checkNumber || currentPage.length === 0 || currentPage.length > 2)  {
                page = new ErrorPage(idURL, ErrorTypes.Error_404);
            }  else {
                page = new ProductPage(idURL)
            }   
            
        } else {
            page = new ErrorPage(idURL, ErrorTypes.Error_404);
            Product.breadCrumbsCheck(restURL)
        }

        if (page) {
            
            const PageHTML = page.render();
            PageHTML.id = App.defaultPageID
            document.querySelector('.header-wrapper')!.after(PageHTML);
            
            
            if (App.currentURL === 'main') {
                RoutingWithReload.changeURL(restURL);
                Product.breadCrumbsCheck(restURL)
            }
            if (App.currentURL === 'product' || App.currentURL === 'bag') {                
                RoutingWithReload.changeURL(restURL);  
                Product.breadCrumbsCheck(restURL)
            }
        }
        
    }

    private hashChangeHandle() {       

        let hashPage = window.location.hash.slice(1);
 
        App.currentURL = hashPage
 
        if (hashPage.length === 0) {
            window.location.hash = '#main'
        App.currentURL = 'main'
        App.renderNewPage(App.currentURL);
       } else {
        App.renderNewPage(App.currentURL);
       }

    }

    private enableRouteChange() {
        window.addEventListener('hashchange', this.hashChangeHandle)
    }

    private enableRouteChangeReload() {
        window.addEventListener('DOMContentLoaded', this.hashChangeHandle)
    }

    constructor() {        
       // this.initialPage = new MainPage('main');
        this.header = new Header('header', 'header-wrapper');
        this.footer = new Footer('footer', 'footer-wrapper');
    }

    run() {
        AppState.innit()
        App.container.append(this.header.render());     
        App.container.append(this.footer.render()); 
       
        this.enableRouteChange();    
        this.enableRouteChangeReload();
         
    }
    
}

export default App;