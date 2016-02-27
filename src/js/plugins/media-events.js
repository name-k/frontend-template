import assign from 'lodash/assign';
import debounce from 'lodash/debounce';
import bindAll from 'lodash/bindAll';


export default class MediaEvents {

  constructor(options = {}) {

    this.config = assign({
      breakpoints : [480, 720, 1024, 1400],
      names       : ['small', 'medium', 'large', 'xlarge', 'xxlarge'],
      scope       : window,
      onInit             : () => {},
      onBreakpointChange : () => {},
    }, options);

    bindAll(this, ['onWindowResize']);

    this.init();
  }
  

  init() {
    if(this.config.scope.daMediaEventsExists) {
      console.warn('MediaEvents already initialized on ', this.config.scope);
      return false;
    } 

    this.complementNames();

    this.config.scope.daMediaEventsExists = true;
    this.config.scope.daMediaEventsData   = this.config;
    window.addEventListener('resize', debounce(this.onWindowResize, 200));
    this.onWindowResize();

    // callback
    this.config.onInit(this.config.scope);
  }


  complementNames() {
    for (let i = this.config.names.length; i < this.config.breakpoints.length + 1; i++) {
      this.config.names.push(`breakpoint-${this.config.breakpoints[i-1] || 'min'}-${this.config.breakpoints[i] || 'max'}`);
    }
  }


  onWindowResize() {
    let 
      currentWidth = document.body.clientWidth,
      b = this.config.breakpoints;

    for(let i = 0; i < b.length; i++) {
      if(!b[i - 1] && currentWidth <= b[i]) {
        this.dispatchBreakpoint(this.config.names[i]);
        break;
      }
      else if(currentWidth > b[i - 1] && 
        currentWidth <= b[i]) {
        this.dispatchBreakpoint(this.config.names[i]);
        break;
      } else if(currentWidth > b[b.length - 1]) {
        this.dispatchBreakpoint(this.config.names[b.length]);
        break;
      } 
    }
  }


  dispatchBreakpoint(label) {
    let event = new CustomEvent('mediaChange', {
      breakpoint : label
    });
    this.config.scope.dispatchEvent(event);
    this.config.scope.currentBreakpoint = label;

    // callback triggers 
    if(this.hasStartedBefore) {
      this.config.onBreakpointChange(this.config.scope, label);
    }
    this.hasStartedBefore = true;
  }


}




