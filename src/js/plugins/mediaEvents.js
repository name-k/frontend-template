import $ from 'jquery';
const assign = require('lodash/assign');
const debounce = require('lodash/debounce');
const bindAll = require('lodash/bindAll');

export default class MediaEvents {

  constructor(breakpoints) {

    this._breakpoints = assign({
      small  : 640,
      medium : 1024,
      large  : 1200,
    }, breakpoints || {});

    bindAll(this, ['onWindowResize']);


    this.init();

  }
  

  init() {
    $(window).on('resize', debounce(this.onWindowResize, 200));
    this.onWindowResize();
  }


  onWindowResize(event) {
    let 
      self = this,
      $win = $(window),
      winWidth = $win.width(),
      newMedia;

    if(winWidth <= self._breakpoints.small) {
      newMedia = 'small';
    }
    else if (winWidth > self._breakpoints.small && 
            winWidth <= self._breakpoints.medium) {
      newMedia = 'medium';
    }
    else {
      newMedia = 'large';
    }
    $win.trigger('mediaChange', newMedia);
    window.currentMedia = newMedia;
  }

}




