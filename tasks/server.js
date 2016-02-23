'use strict';

const
  path    = require('path'),
  browserSync = require('browser-sync').create();

module.exports = function(options) {
  return function() {
    browserSync.init({
      server: {
        baseDir   : options.serve,
        directory : true,
        index     : 'index.html',
      },
      open      : false,
      notify    : false,
      logLevel  : 'info',
      logPrefix : 'BrowserSync',
      online    : false, // increases startup time 
    });
    browserSync.watch(path.join(options.serve, '**/*.*'))
      .on('change', browserSync.reload);
  };
};