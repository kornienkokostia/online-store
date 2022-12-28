class appState {
    static appStateData: {
        goodsOrientation: string
    }
    
    static getGoodsOrientation(){
        const obj = JSON.parse(localStorage.getItem('appState') as string)
        return localStorage.getItem('appState')
         
    }

    static setGoodsOrientation(orientation: string){
        this.appStateData.goodsOrientation = orientation
        
          localStorage.setItem('appState', JSON.stringify(this.appStateData))
          console.log(JSON.parse(localStorage.getItem('appState') as string))
    }
}