const 
  gulp     = require('gulp'),
  combiner = require('stream-combiner2').obj,
  $        = require('gulp-load-plugins')();

module.exports = function(options) {
  return function() {
    return combiner(
      gulp.src(options.src),
      $.svgSymbols({
        id : '%f',
        className : '.svg-icon_%f',
        templates : [options.cssTemplate, options.svgTemplate],
        title : false,
      }),
        $.if(options.flags.debug, $.debug({title : 'DEBUG ' + options.taskName})),
      $.if('*.{css,sass,scss,less,styl}', gulp.dest('./tmp/styles'), gulp.dest(options.dest))
    ).on('error', $.notify.onError(function(err) {
      console.log(err);
        return {
          title : 'SVG',
          message: err.message
        };
    }));  
  };
};