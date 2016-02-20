const 
  gulp     = require('gulp'),
  combiner = require('stream-combiner2').obj,
  $        = require('gulp-load-plugins')();

module.exports = function(options) {
  return function() {
    return combiner(
      gulp.src(options.src, {since : gulp.lastRun(options.taskName)}),
        $.if(options.flags.debug, $.debug({title : 'DEBUG ' + options.taskName})),
      $.newer(options.dest),
        $.if(options.flags.debug, $.debug({title : 'DEBUG ' + options.taskName + ':newer'})),
      gulp.dest(options.dest)
    ).on('error', $.notify.onError(function(err) {
      console.log(err);
        return {
          title : options.taskName,
          message: err.message
        };
    }));  
  };
};