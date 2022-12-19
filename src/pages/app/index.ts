import StatisticsPage from '../../pages/statistics/index'
import Page from '../../core/templates/page';
import MainPage from '../main/index';
import SettingsPage from '../settings/index';
import Header from '../../core/components/header/index';
import ErrorPage, {ErrorTypes} from '../../pages/error/index';

export const enum PageIDs {
    MainPage = 'main-page',
    SettingsPage = 'settings-page',
    StatisticsPage = 'statistics-page',
}

class App {

    private static container: HTMLElement = document.body;
    private static defaultPageID: string = 'current-page'
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
        } else if (idPage == PageIDs.SettingsPage) {
            page = new SettingsPage(idPage);
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

    private enableRouteChange() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            console.log(hash);            
            App.renderNewPage(hash); 
        })
    }

    constructor() {        
        this.initialPage = new MainPage('main-page');
        this.header = new Header('header', 'header-container');
    }

    run() {
        App.container.append(this.header.render());
        App.renderNewPage('main-page');         
        this.enableRouteChange();    
    }
}

export default App;