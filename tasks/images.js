const 
  gulp     = require('gulp'),
  combiner = require('stream-combiner2').obj,
  $        = require('gulp-load-plugins')();

module.exports = function(options) {
  return function() {
    return combiner(
      gulp.src(options.src, {since : gulp.lastRun(options.taskName)}),
      $.imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true,
      }),
        $.if(options.flags.debug, $.debug({title : 'DEBUG ' + options.taskName})),
      gulp.dest(options.dest)
    ).on('error', $.notify.onError(function(err) {
      return {
        title : 'Images',
        message: err.message
      };
    }));    
  };
};

