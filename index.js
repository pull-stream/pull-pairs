'use strict';

var looper = require('looper')

module.exports = function (test) {

  var prev = null, ended

  return function (read) {

    return function (abort, cb) {
      if(ended) return cb(ended)
      //looper makes RangeErrors not happen.
      looper(function () {
        var next = this
        read(abort, function (end, _data) {
          if(end) {
            data = test(prev, null)
            ended = end
            if(data !== undefined) cb(null, data)
            else cb(end)
            return
          }
          var data = test(prev, _data)

          prev = _data

          if(data !== undefined) cb(null, data)
          else                   next()

        })
      })()

    }

  }

}

