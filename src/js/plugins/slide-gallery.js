import assign from 'lodash/assign';
import isElement from 'lodash/isElement';
import each from 'lodash/each';

export default class SlideGallery {
  
  constructor(options) {

    const defaults = {
      elements : {
        container        : '[data-component="slide-gallery"]',
        slidesContainer  : '[data-slide-gallery="content"]',
        nav              : '[data-slide-gallery="navigation"]',
        // navButton        : '[data-slide-gallery="navigation-button"]',
        prev             : '[data-slide-gallery="go-prev"]',
        next             : '[data-slide-gallery="go-next"]',
        pagination       : '[data-slide-gallery="pagination"]',
        // paginationButton : '[data-slide-gallery="pagination-button"]',
      },
      classList : {
        active      : 'is-active',
        prev        : 'is-prev',
        next        : 'is-next',
        inAnimation : 'is-animating'
      },
      timeout   : false,
      animation : false,
    };
    this.config = assign(defaults, options || {});
    this.init();
  }




  init() {
    this.dom = this.getDOMNodes(this.config.elements);
    if(!this.dom.container) {
      console.warn('No wrapper node found for SlideGallery on the page.');
      return false;
    }
    
    this.createPagination();

    this.slidesLength = this.dom.slides.length - 1;
    this.setupEvents();



    // initiate a tam switch to index 1 - 1st element
    this.changeSliderContent(null, 0, 0);
    this.autoChangeStart();
  }


  getDOMNodes(nodesOrSelectors) {
    let nodes = this.dom || {};
    each(nodesOrSelectors, (val, key) => {
      nodes[key] = isElement(val) ? val : document.querySelector(val);
    });
    nodes.slides = [].slice.call(nodes.slidesContainer.childNodes).filter((e) => {
      return e.nodeType == 1;
    });
    return nodes;
  }


  createPagination() {
    if(this.dom.slides.length < 1 && !this.dom.pagination) {
      console.warn('Only one slide or none');
      return false;
    }

    this.dom.paginationItems = [];
    for (let i = 0; i < this.dom.slides.length; i++) {
      let button = document.createElement('button');
      this.dom.paginationItems.push(button);
      button.addEventListener('click', () => {
        this.switchByIndex(i);
      });
      this.dom.pagination.appendChild(button);
    }
  }




  getCurrentIndex() {
    let res = [].slice.call(this.dom.slides).findIndex((el, i) => {
      if(el.nodeType == 1 && el.classList.contains('active')) {
        console.log(el.classList);
        console.log(el.classList.contains('active'));
        return true;
      }
    });
    return res;
  }


  


  setupEvents() {
    let self = this;

    // click on the slider navigation
    this.dom.container.addEventListener('click', (e) => {
      e.preventDefault();
      this.autoChangeStop();
    });


    this.dom.nav.addEventListener('click', (e) => {
      e.preventDefault();
      this.switchByArrowNavigation(e.target);
    });

    this.dom.pagination.addEventListener('click', (e) => {
      e.preventDefault();
      this.switchByPagination(e.target);
    });
  }

  switchByArrowNavigation(target) {
    if(target == this.dom.next) {
      this.switchNext();
    }
    else if(target == this.dom.prev) {
      this.switchToPrev();
    }
  }

  switchByPagination(target) {
    this.switchByIndex(this.dom.paginationItems.indexOf(target));
  }






  switchToPrev() {
    let 
      currentIndex = this.getCurrentIndex(),
      newIndex = (currentIndex <= 0) ? this.slidesLength : currentIndex - 1;
      this.switchByIndex(newIndex);
  }


  switchNext() {
    let 
      currentIndex = this.getCurrentIndex(),
      newIndex = (currentIndex >= this.slidesLength) ? 0 : currentIndex + 1;
      this.switchByIndex(newIndex);
  }


  switchByIndex(newIndex, forward = true) {
    let currentIndex = this.getCurrentIndex();

    if(newIndex == currentIndex) {
      return false;
    }
    else {
      this.changeSliderContent(currentIndex, newIndex);
    }
  }


  changeSliderContent(currentIndex = false, newIndex = 0, animationDuration = 300) {

    if(!isNaN(parseFloat(currentIndex)) && isFinite(currentIndex) && currentIndex >= 0) {
      this.dom.slides[currentIndex].classList.remove('active');
    }

    this.dom.slides[newIndex].classList.add('active');
    // do hiding part
  

    this.dom.paginationItems.forEach((el, i) => {
      if(newIndex == i) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }


  autoChangeStart(timeout = 7000) {
    let self = this;
    self.autoChangeTimer = setInterval(() => {
      self.switchNext();
    }, timeout);
  }

  autoChangeStop() {
    clearInterval(this.autoChangeTimer);
  }

}