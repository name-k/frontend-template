import assign from 'lodash/assign';

import $ from 'jquery';

export default class Slider {
  
  constructor(selectors) {

    // assing default settings with user provided settings
    this._config = assign({
      container        : '[data-component="slider"]',
      slides           : '[data-component-part="content"]',
      nav              : '[data-component-part="navigation"]',
      navButton        : '[data-component-part="navigation-button"]',
      prev             : '[data-component-part="go-prev"]',
      next             : '[data-component-part="go-next"]',
      pagination       : '[data-component-part="pagination"]',
      paginationButton : '[data-component-part="pagination-button"]',
    }, selectors || {});

    // this._dom - is to keep dom nodes of current slider instanse
    this._dom = {};
    this._slidesLength = null;
    this.autoChangeTimer = null;

    // run initialization
    this.init();
  }


  init() {
    let box = $(this._config.container);

    if(!box.length) {
      return false;
    }

    // find all dom nodes of current slider
    this._dom.container  = box;
    this._dom.pagination = box.find(this._config.pagination);
    this._dom.slides     = box.find(this._config.slides).children();
    this._dom.nav        = box.find(this._config.nav);
    this._dom.goPrev     = box.find(this._config.prev);
    this._dom.goNext     = box.find(this._config.next);
    
    this.createPagination();

    this._slidesLength = this._dom.slides.length - 1;
    this.setupEvents();

    // initiate a tam switch to index 1 - 1st element
    this.changeSliderContent(null, 0, 0);
    this.autoChangeStart();
  }


  getCurrentIndex() {
    return this._dom.slides.filter('.active').index();
  }


  createPagination() {
    for (let i = 0; i < this._dom.slides.length; i++) {
      let $button = $('<button />')
        .attr('data-component-part', 'pagination-button')
        .appendTo(this._dom.pagination);
    }
  }


  setupEvents() {
    let self = this;

    // click on the slider navigation
    this._dom.container
      .on('click.stopAutoChange', function(e) {
        self.autoChangeStop();
      })
      .on('click.navClick', this._config.navButton, function(e) {
        e.preventDefault();

        let 
          currentIndex = self._dom.slides.filter('.active'),
          $el = $(this),
          forward = ($el.data('direction') === 'next');

        if(forward) {
          self.switchNext();
        }
        else {
          self.switchToPrev();
        }
      })
      .on('click.navClick', this._config.paginationButton, function(e) {
        e.preventDefault();
        self.switchByIndex($(this).index());
      });
  }


  switchToPrev() {
    let 
      currentIndex = this.getCurrentIndex(),
      newIndex = (currentIndex < 0) ? this._slidesLength : currentIndex - 1;
      this.switchByIndex(newIndex);
  }


  switchNext() {
    let 
      currentIndex = this.getCurrentIndex(),
      newIndex = (currentIndex >= this._slidesLength) ? 0 : currentIndex + 1;
      this.switchByIndex(newIndex);
  }


  switchByIndex(newIndex, forward = true) {
    let currentIndex = this.getCurrentIndex();
    if(newIndex === currentIndex || 
      this._dom.container.filter(':animated').length) {
      return false;
    }
    else {
      this.changeSliderContent(currentIndex, newIndex);
    }
  }


  changeSliderContent(currentIndex = false, newIndex = 0, animationDuration = 300) {
    let self = this;

    // do hiding part
    this._dom.slides.eq(currentIndex).fadeOut(100, function() {

      let $next = self._dom.slides.eq(newIndex);
      self._dom.slides.not(':eq(newIndex)').removeClass('active');

      // do showing part as a callback of hiding
      $next.fadeIn(animationDuration, function () {
        $(this).addClass('active');
      });
      // 
      self._dom.pagination.children()
        .removeClass('active')
        .eq(newIndex).addClass('active');
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