const assign = require('lodash/object/assign');
import $ from 'jquery';

export default class SideNavMobile {

  constructor(selectors) {
    this._config = assign({
      container : '[data-component="sidenav-mobile"]',
      source    : '[data-component-part="sidenav-source"]',
    }, selectors || {});
    this._dom = {
      container : $(this._config.container),
      source    : $(this._config.source),
    };
    this.visibilityFlag = false;

    this.handleClick = this.handleClick.bind(this);

    this.init();
  }


  init() {
    if(!this._dom.container.length) {
      return false;
    }

    if(window.currentMedia == 'large') {
      $(window).one('mediaChange.createMobileSidenav', (event) => {
        console.log('should be called once');
        this._dom.links = this._dom.source.children();
        this.render();        
      });
      return false;
    } else {
      console.log('not large', window.currentMedia);
    }


    this._dom.links = this._dom.source.children();
    this.render();
  }


  render() {
    let
      wrapper = $('<div />', {
        'class' : 'sidenav-mobile__wrapper'
      }).appendTo(this._dom.container),
      box = $('<div />', {
        'class' : 'sidenav-mobile__list'
      }).appendTo(wrapper),
      boxWrapper = $('<div />', {
        'class' : 'sidenav-mobile__list__wrapper'
      }).appendTo(box),
      button = $('<button />', {
        'class' : 'sidenav-mobile__button'
      })
        .text('All Categories')
        .prependTo(wrapper)
        .on('click', this.handleClick);

    for (let i = 0; i < this._dom.links.length; i++) {
      let link = $(this._dom.links[i]).find('a');
      $('<a />', {
        'href' : link.attr('href')
      }).text(link.text()).appendTo(boxWrapper);
    }
  }

  handleClick(event) {
    event.preventDefault();
    console.log('click');
    if(!this.visibilityFlag) {
      this._dom.container.addClass('active');
      this.visibilityFlag = true;
    } 
    else {
      this._dom.container.removeClass('active');
      this.visibilityFlag = false;
    }
  }

}