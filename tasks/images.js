const 
  gulp     = require('gulp'),
  combiner = require('stream-combiner2').obj,
  $        = require('gulp-load-plugins')();

module.exports = function(options) {
  return function() {
    return combiner(
      gulp.src(options.src, {since : gulp.lastRun(options.taskName)}),
      $.newer(options.dest),
        $.if(options.flags.debug, $.debug({title : 'DEBUG ' + options.taskName + ':newer'})),
      $.imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true,
      }),
        $.if(options.flags.debug, $.debug({title : 'DEBUG ' + options.taskName + ':processed '})),
      gulp.dest(options.dest)
    ).on('error', $.notify.onError(function(err) {
      return {
        title : 'Images',
        message: err.message
      };
    }));    
  };
};

