'use strict';

const
  gulp        = require('gulp'),
  plugins     = require('gulp-load-plugins')(),
  path        = require('path'),
  combiner    = require('stream-combiner2');

const config = require('./build.config.js');

require('trace');
require('clarify');



// performs lazy load for tasks
function lazyTask(taskName, path, options) {
  if(!options) {
    let options = {};
  }
  options.taskName = taskName;
  options.flags = config.flags;
  gulp.task(taskName, function(callback) {
    let task = require(path).call(this, options);
    return task(callback);
  })
}


lazyTask('server', './tasks/server', {
  serve : config.dir.build
});

lazyTask('clean', './tasks/clean', {
  src : config.dir.build
});

lazyTask('images', './tasks/images', {
  src  : config.paths.img.src,
  dest : config.paths.img.dest
});

lazyTask('svg', './tasks/svg', {
  src         : config.paths.svg.src,
  dest        : config.paths.svg.dest,
  svgTemplate : config.paths.svg.templates.svg,
  cssTemplate : config.paths.svg.templates.css,
});

lazyTask('styles', './tasks/styles', {
  src : config.paths.styles.src,
  dest : config.paths.styles.dest,
});

lazyTask('templates', './tasks/templates', {
  src : config.paths.templates.src,
  dest : config.paths.templates.dest,
  data : require(path.resolve(config.dir.tpl, 'content-data/data.js')),
});

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
    return gulp.parallel(
      gulp.watch(config.paths.js.watch, gulp.series('js')),
      gulp.watch(config.paths.styles.watch, gulp.series('styles')),
      gulp.watch(config.paths.templates.watch, gulp.series('templates'))
    );  
  }
});
gulp.task('watch:assets', function() {
  if(config.flags.shouldWatch) {
    return gulp.parallel(
      gulp.watch(config.paths.img.watch, gulp.series('images')),
      gulp.watch(config.paths.svg.watch, gulp.series('svg')),
      gulp.watch(config.paths.fonts.watch, gulp.series('fonts')),
      gulp.watch(config.paths.imggag.watch, gulp.series('imggag'))
    );
  }
});
gulp.task('watch', function() {
  return gulp.parallel('watch:main', 'watch:assets');
});




gulp.task('build:main', function() {
  return gulp.series(gulp.parallel('styles', 'templates', 'js'));
});
gulp.task('build:assets', function() {
  return gulp.series(gulp.parallel('fonts', 'images', 'svg', 'imggag'));
});
gulp.task('build', function() {
  return gulp.series(gulp.parallel('build:main', 'build:assets'));
});


gulp.task('dev', function() {
  return gulp.series('build', gulp.parallel('watch', 'server'));
});

gulp.task('fastdev', function() {
  return gulp.series('build:main', gulp.parallel('watch:main', 'server'));
});



// // Tasks
// gulp.task('default', [], () => {
//   console.warn(`>>> You should not use 'gulp' directly`);
//   console.info(`>>> Run 'npm run prod' for production build and 'gulp dev' for full developer environment.`);
//   console.info(`>>> Run 'npm run dev' to start quickly without cleaning and processing static files.`);
//   console.warn(`>>> If you are on Windows machine, use 'win-' prefix before npm scripts, like this 'npm run win-dev'`);
// });


// gulp.task('processNonStatic', () => {
//   run(['templates', 'styles', 'js']);
// });
// gulp.task('processStatic', () => {
//   run(['img', 'fonts']);
// });


// gulp.task('build', () => {
//   run('clean', ['processNonStatic', 'processStatic']);
// });


// gulp.task('dev', () => {
//   run('build', 'server', 'watch');
// });


// gulp.task('quick', () => {
//   run('processNonStatic', 'server', 'watch');
// });
