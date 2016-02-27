export default class GoogleFontsAsync {
  constructor(options) {
    this.config = options;
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