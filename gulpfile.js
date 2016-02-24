'use strict';

const
  gulp        = require('gulp'),
  $           = require('gulp-load-plugins')(),
  path        = require('path'),
  combiner    = require('stream-combiner2');

const config = require('./build.config.js');

if(config.flags.debug) {
  require('trace');
  require('clarify');
}

// performs lazy load for tasks
let lazyTask = function(taskName, path, options) {
  if(!options) {
    let options = {};
  }
  options.taskName = taskName;
  options.flags = config.flags;
  gulp.task(taskName, function(callback) {
    let task = require(path).call(this, options);
    return task(callback);
  });
};


lazyTask('server', './tasks/server', {
  serve : config.dir.build
});

lazyTask('clean', './tasks/clean', {
  src : [config.dir.build, config.dir.tmp]
});

lazyTask('images', './tasks/images', {
  src  : config.paths.img.src,
  dest : config.paths.img.dest
});

lazyTask('svg', './tasks/svg', {
  src         : config.paths.svg.src,
  dest        : config.paths.svg.dest,
  tmp         : config.dir.tmp,
  svgTemplate : config.paths.svg.templates.svg,
  cssTemplate : config.paths.svg.templates.css,
});

lazyTask('styles', './tasks/styles', {
  src : config.paths.styles.src,
  dest : config.paths.styles.dest,
});

lazyTask('jade', './tasks/templates', {
  src  : config.paths.templates.src,
  dest : config.paths.templates.dest,
  data : require(path.resolve(config.dir.tpl, 'content-data/data.js')),
});
lazyTask('jade:mixins', './tasks/collectJadeMixins', {
  dir : path.join(config.dir.tpl, 'mixins'),
  outputFile : path.resolve(process.cwd(), config.dir.tmp, 'templates/mixins.jade')
});
gulp.task('templates', gulp.series('jade:mixins', 'jade'));

lazyTask('fonts', './tasks/assets', {
  src : config.paths.fonts.src,
  dest : config.paths.fonts.dest,
});
lazyTask('imggag', './tasks/assets', {
  src : config.paths.imggag.src,
  dest : config.paths.imggag.dest,
});

lazyTask('js', './tasks/js', config);






gulp.task('watch:main', function() {
  if(config.flags.shouldWatch) {
    gulp.watch(config.paths.js.watch, gulp.series('js'));
    gulp.watch(config.paths.styles.watch, gulp.series('styles'));
    gulp.watch(config.paths.templates.watch, gulp.series('templates'));
  }
});
gulp.task('watch:assets', function() {
  if(config.flags.shouldWatch) {
      gulp.watch(config.paths.img.watch, gulp.series('images'));
      gulp.watch(config.paths.svg.watch, gulp.series('svg'))
        .on('unlink', function(filepath) {
          $.remember('svg').forget(path.resolve(filepath));
          delete $.cached.caches.svg[path.resolve(filepath)];
        });
      gulp.watch(config.paths.fonts.watch, gulp.series('fonts'));
      gulp.watch(config.paths.imggag.watch, gulp.series('imggag'));
  }
});
gulp.task('watch', gulp.parallel('watch:main', 'watch:assets'));




gulp.task('build:main', gulp.parallel('styles', 'templates', 'js'));
gulp.task('build:assets', gulp.parallel('fonts', 'images', 'svg', 'imggag'));
gulp.task('build', gulp.parallel('build:main', 'build:assets'));


gulp.task('dev', gulp.series('clean', 'build', gulp.parallel('watch', 'server')));
gulp.task('fastdev', gulp.series('build:main', gulp.parallel('watch:main', 'server')));



