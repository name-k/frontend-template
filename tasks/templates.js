const 
  gulp     = require('gulp'),
  combiner = require('stream-combiner2').obj,
  $        = require('gulp-load-plugins')();

module.exports = function(options) {
  return function() {
    return combiner(
      gulp.src(options.src),
        $.if(options.flags.debug, $.debug({title : 'DEBUG ' + options.taskName + ':src'})),
      $.jade({
        locals : options.data,
        pretty : options.flags.isProd,
      }),
        $.if(options.flags.debug, $.debug({title : 'DEBUG ' + options.taskName + ':compiled'})),
      gulp.dest(options.dest),
        $.if(options.flags.debug, $.debug({title : 'DEBUG ' + options.taskName + ':dest'}))
    ).on('error', $.notify.onError(function(err) {
      console.log(err);
        return {
          title : 'Templates',
          message: err.message
        };
    }));  
  };
};