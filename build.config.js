'use strict';

let dir = {};

dir.root   = './';
dir.src    = dir.root + 'src/';
dir.build  = dir.root + 'build/';
dir.stl    = dir.src + 'stl/';
dir.tpl    = dir.src + 'tpl/';
dir.js     = dir.src + 'js/';
dir.fonts  = dir.src + 'fonts/';
dir.img    = dir.src + 'img/';
dir.dsgn   = dir.src + 'img/design/';
dir.svg    = dir.src + 'img/svg/';
dir.imggag = dir.src + 'img/gag/';

module.exports = {
  dir : dir,
  paths : {
    js : {
      // all js paths are in webpack config
    },
    styles: {
      watch   : dir.stl + '**/*.*',
      process : dir.stl + 'main.*',
      build   : dir.build + 'css/',
    },
    templates : {
      watch   : dir.tpl + '**/*.*',
      process : dir.tpl + '!(_)*.jade',
      build   : dir.build,
    },
    fonts : {
      process : dir.fonts + '**.*',
      build   : dir.build + 'fonts/',
    },
    img : {
      watch   : dir.dsgn + '**/*.@(jpg|jpeg|png|gif)',
      process : dir.dsgn + '**/*.@(jpg|jpeg|png|gif)',
      build   : dir.build + 'img/',
      svg : {
        watch   : dir.svg + '**/*.svg',
        process : dir.svg + '**/*.svg',
        build   : dir.build + 'img/svg/',
      },
      gag : {
        watch   : dir.imggag + '**/*.@(jpg|jpeg|png|gif)',
        process : dir.imggag + '**/*.@(jpg|jpeg|png|gif)',
        build   : dir.build + 'pic/',
      }
    },  
  }
  
}