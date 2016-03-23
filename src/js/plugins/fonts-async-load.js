export default class GoogleFontsAsync {
  constructor(options) {
    this.config = options;

    // // config exaple
    // google: { 
    //   families: [
    //     'Open+Sans:400,600:latin,cyrillic',
    //     'Ubungu:400,600:latin,cyrillic',
    //   ] 
    // }

    this.init();
  }
  init() {
    window.WebFontConfig = this.config;

    let wf = document.createElement('script');
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    let s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);

  }
}