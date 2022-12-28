import AppStateInterface from "models/appState"

export default class AppState {
    static appStateData: AppStateInterface = {
        goodsOrientation: ''
    }
    static getGoodsOrientation(){
        if (!localStorage.getItem('appState')) {
            this.setGoodsOrientation('vertical')
        }
        const obj = JSON.parse(localStorage.getItem('appState') as string)
        this.appStateData.goodsOrientation = obj.goodsOrientation
        return this.appStateData.goodsOrientation
    }

    static setGoodsOrientation(orientation: string){
        this.appStateData.goodsOrientation = orientation
        localStorage.setItem('appState', JSON.stringify(this.appStateData))
    }
}