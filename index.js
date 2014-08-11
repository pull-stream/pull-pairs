var looper = require('looper')

module.exports = function (test) {

  var prev = null

  return function (read) {

    return function (abort, cb) {

      //looper makes RangeErrors not happen.
      looper(function () {
        var next = this
        read(abort, function (end, _data) {
          if(end) return cb(end)

          var data = test(prev, _data)

          prev = _data

          if(data !== undefined) cb(null, data)
          else                   next()

        })
      })()

    }

  }

}

