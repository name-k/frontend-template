const del = require('del');

module.exports = function(options) {
  console.log(options);
  return function() {
    return del(options.src, {read : false});
  };
};