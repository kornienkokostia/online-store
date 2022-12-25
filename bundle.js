(()=>{"use strict";class e{constructor(e){this.container=document.createElement("div"),this.container.id=e}createHeaderTitle(e){const t=document.createElement("h1");return t.innerText=e,t}render(){return this.container}}e.textObject={};const t=e;class s extends t{constructor(e){super(e)}render(){const e=this.createHeaderTitle(s.TextObject.MainTitle);return this.container.append(e),this.container}}s.TextObject={MainTitle:"StatisticsPage"};const a=s,i=class{constructor(e,t){this.container=document.createElement(e),this.container.className=t}elFactory(e,t,...s){const a=document.createElement(e);if(t)for(const e of Object.keys(t)){const s=t[e];"boolean"==typeof s&&s?a.setAttribute(e,""):a.setAttribute(e,s)}for(const e of s)a.append(e);return a}capitilizeFirstLetter(e){return e.charAt(0).toUpperCase()+e.slice(1)}render(){return this.container}},n=[{id:"1",name:"iPhone 14 Pro Max",category:"smarthones",brand:"apple",release:"2022",color:"Deep Purple",model:"(MQC53)",price:"1599",memory:"1Tb",imgs:["./assets/images/smartphones/iphones/iphone-14-pro-max/deep-purple/iphone-14-pro-max-deep-purple-1.jpg","./assets/images/smartphones/iphones/iphone-14-pro-max/deep-purple/iphone-14-pro-max-deep-purple-2.jpg","./assets/images/smartphones/iphones/iphone-14-pro-max/deep-purple/iphone-14-pro-max-deep-purple-3.jpg","./assets/images/smartphones/iphones/iphone-14-pro-max/deep-purple/iphone-14-pro-max-deep-purple-4.jpg","./assets/images/smartphones/iphones/iphone-14-pro-max/deep-purple/iphone-14-pro-max-deep-purple-5.jpg","./assets/images/smartphones/iphones/iphone-14-pro-max/deep-purple/iphone-14-pro-max-deep-purple-6.jpg"],rating:5,stock:101,displaySize:"6.7''",display:"Super Retina XDR OLED",resolution:"2778x1284",ppi:"458ppi",refreshRate:"120Hz",communication:"GPS; Wi-Fi; Bluetooth; Lightning; NFC",features:"wireless charging; face ID; quick charge; LiDAR, emergency SOS via satellite",batteryType:"Li-Ion",sdCardSupport:"no support",internet:"3G; 5G; 4G (LTE)",numOfSIMs:"1 + eSIM",typeOfSIM:"Nano-SIM; eSIM",chipset:"Apple A16 Bionic",cameras:"48MP + 12MP + 12MP + 12MP",maxVideoRecording:"2160p@60fps",bluetooth:"5.3",nfc:"yes",os:"iOS",osVersion:"16",protection:"IP68",material:"glass",size:"160.7 x 77.6 x 7.85mm",weight:"255g"},{id:"2",name:"iPhone 14 Pro Max",category:"smarthones",brand:"apple",release:"2022",color:"Gold",model:"(MQC53)",price:"1199",memory:"256Tb",imgs:["./assets/images/smartphones/iphones/iphone-14-pro-max/gold/iphone-14-pro-max-gold-1.jpg","./assets/images/smartphones/iphones/iphone-14-pro-max/gold/iphone-14-pro-max-gold-2.jpg","./assets/images/smartphones/iphones/iphone-14-pro-max/gold/iphone-14-pro-max-gold-3.jpg","./assets/images/smartphones/iphones/iphone-14-pro-max/gold/iphone-14-pro-max-gold-4.jpg","./assets/images/smartphones/iphones/iphone-14-pro-max/gold/iphone-14-pro-max-gold-5.jpg","./assets/images/smartphones/iphones/iphone-14-pro-max/gold/iphone-14-pro-max-gold-6.jpg"],rating:2,stock:219,displaySize:"6.7''",display:"Super Retina XDR OLED",resolution:"2778x1284",ppi:"458ppi",refreshRate:"120Hz",communication:"GPS; Wi-Fi; Bluetooth; Lightning; NFC",features:"wireless charging; face ID; quick charge; LiDAR, emergency SOS via satellite",batteryType:"Li-Ion",sdCardSupport:"no support",internet:"3G; 5G; 4G (LTE)",numOfSIMs:"1 + eSIM",typeOfSIM:"Nano-SIM; eSIM",chipset:"Apple A16 Bionic",cameras:"48MP + 12MP + 12MP + 12MP",maxVideoRecording:"2160p@60fps",bluetooth:"5.3",nfc:"yes",os:"iOS",osVersion:"16",protection:"IP68",material:"glass",size:"160.7 x 77.6 x 7.85mm",weight:"255g"}];class r{static displayList(){}static paginationBtn(e,t,s){this.currentPage=t,this.goodsPerPage=e;const a=document.querySelector(".main"),i=document.querySelector(".goods-wrapper");null==i||i.remove();const n=new l("div","goods-wrapper",this.goodsPerPage,this.currentPage,s).render();null==a||a.append(n),window.scrollTo(0,0)}}r.currentPage=1,r.goodsPerPage=12;const o=r,c=class extends i{constructor(e,t,s,a,i){super(e,t),this.pagesCount=4,this.orient="vertical",this.currentPage=s,this.goodsPerPage=a,this.orient=i}displayNavBtn(e,t,s){this.goodsPerPage=t,this.currentPage=s,this.pagesCount=Math.ceil(e.length/this.goodsPerPage);const a=this.elFactory("ul",{class:"navigation-wrapper-goods"});for(let e=1;e<=this.pagesCount;e++){const t=this.elFactory("li",{class:"navigation-wrapper-goods-item"});t.textContent=`${e}`,+t.textContent===this.currentPage&&t.classList.add("active-btn"),t.addEventListener("click",(()=>{this.currentPage=e,o.paginationBtn(this.goodsPerPage,this.currentPage,this.orient)})),a.append(t)}return a}render(){const e=this.displayNavBtn(n,this.goodsPerPage,this.currentPage);return this.container.append(e),this.container}};class l extends i{constructor(e,t,s,a,i){super(e,t),this.goodsPerPage=12,this.currentPage=1,this.orient="vertical",this.goodsPerPage=s,this.currentPage=a,this.orient=i}renderItems(e,t,s,a){this.goodsPerPage=t,this.currentPage=s,this.orient=a;const i=Math.ceil(e.length/this.goodsPerPage);i<this.currentPage&&(this.currentPage=i);const n=this.goodsPerPage*(this.currentPage-1),r=n+this.goodsPerPage,o=e.slice(n,r).map((e=>{const t=this.elFactory("li",{class:"vertical"===this.orient?"goods-item":"goods-item goods-item-horizontal",id:e.id}),s=this.elFactory("div",{class:"goods-item-img"}),a=this.elFactory("img",{class:"img",src:e.imgs[0]}),i=this.elFactory("div",{class:"vertical"===this.orient?"goods-item-description":"goods-item-description goods-item-description-horizontal"}),n=this.elFactory("div",{class:"goods-item-description-name"}),r=this.elFactory("div",{class:"goods-item-description-screen-size"}),o=this.elFactory("div",{class:"goods-item-description-camera"}),c=this.elFactory("div",{class:"goods-item-description-memory"}),l=this.elFactory("div",{class:"goods-item-description-chipset"}),p=this.elFactory("div",{class:"goods-item-description-protection"}),d=this.elFactory("div",{class:"goods-item-description-nfc"}),h=this.elFactory("div",{class:"goods-item-description-material"}),m=this.elFactory("div",{class:"vertical"===this.orient?"goods-item-wrapper":"goods-item-wrapper goods-item-wrapper-horizontal"}),g=this.elFactory("div",{class:"goods-item-wrapper-price"}),u=this.elFactory("div",{class:"goods-item-wrapper-stock"}),v=this.elFactory("div",{class:"goods-item-wrapper-rating"}),y=document.createElement("span"),x=this.elFactory("button",{class:"goods-item-wrapper-buyButton"});x.addEventListener("click",(e=>{const t=e.target;t instanceof Element&&t.classList.toggle("goods-item-wrapper-buyButton-select")})),n.textContent=`${this.capitilizeFirstLetter(e.brand)} \n        ${e.name} ${e.memory} ${e.color} ${e.model}`,g.textContent=e.price+"$",x.textContent="Buy",u.textContent=`${e.stock}`,y.textContent="In stock: ",u.prepend(y),s.append(a),t.append(s),i.append(n);const F=this.elFactory("div",{class:"goods-item-wrapper-rating-stars"});for(let t=0;t<5;t++)if(t<e.rating){const e=this.elFactory("img",{class:"goods-item-wrapper-rating-star",src:"./assets/images/icons/rating-full.svg"});F.append(e)}else{const e=this.elFactory("img",{class:"goods-item-wrapper-rating-star",src:"./assets/images/icons/rating-empty.svg"});F.append(e)}if(v.append(F),"horizontal"===this.orient){const t=document.createElement("span");t.textContent="Name: ",n.prepend(t),n.append(";");const s=document.createElement("span");s.textContent="Screen size: ",r.textContent=`${e.displaySize};`,r.prepend(s),i.append(r);const a=document.createElement("span");a.textContent="Cameras: ",o.textContent=`${e.cameras};`,o.prepend(a),i.append(o);const m=document.createElement("span");m.textContent="Memory: ",c.textContent=`${e.memory};`,c.prepend(m),i.append(c);const g=document.createElement("span");g.textContent="Chipset: ",l.textContent=`${e.chipset};`,l.prepend(g),i.append(l);const u=document.createElement("span");u.textContent="Protection: ",p.textContent=`${e.protection};`,p.prepend(u),i.append(p);const v=document.createElement("span");v.textContent="NFC: ",d.textContent=`${this.capitilizeFirstLetter(e.nfc)};`,d.prepend(v),i.append(d);const y=document.createElement("span");y.textContent="Material: ",h.textContent=`${this.capitilizeFirstLetter(e.material)}`,h.prepend(y),i.append(h)}return t.append(i),m.append(g),t.append(u),t.append(v),m.append(x),t.append(m),t})),c=this.elFactory("ul",{class:"vertical"===this.orient?"goods":"goods goods-horizontal"});c.append(...o);const l=this.elFactory("div",{class:"main-wrapper"});return l.append(c),l}render(){const e=this.renderItems(n,this.goodsPerPage,this.currentPage,this.orient),t=new c("div","navigation-wrapper",this.currentPage,this.goodsPerPage,this.orient).render();return this.container.append(e),this.container.append(t),this.container}}const p=[{value:"name",displayValue:"Name"},{value:"new",displayValue:"New"},{value:"price-ascending",displayValue:"Price (ascending)"},{value:"price-descending",displayValue:"Price (descending)"},{value:"rating-ascending",displayValue:"Rating (ascending)"},{value:"rating-descending",displayValue:"Rating (descending)"}];class d extends i{constructor(e,t){super(e,t)}renderSortingPicker(){const e=this.elFactory("div",{class:"sorting-picker"}),t=this.elFactory("span",{class:"sorting-picker-title"});t.textContent="Sort";const s=this.elFactory("input",{class:"select-box-current-item",type:"text","current-selected-item":"",placeholder:"Select item"}),a=this.elFactory("img",{class:"select-box-open-btn-img",src:"./assets/images/icons/select-box-btn.svg",alt:"select-box-btn"}),i=this.elFactory("button",{class:"select-box-open-btn"},a),n=this.elFactory("div",{class:"sorting-picker-select-box"},s,i),r=this.elFactory("div",{class:"select-box-items"}),o=this.elFactory("div",{class:"select-box-not-found"}),c=this.elFactory("div",{class:"sorting-found"});c.textContent="Found: ";const l=this.elFactory("span",{class:"sorting-found-value"});l.textContent="0",c.append(l);const d=(e,t)=>{const a=this.elFactory("div",{class:"select-box-item",value:t});a.textContent=e,a.addEventListener("click",(()=>{((e,t)=>{s.value=e,s.setAttribute("current-selected-item",t)})(e,t)})),r.append(a)},h=()=>{p.map((e=>{d(e.displayValue,e.value)}))},m=e=>e.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,"");return h(),i.addEventListener("click",(()=>{r.classList.toggle("active")})),document.body.addEventListener("click",(e=>{e.target!==r&&e.target!==i&&e.target!==a&&e.target!=s&&e.target!==n&&e.target!==o&&r.classList.remove("active")})),s.addEventListener("input",(()=>{r.classList.add("active"),r.innerHTML="",p.map((e=>e.displayValue)).map(((e,t)=>{""!==s.value&&m(e.toLowerCase()).includes(m(s.value.toLowerCase()))&&d(p[t].displayValue,p[t].value),""===s.value&&[...r.children].length!==p.length&&(h(),s.setAttribute("current-selected-item",""))})),0===[...r.children].length&&(o.textContent="Not found",r.append(o))})),n.append(r),e.append(t),e.append(n),e.append(c),e}renderChangeGrid(){const e=this.elFactory("div",{class:"change-grid"}),t=this.elFactory("div",{class:"change-grid-to-squares change-grid-item active"},this.elFactory("div",{class:"square-grid"}),this.elFactory("div",{class:"square-grid"}),this.elFactory("div",{class:"square-grid"}),this.elFactory("div",{class:"square-grid"})),s=this.elFactory("div",{class:"change-grid-to-lines change-grid-item"},this.elFactory("div",{class:"square-grid"}),this.elFactory("div",{class:"square-grid"}),this.elFactory("div",{class:"square-grid"}),this.elFactory("div",{class:"square-grid"}));return t.addEventListener("click",(()=>{var e;t.classList.add("active"),s.classList.remove("active");const a=Number(null===(e=document.querySelector(".active-btn"))||void 0===e?void 0:e.textContent);a&&o.paginationBtn(12,a,"vertical")})),s.addEventListener("click",(()=>{var e;t.classList.remove("active"),s.classList.add("active");const a=Number(null===(e=document.querySelector(".active-btn"))||void 0===e?void 0:e.textContent);a&&o.paginationBtn(12,a,"horizontal")})),e.append(t),e.append(s),e}renderTopPanel(){const e=this.elFactory("div",{class:"top-panel"}),t=this.renderSortingPicker(),s=this.renderChangeGrid();return e.append(t),e.append(s),e}render(){const e=this.renderTopPanel();return this.container.append(e),this.container}}const h=["smartphones","watches","headphones","tablets","laptops"],m=["apple","xiaomi","samsung","asus"];class g extends i{constructor(e,t){super(e,t)}renderFiltersButtons(){const e=this.elFactory("div",{class:"filters-buttons"}),t=this.elFactory("button",{class:"filters-btn reset-filters-btn"});t.textContent="Reset filters";const s=this.elFactory("button",{class:"filters-btn copy-link-btn"});return s.textContent="Copy link",e.append(t),e.append(s),e}renderFilterOption(e){const t=this.elFactory("div",{class:"filters-item-option"}),s=this.elFactory("div",{class:"filters-item-option-checkbox",category:e,checked:!1},this.elFactory("img",{class:"filters-item-option-checkbox-img",src:"./assets/images/icons/selected-item.svg"})),a=this.elFactory("span",{class:"filters-item-option-name"});return a.textContent=this.capitilizeFirstLetter(e),t.addEventListener("click",(()=>{s.classList.toggle("active"),""===s.getAttribute("checked")?s.setAttribute("checked","false"):s.setAttribute("checked","")})),t.append(s),t.append(a),t}renderOptionHeader(e,t){const s=this.elFactory("div",{class:"filters-item-header"}),a=this.elFactory("span",{class:"filters-item-header-title"});a.textContent=e;const i=this.elFactory("button",{class:"filters-item-header-expand-btn"},this.elFactory("img",{class:"filters-item-header-expand-btn-img",src:"./assets/images/icons/filter-expand-btn.svg",alt:"filter-expand-btn"}));return i.addEventListener("click",(()=>{t.classList.toggle("active"),i.classList.toggle("active")})),s.append(a),s.append(i),s}renderFiltersItems(){const e=this.elFactory("div",{class:"filters-items"}),t=this.elFactory("div",{class:"filters-item filters-item-category active"}),s=this.renderOptionHeader("Category",t),a=this.elFactory("div",{class:"filters-item-options"});h.map((e=>{const t=this.renderFilterOption(e);a.append(t)})),t.append(s),t.append(a);const i=this.elFactory("div",{class:"filters-item filters-item-brand active"}),r=this.renderOptionHeader("Brand",i),o=this.elFactory("div",{class:"filters-item-options"});m.map((e=>{const t=this.renderFilterOption(e);o.append(t)})),i.append(r),i.append(o);const c=Math.min(...n.map((e=>+e.price))),l=Math.max(...n.map((e=>+e.price))),p=this.elFactory("div",{class:"filters-item filters-item-price active"}),d=this.renderOptionHeader("Price",p),g=this.elFactory("div",{class:"filters-item-dual-progress"}),u=this.elFactory("div",{class:"filters-item-slider-price"}),v=this.elFactory("div",{class:"filters-item-slider-price-progress"}),y=this.elFactory("div",{class:"filters-item-input-price"}),x=this.elFactory("input",{class:"filters-item-input-price-min",type:"range",min:`${c}`,max:`${l}`,value:`${c}`}),F=this.elFactory("input",{class:"filters-item-input-price-max",type:"range",min:`${c}`,max:`${l}`,value:`${l}`});v.style.left=(+x.value-+x.min)/(+x.max-+x.min)*100+"%",v.style.right=100-(+F.value-+F.min)/(+F.max-+F.min)*100+"%",y.append(x),y.append(F),u.append(v),u.append(y);const f=()=>{const e=this.elFactory("span",{class:"filters-item-values-price-currency"});return e.textContent="$",e},P=this.elFactory("div",{class:"filters-item-values-price"}),b=this.elFactory("div",{class:"filters-item-values-price-min"}),C=this.elFactory("span",{class:"filters-item-values-price-min-value"});C.textContent=`${x.value}`,b.append(C),b.append(f());const L=this.elFactory("div",{class:"filters-item-values-price-max"}),w=this.elFactory("span",{class:"filters-item-values-price-max-value"});w.textContent=`${F.value}`,L.append(w),L.append(f()),P.append(b),P.append(L),[...y.children].map((e=>{e.addEventListener("input",(e=>{let t=+x.value,s=+F.value;s-t<0?e.target===x?x.value=""+(s-0):F.value=`${t+0}`:(C.textContent=x.value,w.textContent=F.value,console.log(v.style.left),v.style.left=(t-+x.min)/(+x.max-+x.min)*100+"%",v.style.right=100-(s-+F.min)/(+F.max-+F.min)*100+"%")}))})),g.append(u),g.append(P),p.append(d),p.append(g);const k=Math.min(...n.map((e=>+e.stock))),S=Math.max(...n.map((e=>+e.stock))),E=this.elFactory("div",{class:"filters-item filters-item-stock active"}),M=this.renderOptionHeader("Stock",E),$=this.elFactory("div",{class:"filters-item-dual-progress"}),T=this.elFactory("div",{class:"filters-item-slider-stock"}),O=this.elFactory("div",{class:"filters-item-slider-stock-progress"}),I=this.elFactory("div",{class:"filters-item-input-stock"}),j=this.elFactory("input",{class:"filters-item-input-stock-min",type:"range",min:`${k}`,max:`${S}`,value:`${k}`}),H=this.elFactory("input",{class:"filters-item-input-stock-max",type:"range",min:`${k}`,max:`${S}`,value:`${S}`});O.style.left=(+j.value-+j.min)/(+j.max-+j.min)*100+"%",O.style.right=100-(+H.value-+H.min)/(+H.max-+H.min)*100+"%",I.append(j),I.append(H),T.append(O),T.append(I);const z=this.elFactory("div",{class:"filters-item-values-stock"}),R=this.elFactory("div",{class:"filters-item-values-stock-min"}),N=this.elFactory("span",{class:"filters-item-values-stock-min-value"});N.textContent=`${j.value}`,R.append(N);const q=this.elFactory("div",{class:"filters-item-values-stock-max"}),B=this.elFactory("span",{class:"filters-item-values-stock-max-value"});return B.textContent=`${H.value}`,q.append(B),z.append(R),z.append(q),[...I.children].map((e=>{e.addEventListener("input",(e=>{let t=+j.value,s=+H.value;s-t<0?e.target===j?j.value=""+(s-0):H.value=`${t+0}`:(N.textContent=j.value,B.textContent=H.value,console.log(O.style.left),O.style.left=(t-+j.min)/(+j.max-+j.min)*100+"%",O.style.right=100-(s-+H.min)/(+H.max-+H.min)*100+"%")}))})),$.append(T),$.append(z),E.append(M),E.append($),e.append(t),e.append(i),e.append(p),e.append(E),e}renderFilters(){const e=this.elFactory("div",{class:"filters"}),t=this.renderFiltersButtons(),s=this.renderFiltersItems();return e.append(t),e.append(s),e}render(){const e=this.renderFilters();return this.container.append(e),this.container}}class u extends t{constructor(e){super(e),this.filters=new g("div","filters-wrapper"),this.topPanel=new d("div","top-panel-wrapper")}render(){const e=document.createElement("main"),t=new l("div","goods-wrapper",12,1,"vertical").render();return e.classList.add("main"),e.append(this.filters.render()),e.append(this.topPanel.render()),e.append(t),this.container.append(e),this.container}}u.textObject={MainTitle:"Main Page"};const v=u;class y extends t{constructor(e){super(e)}render(){const e=this.createHeaderTitle(y.TextObject.MainTitle);return this.container.append(e),this.container}}y.TextObject={MainTitle:"Settings Page"};const x=y;class F extends i{constructor(e,t){super(e,t)}createHeaderLogo(){return this.elFactory("div",{class:"header-logo"},this.elFactory("a",{class:"header-logo-link",href:""},this.elFactory("img",{class:"header-logo-img",src:"./assets/images/icons/logo.svg",alt:"logo"})))}createCart(){const e=this.elFactory("span",{class:"header-cart-items-count-value"});return e.textContent="0",this.elFactory("div",{class:"header-cart"},this.elFactory("img",{class:"header-cart-img",src:"./assets/images/icons/cart.svg",alt:"cart"}),this.elFactory("div",{class:"header-cart-items-count"},e))}createHeaderSearch(){const e=this.elFactory("div",{class:"header-search"}),t=this.elFactory("input",{class:"header-search-input",type:"text",placeholder:"Search"}),s=this.elFactory("img",{class:"header-search-input-img",src:"./assets/images/icons/input-search.svg",alt:"input-search"}),a=this.elFactory("button",{class:"header-search-input-clear-btn"},this.elFactory("img",{class:"header-search-input-clear-img",src:"./assets/images/icons/input-clear.svg",alt:"input-clear"}));return t.addEventListener("focus",(()=>{""!=t.value&&a.classList.add("visible")})),t.addEventListener("input",(()=>{""!=t.value?a.classList.add("visible"):a.classList.remove("visible")})),a.addEventListener("mousedown",(e=>{t.value="",a.classList.remove("visible"),e.preventDefault()})),t.addEventListener("focusout",(()=>{a.classList.remove("visible")})),e.append(s),e.append(t),e.append(a),e}renderHeaderWrapper(){const e=this.elFactory("div",{class:"header"}),t=this.createHeaderLogo(),s=this.createCart(),a=this.createHeaderSearch();e.append(t),e.append(a),e.append(s),this.container.append(e)}render(){return this.renderHeaderWrapper(),this.container}}class f extends t{constructor(e,t){super(e),this.errorType=t}render(){const e=this.createHeaderTitle(f.TextObject[this.errorType]);return this.container.append(e),this.container}}f.TextObject={404:"Error! The page was not found"};const P=f;class b{static renderNewPage(e){const t=document.querySelector(`#${b.defaultPageID}`);t&&t.remove();let s=null;if(s="main-page"==e?new v(e):"settings-page"==e?new x(e):"statistics-page"==e?new a(e):new P(e,404),s){const e=s.render();e.id=b.defaultPageID,b.container.append(e)}}hashChangeHandle(){const e=window.location.hash.slice(1);e?b.renderNewPage(e):b.renderNewPage("main-page")}enableRouteChange(){window.addEventListener("hashchange",this.hashChangeHandle)}enableRouteChangeReload(){window.addEventListener("DOMContentLoaded",this.hashChangeHandle)}constructor(){this.initialPage=new v("main-page"),this.header=new F("header","header-wrapper")}run(){b.container.append(this.header.render()),b.renderNewPage("main-page"),this.enableRouteChange(),this.enableRouteChangeReload()}}b.container=document.body,b.defaultPageID="current-page",(new b).run()})();