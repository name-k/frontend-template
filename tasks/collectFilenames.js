'use strict';

const 
  path   = require('path'),
  mkpath = require('mkpath'),
  fs     = require('fs');

module.exports  = function(options) {
  return function(callback) {
    let promises = [];
    let dirs = [];

    if(typeof options.dir === 'string') {
      dirs.push(options.dir);
    } else {
      dirs = options.dir;
    }

    dirs.forEach(path => {
      let promise = new Promise(function(resolve, reject) {
        fs.readdir(path, function(err, files) {
          if(err) {
            reject(err);
          } else {
            resolve(files);
          }
        });
      }).catch(e => e);
      promises.push(promise);
    });

    return Promise.all(promises).then((files) => {
      let includes = '';         

      for (let i = 0; i < files.length; i++) {
        files[i].forEach(fileName => {
          if(/^(?!_)/.test(fileName)) {
            let filePath = path.join(dirs[i], fileName).replace(/\\+/g, '/');
            includes += options.prepend + filePath + options.append;
          }
        });
      }

      try {
        mkpath.sync(path.dirname(options.outputFile));
      } catch(e) {
        throw new Error(e);
      }

      return fs.writeFile(
        path.resolve(options.outputFile), 
        includes, 
        (err) => {
          if(err) {
            throw new Error(err);
          }
        });
      })
      .catch(err => {
        console.log(err);
        throw new Error(err);
      });
  };
};
