const assign = require('lodash/assign');
import $ from 'jquery';

export default class Overlay {
  constructor(selectors) {

    this._selectors = assign({
      overlay : '[data-component=overlay]',
      boxes   : '[data-component-part=overlay-box]',
      links   : '[data-show-overlay]',
      close   : '[data-component-part=overlay-close]',
    }, selectors || {});

    this.dom = {
      overlay : $(this._selectors.overlay),
      boxes   : $(this._selectors.boxes),
      close   : $(this._selectors.close),
      html    : $('html'),
    };

    this.init();
  }

  init() {

    if(!this.dom.overlay.length) {
      console.log('no overlays');
      return false;
    }

    let self = this;

    $(document).on('click.overlayShow', this._selectors.links, function(event) {
      event.preventDefault();
      let 
        $link = $(this),
        targetBox = $link.data('show-overlay'),
        $overlay = $('[data-overlay-box=' + targetBox + ']');
      self.show($overlay);
    });

    $(document).on('click.overlayHide', this._selectors.close, function(event) {
      event.preventDefault();
      self.hide();
    });
  }

  show(target) {
    this.dom.html.addClass('has-overlay');
    this.dom.overlay.show(1);
    target.fadeIn(300);
  }

  hide() {
    this.dom.overlay.hide(1);
    this.dom.boxes.fadeOut(100);
    this.dom.html.removeClass('has-overlay');
  }
}