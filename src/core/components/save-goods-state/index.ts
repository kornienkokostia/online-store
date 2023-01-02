import AppStateInterface from "models/appState"
import BagItem from "models/bagItem"

export default class AppState {
    static appStateData: AppStateInterface = {
        goodsOrientation: '',
        goodsInBag: []
    }

    static innit(){
        // if (!localStorage.getItem('appState')) {
            AppState.setGoodsOrientation('vertical')
            AppState.setGoodsInBag([])
        // }
    }

    static getGoodsOrientation(){
        if (!localStorage.getItem('appState')) {
            AppState.innit()
        }
        const obj: AppStateInterface = JSON.parse(localStorage.getItem('appState') as string)
        this.appStateData.goodsOrientation = obj.goodsOrientation
        return this.appStateData.goodsOrientation
    }

    static setGoodsOrientation(orientation: string){
        this.appStateData.goodsOrientation = orientation
        localStorage.setItem('appState', JSON.stringify(this.appStateData))
    }

    static getGoodsInBag(){
        const obj: AppStateInterface = JSON.parse(localStorage.getItem('appState') as string)
        this.appStateData.goodsInBag = obj.goodsInBag
        return this.appStateData.goodsInBag
    }

    static setGoodsInBag(bagItems: BagItem[]){
        if (!localStorage.getItem('appState')) {
            AppState.innit()
        }
        this.appStateData.goodsInBag = bagItems
        localStorage.setItem('appState', JSON.stringify(this.appStateData))
    }
}
