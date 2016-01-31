'use strict';

const
  gulp          = require('gulp'),
  plugins       = require('gulp-load-plugins')({}),
  path          = require('path'),
  webpack       = require('webpack'),
  webpackStream = require('webpack-stream'),
  browserSync   = require('browser-sync'),
  chokidar      = require('chokidar'),
  panini        = require('panini'),
  run           = require('run-sequence');

const 
  webpackConfig = require('./webpack.config.js'),
  config        = require('./build.config.js'),
  paths         = config.paths;

const NODE_ENV = process.env.NODE_ENV || 'dev';


// Task
gulp.task('styles', () => {
  return gulp.src(paths.styles.process)
    .pipe(plugins.plumber({
        errorHandler: plugins.notify.onError('Styles error <%= error %>')
      }
    ))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer({
      browsers: ['> 1%'],
      cascade: false
    }))
    .pipe(NODE_ENV == 'prod' ? plugins.cssnano() : '')
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(paths.styles.build))
    .pipe(browserSync.stream({match: '**/*.css'}))
    .pipe(plugins.notify({
      title: 'Styles',
      message: 'File: <%= file.relative %>',
      onLast: true
    }));
});


gulp.task('templates', () => {
  return gulp.src(paths.templates.process)
    .pipe(plugins.plumber({
      errorHandler: plugins.notify.onError('Templates task error: <%= error.message %>')
    }))
    .pipe(panini({
      root     : config.dir.src + 'tpl/',
      layouts  : config.dir.src + 'tpl/layouts/',
      partials : config.dir.src + 'tpl/partials/',
      helpers  : config.dir.src + 'tpl/helpers/',
      data     : config.dir.src + 'tpl/data/',
    }))
    .pipe(NODE_ENV == 'prod' ? plugins.htmlclean() : '')
    .pipe(NODE_ENV == 'prod' ? plugins.jsbeautifier({indentSize: 2}) : '')
    .pipe(gulp.dest(paths.templates.build))
    .pipe(plugins.notify({
      title: 'Templates',
      message: 'File: <%= file.relative %>',
      onLast: true
    }));
});


gulp.task('js', () => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new plugins.util.PluginError("JS", err);
    }
    plugins.util.log("[js]", stats.toString({ colors: true }));
  });

}); 


gulp.task('img', () => {
  return gulp.src(paths.img.process)
    .pipe(plugins.plumber({
      errorHandler: plugins.notify.onError('Image task error: <%= error.message %>')
    }))
    .pipe(plugins.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(paths.img.build))
    .pipe(plugins.notify({
      title: 'Images',
      onLast: true
    }));
});

gulp.task('svg', () => {
  gulp.src(paths.img.svg.process)
    .pipe(plugins.plumber({
      errorHandler: plugins.notify.onError('Error: <%= error.message %>')
    }))
    .pipe(plugins.svgSymbols())
    .pipe(gulp.dest(paths.img.svg.build))
    .pipe(plugins.notify({
      title: 'SVG Images',
      onLast: true
    }));
});

gulp.task('fonts', () => {
  gulp.src(paths.fonts.process)
    .pipe(plugins.plumber({
      errorHandler: plugins.notify.onError('Error: <%= error.message %>')
    }))
    .pipe(gulp.dest(paths.fonts.build))
    .pipe(plugins.notify({
      title: 'Fonts',
      onLast: true
    }));
});


gulp.task('clean', () => {
  return gulp.src(config.dir.build)
    .pipe(plugins.clean({force: true}));
});



gulp.task('server', () => {
  browserSync({
    server: {
      baseDir   : config.dir.build,
      directory : true,
      index     : 'index.html',
    },
    ghostMode: {
      clicks : false,
      forms  : false,
      scroll : false,
    },
    open      : false,
    notify    : false,
    logLevel  : 'info',
    logPrefix : 'BrowserSync',
    online    : true, // increases startup time 
  });
});


gulp.task('empty', () => {
  // ... empty
  // used as a gag for run sequence
});


gulp.task('watch', () => {
  chokidar
    .watch(paths.styles.watch, {ignoreInitial : true})
    .on('change', (event, path) => {
      setTimeout(()=>{
        run('styles');
      }, 1000);
    });
  chokidar
    .watch('./html/src/js/**/*.*', {ignoreInitial : true})
    .on('change', (event, path) => {
      run('empty', browserSync.reload);
    });
  chokidar
    .watch(paths.templates.watch, {ignoreInitial : true})
    .on('change', (event, path) => {
      // refrest panini file index
      panini.refresh();
      run('templates', browserSync.reload);
    });
});



// Tasks
gulp.task('default', [], () => {
  console.warn(`>>> You should not use 'gulp' directly`);
  console.info(`>>> Run 'npm run prod' for production build and 'gulp dev' for full developer environment.`);
  console.info(`>>> Run 'npm run dev' to start quickly without cleaning and processing static files.`);
  console.warn(`>>> If you are on Windows machine, use 'win-' prefix before npm scripts, like this 'npm run win-dev'`);
});


gulp.task('processNonStatic', () => {
  run(['templates', 'styles', 'js']);
});
gulp.task('processStatic', () => {
  run(['img', 'fonts', 'svg']);
});


// just build
gulp.task('build', () => {
  run('clean', ['processNonStatic', 'processStatic']);
});


// runs full developer environment
gulp.task('dev', () => {
  run('build', 'server', 'watch');
});


// quick start without processing static files
gulp.task('quick', () => {
  run('processNonStatic', 'server', 'watch');
});
