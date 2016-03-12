export default class LoadSVG {
  constructor(path) {

    this.path     = path;
    this.revision = 1;

    if(!document.createElementNS || 
      !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) {
      return true;
    }

    this.isLocalStorage = 'localStorage' in window && window['localStorage'] !== null;

    this.insert   = this.insert.bind(this);
    this.insertIT = this.insertIT.bind(this);
    this.init     = this.init.bind(this);

    this.init();

  }

  init() {
    if(this.isLocalStorage && 
      localStorage.getItem('inlineSVGrev') == this.revision) {
        this.data = localStorage.getItem('inlineSVGdata');
        if(this.data) {
          this.insert();
          return true;
        }
    }
    try {
      let request = new XMLHttpRequest();
      request.open('GET', this.path, true);
      request.onload = () => {
        if(request.status >= 200 && request.status < 400) {
          this.data = request.responseText;
          this.insert();
          if(this.isLocalStorage) {
            localStorage.setItem('inlineSVGdata', this.data);
            localStorage.setItem('inlineSVGrev', this.revision);
          }
        }
      };
      request.send();
    }
    catch(e) {
      console.error('e');
    }
  }

  insertIT() {
    document.body.insertAdjacentHTML('afterbegin', this.data);
  }

  insert() {
    if(document.body) {
      this.insertIT();
    }
    else {
      document.addEventListener('DOMContentLoaded', this.insertIT);
    }
  }


}

    
        
 
    
 
