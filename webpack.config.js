'use strict';

const 
  webpack = require('webpack'),
  path = require('path');

const config = require('./build.config.js');
const NODE_ENV = process.env.NODE_ENV || 'dev';  
const NODE_WATCH = process.env.NODE_WATCH != 'false';  


let jsDefaultConfig = {
  context : path.resolve(__dirname, config.dir.src, 'js/'),
  
  entry : {
    bundle : './app'
  },
  output : {
    path : path.resolve(__dirname, config.dir.build, 'js/'),
    filename : '[name].js',
    publicPath : '/js/',
    library : '[name]',
  },

  // watch files change
  watch : NODE_WATCH, 
  watchOptions : {
    // timeout until update
    aggregateTimeout : 100, 
  },

  // should use 'cheap-inline-module-source-map' if readability is important
  // 'eval' is for super speed
  devtool : NODE_ENV == 'dev' ? 'cheap-inline-module-source-map' : null, 

  resolve : {
    root : [
      path.join(__dirname)
    ],
    modulesDirectories : [
      'node_modules', 
      path.join(config.dir.src, 'js')
      ],
    extensions         : ['', '.js']
  },

  // should make it as a module 
  // and include in before all other stuff
  // https://cdn.polyfill.io/v2/polyfill.min.js

  resolveLoader : {
    modulesDirectories : ['node_modules'],
    moduleTemplates    : ['*-loader'],
    extensions         : ['', '.js'] 
  },

  module : {
    loaders : [{
      test    : /\.js$/,
      exclude : /(node_modules|bower_components)/,
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
      NODE_ENV : JSON.stringify(NODE_ENV),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name : 'common',
      minChunks : 2,
    }),
  ],

};


if(NODE_ENV == 'prod') {
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


