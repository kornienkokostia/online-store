import Filtration from "../filtration/filtration";

class Routing {
  static urlString: string = "#main";

  static changeURL(value: string) {
    this.urlString = window.location.hash;

    const array = value.split("&")[1];

    let fil = array.split("=");  
    

    if (
      fil[0] === "smartphones" ||
      fil[0] === "headphones" ||
      fil[0] === "laptops" ||
      fil[0] === "watches" ||
      fil[0] === "tablets"
    ) {
      if (this.urlString.includes(fil[0])) {
        if (fil[1] === "false") {
          this.urlString = this.urlString.replace(
            `&${fil[0]}=${true}`,
            `&${fil[0]}=${false}`
          );
          Filtration.categoryFunc(fil[0], fil[1]);
        }
        if (fil[1] === "true") {
          this.urlString = this.urlString.replace(
            `&${fil[0]}=${false}`,
            `&${fil[0]}=${true}`
          );
          Filtration.categoryFunc(fil[0], fil[1]);
        }
      } else {
        if (fil[1] === "true") {          
          this.urlString += `&${fil[0]}=${fil[1]}`;
          Filtration.categoryFunc(fil[0], fil[1]);
        }
        if (fil[1] === "false") {
          this.urlString += `&${fil[0]}=${fil[1]}`;
          Filtration.categoryFunc(fil[0], fil[1]);
        }
      }

      // const atttr = document.querySelectorAll(
      //   ".filters-item-option-checkbox"
      // );
      // atttr.forEach((item) => {
      //   let category = item.getAttribute("category");
      //   if (category === fil[0]) {
      //     if (fil[1] === "true") {
      //       item.setAttribute("checked", "");
      //       item.classList.add("active");
      //     }
      //     if (fil[1] === "false") {
      //       item.setAttribute("checked", "false");
      //       item.classList.remove("active");
      //     }
      //   }
      // });
    }
    if (
      fil[0] === "apple" ||
      fil[0] === "samsung" ||
      fil[0] === "xiaomi" ||
      fil[0] === "asus"
    ) {
      if (this.urlString.includes(fil[0])) {
        if (fil[1] === "false") {
          this.urlString = this.urlString.replace(
            `&${fil[0]}=${true}`,
            `&${fil[0]}=${false}`
          );
          Filtration.brandFunc(fil[0], fil[1]);
        }
        if (fil[1] === "true") {
          this.urlString = this.urlString.replace(
            `&${fil[0]}=${false}`,
            `&${fil[0]}=${true}`
          );
          Filtration.brandFunc(fil[0], fil[1]);
        }
      } else {
        if (fil[1] === "true") {
          this.urlString += `&${fil[0]}=${fil[1]}`;
          Filtration.brandFunc(fil[0], fil[1]);
        }
        if (fil[1] === "false") {
          this.urlString += `&${fil[0]}=${fil[1]}`;
          Filtration.brandFunc(fil[0], fil[1]);
        }
      }
    }
    if (fil[0] === "price") {
      let left = fil[1].split("to")[0];
      let right = fil[1].split("to")[1];

      if (this.urlString.includes(fil[0])) {
        let prevLeftPrice = window.location.hash
          .split("price=")[1]
          .split("to")[0];
        let prevRightPrice = window.location.hash

          .split("price=")[1]
          .split("&")[0]
          .split("to")[1];

        this.urlString = this.urlString.replace(
          `&${fil[0]}=${prevLeftPrice}to${prevRightPrice}`,
          `&${fil[0]}=${left}to${right}`
        );

        Filtration.priceFunc(left, right);
      } else {
        this.urlString += `&${fil[0]}=${left}to${right}`;

        Filtration.priceFunc(left, right);
      }
    }
    if (fil[0] === "stock") {
      let left = fil[1].split("to")[0];
      let right = fil[1].split("to")[1];
      

      if (this.urlString.includes(fil[0])) {
        let prevLeftStock = window.location.hash
          .split("stock=")[1]
          .split("to")[0];
        let prevRightStock = window.location.hash
          .split("stock=")[1]
          .split("&")[0]
          .split("to")[1];

        this.urlString = this.urlString.replace(
          `${fil[0]}=${prevLeftStock}to${prevRightStock}`,
          `${fil[0]}=${left}to${right}`
        );

        Filtration.stockFunc(left, right);
      } else {
        this.urlString += `&${fil[0]}=${left}to${right}`;

        Filtration.stockFunc(left, right);
      }
    }
    if (fil[0] === "search") {
      if (this.urlString.includes(fil[0])) {
        let prev = window.location.hash.split("search=")[1].split("&")[0];
        

        this.urlString = this.urlString.replace(
          `&${fil[0]}=${prev}`,
          `&${fil[0]}=${fil[1]}`
        );
        Filtration.searched(fil[1]);
      } else {
        this.urlString += `&${fil[0]}=${fil[1]}`;
        Filtration.searched(fil[1]);
      }

      if (fil[1] === "") {
        this.urlString = this.urlString.replace(`&${fil[0]}=`, ``);
        Filtration.searched(fil[1]);
      }
    }

    if (fil[0] === "sort") {
      if (this.urlString.includes(fil[0])) {
        let prev = window.location.hash.split("sort=")[1].split("&")[0];

        this.urlString = this.urlString.replace(
          `&${fil[0]}=${prev}`,
          `&${fil[0]}=${fil[1]}`
        );
        Filtration.sorted(fil[1]);
      } else {
        this.urlString += `&${fil[0]}=${fil[1]}`;
        Filtration.sorted(fil[1]);
      }
    }
    

    history.pushState(null, "null", `${this.urlString}`);
    
  }
}

export default Routing;