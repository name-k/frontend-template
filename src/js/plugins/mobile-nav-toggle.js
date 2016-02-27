import $ from 'jquery';

export default class MobileNav {

  constructor(options) {

    this._selectors = {
      header  : '[data-component=header]',
      trigger : '[data-component="mobile-nav-trigger"]',
      nav     : '[data-component="mobile-nav"]',
    };

    this._dom = {
      header  : $(this._selectors.header),
      trigger : $(this._selectors.trigger),
      nav     : $(this._selectors.nav),
    };

    this.visibilityFlag = false;

    this.init();
  }

  init() {

    if(!this._dom.nav.length) {
      return false;
    }
    
    this._dom.trigger.on('click.mobileNav', (event) => {
      event.preventDefault();


      if(window.currentMedia == 'large') {
        return false;
      }

      if(this.visibilityFlag) {
        this.hide();
      }
      else {
        this.show(); 
      }
      
    });

    // disabled because of bug
    // it was always found a click ounside of the nav
    // bad target check
    // $(document).on('click.mobileNavMissed', (event) => {
    //   event.preventDefault();

    //   if(window.currentMedia == 'large') {
    //     return false;
    //   }

    //   let $target = $(event.target);
    //   if($target.is(':not(' + this._selectors.nav + ')') || $target.is(':not(' + this._selectors.header + ')')) {
    //     if(this.visibilityFlag) {
    //       this.hide();
    //     }
    //   }
    // });

    // always show on large media size
    $(window).on('mediaChange', (event, newMedia) => {
      if(newMedia == 'large' && !this.visibilityFlag) {
        this.show(1);
      } else if (newMedia != 'large') {
        this.hide(1);
      }
    });
  }


  show(delay = 300) {
    if(this._dom.nav.is(':animated')) {
      return false;
    }
    // this._dom.nav.fadeIn(delay);
    this._dom.header.addClass('has-mobile-nav');
    this.visibilityFlag = true;
  }

  hide(delay = 300) {
    if(this._dom.nav.is(':animated')) {
      return false;
    }
    // this._dom.nav.fadeOut(delay);
    this._dom.header.removeClass('has-mobile-nav');
    this.visibilityFlag = false;
  }


}