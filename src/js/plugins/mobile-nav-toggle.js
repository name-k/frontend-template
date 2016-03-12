import assign from 'lodash/assign';
import isElement from 'lodash/isElement';
import MediaEvents from 'plugins/media-events';

export default class MobileNav {

  constructor(options) {

    let defaults = {
      elements : {
        container : '[data-component="mobile-nav"]',
        trigger   : '[data-mobile-nav="trigger"]',
        menu      : '[data-mobile-nav="menu"]',  
      },
      animation        : false,
      hideAfter        : false,
      closeOnEsc       : true,
      closeOnMissClick : true,
    };

    this.config = assign(defaults, options);


    let 
      q = document.querySelector.bind(document),
      e = this.config.elements;

    this.dom = {
      container : isElement(e.container) ? e.container : q(e.container),
      trigger   : isElement(e.trigger) ? e.trigger : q(e.trigger),
      menu      : isElement(e.menu) ? e.menu : q(e.menu),
    };


    this.flags = {
      isVisible : false,
      isAnimating : false,
      isMediaSensetive : this.config.hideAfter || false,
    };

    this.init();

  }

  init() {

    if(this.flags.isMediaSensetive) {
      let mediaEvents = new MediaEvents({
        breakpoints        : [this.config.hideAfter],
        names              : ['before', 'after'],
        scope              : this.dom.container,
        onInit             : (box) => {},
        onBreakpointChange : (box, breakpointName) => {
          if (breakpointName == 'after') {
            this.hide(1);
          }
        }
      });
    }


    if(!this.dom.menu && !this.dom.container && !this.dom.trigger) {
      console.warn('Some of the HTML nodes missing');
      return false;
    }
    
    this.dom.trigger.addEventListener('click', (event) => {
      event.preventDefault();
      this.flags.isVisible ? this.hide() : this.show();
    });
  }

  animate(action = () => {}) {
    if(this.flags.isAnimating) return false;   
    this.flags.isAnimating = true;
    action();
    this.flags.isAnimating = false;
  }


  show(delay = 0) {
    setTimeout(() => {
      this.animate();
    }, delay);
    this.flags.isVisible = true;
    this.dom.container.classList.add('has-mobile-nav');
  }

  hide(delay = 0) {
    setTimeout(() => {
      this.animate();
    }, delay);
    this.flags.isVisible = false;
    this.dom.container.classList.remove('has-mobile-nav');
  }
}