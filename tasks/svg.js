const 
  gulp     = require('gulp'),
  path     = require('path'),
  combiner = require('stream-combiner2').obj,
  $        = require('gulp-load-plugins')();

module.exports = function(options) {
  return function() {
    return combiner(
      gulp.src(options.src),
      $.cached('svg'),
        $.if(options.flags.debug, $.debug({title : 'DEBUG ' + options.taskName + ':src'})),
      $.remember('svg'),
        $.if(options.flags.debug, $.debug({title : 'DEBUG ' + options.taskName + ':remembered'})),
      $.svgSymbols({
        id : '%f',
        className : '.svg-icon_%f',
        templates : [options.cssTemplate, options.svgTemplate],
        title : false,
      }),
        $.if(options.flags.debug, $.debug({title : 'DEBUG ' + options.taskName + ':processed'})),
      $.if('*.{css,sass,scss,less,styl}', 
        gulp.dest(path.join(options.tmp, 'styles')), 
        gulp.dest(options.dest))
    ).on('error', $.notify.onError(function(err) {
      console.log(err);
        return {
          title : 'SVG',
          message: err.message
        };
    }));  
  };
};