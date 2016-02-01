'use strict';

const
  gulp          = require('gulp'),
  plugins       = require('gulp-load-plugins')({}),
  path          = require('path'),
  webpack       = require('webpack'),
  browserSync   = require('browser-sync'),
  chokidar      = require('chokidar'),
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
    .pipe(plugins.if(NODE_ENV == 'prod', plugins.cssnano()))
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
  let data = require(config.dir.tpl + 'content-data/data.js');
  return gulp.src(paths.templates.process)
    .pipe(plugins.plumber({
      errorHandler: plugins.notify.onError('Templates task error: <%= error.message %>')
    }))
    .pipe(plugins.jade({
      locals : data,
      pretty : NODE_ENV == 'prod' ? true : false,
    }))
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
  let
    svgTemplatesPath = path.resolve(config.dir.img, 'svg-sprite-templates/'),
    stylesTemplate = path.join(svgTemplatesPath, 'svg-icons.css'),
    svgTemplate = path.join(svgTemplatesPath, 'svg-icons.svg');

  gulp.src(paths.img.svg.process)
    .pipe(plugins.plumber({
      errorHandler: plugins.notify.onError('Error: <%= error.message %>')
    }))
    .pipe(plugins.svgSymbols({
      id : '%f',
      className : '.svg-icon_%f',
      templates : [stylesTemplate, svgTemplate],
      title : false,
    }))
    // only for svg file
    .pipe(gulp.dest(paths.img.svg.build))
    // only for css file
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
    online    : false, // increases startup time 
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
  run(['img', 'fonts']);
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
