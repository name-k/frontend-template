'use strict';

const path = require('path');

let dir = {};
dir.root   = './';
dir.src    = path.join(dir.root, 'src');
dir.build  = path.join(dir.root, 'build');
dir.tmp    = path.join(dir.root, 'tmp');
dir.stl    = path.join(dir.src, 'stl');
dir.tpl    = path.join(dir.src, 'tpl');
dir.js     = path.join(dir.src, 'js');
dir.fonts  = path.join(dir.src, 'fonts');
dir.img    = path.join(dir.src, 'img');
dir.svg    = path.join(dir.src, 'svg');
dir.dsgn   = path.join(dir.src, 'img/design');
dir.svg    = path.join(dir.src, 'img/svg');
dir.imggag = path.join(dir.src, 'img/pic');

let flags = {};
flags.mode        = process.env.NODE_ENV || 'dev';
flags.isDev       = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';
flags.isProd      = process.env.NODE_ENV == 'prod';
flags.debug       = process.env.NODE_DEBUG == 'true';
flags.shouldWatch = !process.env.NODE_WATCH || process.env.NODE_WATCH == 'true';

module.exports = {
  dir, flags,
  paths : {
    js : {
      context      : path.resolve(process.cwd()),
      rootJSPath   : path.resolve(process.cwd(), dir.js),
      publicPath   : '/js/',
      dest         : path.join(dir.build, 'js'),
    },
    styles: {
      watch : path.join(dir.stl, '**/*.*'),
      src   : path.join(dir.stl, 'main.*'),
      dest  : path.join(dir.build, 'css'),
    },
    templates : {
      watch : dir.tpl + '**/*.*',
      src   : dir.tpl + '!(_)*.jade',
      dest  : dir.build,
    },
    fonts : {
      src  : path.join(dir.fonts, '**.*'),
      dest : path.join(dir.build, 'fonts'),
    },
    img : {
      watch : path.join(dir.dsgn, '**/*.@(jpg|jpeg|png|gif)'),
      src   : path.join(dir.dsgn, '**/*.@(jpg|jpeg|png|gif)'),
      dest  : path.join(dir.build, 'img'),
    },
    imggag : {
      watch : path.join(dir.imggag, '**/*.@(jpg|jpeg|png|gif)'),
      src   : path.join(dir.imggag, '**/*.@(jpg|jpeg|png|gif)'),
      dest  : path.join(dir.build, 'pic'),
    },
    svg : {
      watch : path.join(dir.svg, '**/*.svg'),
      src   : path.join(dir.svg, '**/*.svg'),
      dest  : path.join(dir.build, 'svg'),
      templates : {
        svg : path.resolve(dir.img, 'svg-sprite-templates/svg-sprite.svg'),
        css : path.resolve(dir.img, 'svg-sprite-templates/svg-sprite.css'),
      },
    },  
  }
  
}