'use strict';

const 
  gulplog       = require('gulplog'),
  path          = require('path'),
  webpack       = require('webpack'),
  notifier      = require('node-notifier');



module.exports = function(config) {

  let webpackConfig = {
    context : config.paths.js.context,
    entry : {
      bundle : './src/js/app'
    },
    output : {
      path       : config.paths.js.dest,
      filename   : '[name].js',
      publicPath : config.paths.js.publicPath,
      library    : '[name]',
    },
    watch : config.flags.shouldWatch, 
    watchOptions : {
      aggregateTimeout : 100, 
    },
    devtool : config.flags.isDev ? 'cheap-module-inline-source-map' : null, 
    resolve : {
      root : path.join(__dirname),
      modulesDirectories : ['node_modules', 'src/js'],
      extensions         : ['', '.js']
    },
    resolveLoader : {
      modulesDirectories : ['node_modules'],
      moduleTemplates    : ['*-loader'],
      extensions         : ['', '.js'] 
    },
    module : {
      loaders : [{
        test    : /\.js$/,
        include : config.paths.js.rootJSPath,
        loader  : 'babel?presets[]=es2015',
      }],
    },
    plugins : [
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        NODE_ENV : JSON.stringify(config.flags.mode),
      })
    ],
  };

  if(config.flags.isProd) {
    webpackConfig.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress : {
          warnings     : false,
          drop_console : true,
          unsafe       : true,
        }
      })
    );
  }

  return function(callback) {
    webpack(webpackConfig, function(err, stats) {
      if(!err) {
        err = stats.toJson().errors[0];
      }

      if(err) {
        notifier.notify({
          title : 'Webpack',
          message : err
        });
        gulplog.error(err);
      }
      else {
        gulplog.info(stats.toString({
          colors       : true,
          hash         : config.flags.debug,
          cached       : config.flags.debug,
          cachedAssets : config.flags.debug,
          chunkOrigins : config.flags.debug,
          chunkModules : config.flags.debug,
          // chunks       : false,
          // assets       : false,
          // version      : false,
          // timings      : false,
        }));
      }

      if(!config.shouldWatch && err) {
        callback(err);
      }
      else {
        callback();
      }



    });
  };
};