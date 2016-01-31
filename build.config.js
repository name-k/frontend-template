const dir = {
  root  : './',
  src   : 'html/src/',
  build : 'html/build/',
  wp    : 'www/wp-content/themes/webhelper/',
};

module.exports = {
  dir : dir,
  paths : {
    js : {
      // all js paths are in webpack config
    },
    styles: {
      watch   : dir.root + dir.src + 'styles/**/*.*',
      process : dir.root + dir.src + 'styles/main.*',
      build   : dir.root + dir.build + 'css/',
      wp      : dir.root + dir.wp + 'css/',
    },
    templates : {
      watch   : dir.root + dir.src + 'tpl/**/*.*',
      process : dir.root + dir.src + 'tpl/!(_)*.html',
      build   : dir.root + dir.build,
    },
    fonts : {
      process : dir.root + 'bower_components/font-awesome/fonts/*',
      build   : dir.root + dir.build + 'fonts/',
      wp   : dir.root + dir.wp + 'fonts/',
    },
    img : {
      watch   : dir.root + dir.src + 'img/**/*.@(jpg|jpeg|png|gif)',
      process : dir.root + dir.src + 'img/**/*.@(jpg|jpeg|png|gif)',
      build   : dir.root + dir.build + 'img/',
      wp      : dir.root + dir.wp + 'img/',
      svg : {
        watch   : dir.root + dir.src + '**/*.svg',
        process : dir.root + dir.src + '**/*.svg',
        build   : dir.root + dir.build + 'svg/',
        wp      : dir.root + 'www/svg/',
      },
    },  
  }
  
}