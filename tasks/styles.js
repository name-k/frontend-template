const 
  gulp     = require('gulp'),
  combiner = require('stream-combiner2').obj,
  $        = require('gulp-load-plugins')();

module.exports = function(options) {
  return function(callback) {
    return combiner(
      $.rubySass(options.src, {sourcemap: options.flags.isDev}),
        $.if(options.flags.debug, $.debug({title : 'DEBUG ' + options.taskName + ':rubySass'})),
        
      $.autoprefixer({browsers: ['> 1%'], cascade: false}),
        $.if(options.flags.debug, $.debug({title : 'DEBUG ' + options.taskName + ':autoprefixer'})),

      $.if(options.flags.isDev, $.sourcemaps.write()),
        $.if(options.flags.debug, $.debug({title : 'DEBUG ' + options.taskName + ':sourcemaps:write'})),

      $.if(options.flags.isProd, $.cssnano()),
        $.if(options.flags.debug, $.debug({title : 'DEBUG ' + options.taskName + ':cssnano'})),

      gulp.dest(options.dest),
      $.notify({
        title: 'Styles', 
        onLast: true, 
        notifier() {
          callback();
        }
      })
    ).on('error', $.notify.onError(function(err) {
      return {
        title : 'Styles',
        message: err.message
      };
    }));  
  };
};