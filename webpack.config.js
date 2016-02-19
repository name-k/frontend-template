'use strict';

const 
  webpack = require('webpack'),
  path = require('path');

const config = require('./build.config.js');


let jsDefaultConfig = {
  context : path.resolve(__dirname, config.dir.js),
  
  entry : {
    bundle : './app'
  },
  output : {
    path : config.paths.js.absoluteRoot,
    filename : '[name].js',
    publicPath : config.paths.js.publicJS,
    library : '[name]',
  },

  // watch files change
  watch : config.flags.shouldWatch, 
  watchOptions : {
    // timeout until update
    aggregateTimeout : 100, 
  },

  // should use 'cheap-inline-module-source-map' if readability is important
  // 'eval' is for super speed
  devtool : config.flags.isDev ? 'cheap-module-inline-source-map' : null, 

  resolve : {
    root : [
      path.join(__dirname)
    ],
    modulesDirectories : ['node_modules', config.dir.js],
    extensions         : ['', '.js']
  },

  // should make it as a module 
  // and include in before all other stuff
  // https://cdn.polyfill.io/v2/polyfill.min.js

  // resolveLoader : {
  //   modulesDirectories : ['node_modules'],
  //   moduleTemplates    : ['*-loader'],
  //   extensions         : ['', '.js'] 
  // },

  module : {
    loaders : [{
      test    : /\.js$/,
      include : config.dir.js,
      loader  : 'babel?presets[]=es2015',
    }],

    // do not parse dependencies from
    // noParse : /regexp/,
  },

  plugins : [
    new webpack.ProvidePlugin({
      // $               : 'jquery',
      // jQuery          : 'jquery',
      // 'window.jQuery' : 'jquery',
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV : JSON.stringify(config.flags.mode),
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name : 'common',
    //   minChunks : 2,
    // }),
  ],
};
if(config.flags.isProd) {
  jsDefaultConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress : {
        warnings     : false,
        drop_console : true,
        unsafe       : true,
      }
    })
  );
}



module.exports = jsDefaultConfig;


