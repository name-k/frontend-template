'use strict';

const 
  path = require('path'),
  fs = require('fs');

module.exports  = function(options) {
  return function(callback) {
    return new Promise(function(resolve, reject) {
      fs.readdir(path.resolve(options.dir), function(err, files) {
        if(err) {
          reject(err);
        } else {
          resolve(files);
        }
      });
    })
      .then((dirs) => {
        let includes = '';
        dirs.forEach((path) => {
          if(/^(?!_)/.test(path)) {
            includes += 'include ' + path.replace(/\.jade/, '') + '\n';
          }
        });
        return fs.writeFile(
          path.resolve(options.dir, options.collectionName) + '.jade', 
          includes, 
          (err) => {
            if(err){
              reject(err);
            }
          });
      })
      .catch(err => {
        console.log(err);
        throw new Error(err);
      });
  };
};
