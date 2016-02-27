import assign from 'lodash/assign';
import MediaEvents from 'plugins/media-events';

export default class DebugGagOverlay {
  constructor(options = {}) {
    const defaults = {
      container       : document.body,
      opacity         : '.5',
      position        : '50% 0',
      backgroundColor : 'transparent',
      breakpoints     : false,
      currentPath     : location.pathname.slice(1),
      shortCut : {
        ctrlKey  : false,
        shiftKey : true,
        altKey   : true,
        keyCode  : 219,
      }
    };
    this.config = assign(defaults, options);

    this.mediaSensetive = this.config.breakpoints ? true : false;
    this.gag = false;
    this.init();
  }


  init() {
    this.box = document.createElement('div');

    if(this.mediaSensetive) {
      let mediaEvents = new MediaEvents({
        breakpoints : this.config.breakpoints,
        scope       : this.box,
        onInit             : (box) => {
          let index = box.daMediaEventsData.names.indexOf(box.currentBreakpoint);
          this.getGagPathByMask(index);
        },
        onBreakpointChange : (box, breakpoint) => {
          let index = box.daMediaEventsData.names.indexOf(box.currentBreakpoint);
          this.getGagPathByMask(index);
          this.onGagChange();
        }
      });
    } else {
      this.getGagPath();
    }

    this.loadImage(() => {
      this.render();
      this.setupHotkeys();
    });  
  }


  getGagPath() {
    this.config.gags.forEach((el) => {
      if(el.page == this.config.currentPath) {
        this.gag = el.img;
      }
    });  
  }


  getGagPathByMask(index) {
    this.config.gags.forEach((el) => {
      if(el.page == this.config.currentPath) {
        this.gag = el.mask.replace('%s', index);
      }
    });   
  }


  loadImage(callback) {
    let image = new Image();
    image.addEventListener('load', (error) => {
      this.config.height = image.height + 'px';
      callback();
    });
    image.src = this.gag;
  }


  render() {
    this.box.style.opacity            = this.config.opacity;
    this.box.style.backgroundPosition = this.config.position;
    this.box.style.backgroundColor    = this.config.backgroundColor;
    this.box.style.height             = this.config.height;
    this.box.style.width              = '100%';
    this.box.style.top                = '0';
    this.box.style.left               = '0';
    this.box.style.zIndex             = '99999999999';
    this.box.style.position           = 'absolute';
    this.box.style.display            = 'none';
    this.box.style.backgroundRepeat   = 'no-repeat';
    this.box.style.backgroundImage    = `url("${this.gag}")`;

    this.config.container.appendChild(this.box);
  }

  onGagChange() {
    this.box.style.backgroundImage = `url("${this.gag}")`;
    this.box.style.height = this.config.height;
  }


  setupHotkeys() {
    let keys = this.config.shortCut;
    document.addEventListener('keyup', (event) => {
      if(
        event.ctrlKey  == keys.ctrlKey && 
        event.shiftKey == keys.shiftKey && 
        event.altKey   == keys.altKey && 
        event.keyCode  == keys.keyCode
        ) {
        this.box.style.display = this.box.style.display == 'none' ? '' : 'none';
      }
    });
  }

}