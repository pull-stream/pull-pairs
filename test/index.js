'use strict';

var tape = require('tape')
var pull = require('pull-stream')
var pairs = require('../')

tape('simple', function (t) {

  t.plan(4)

  var expected = [
    [null, 1],
    [1, 2],
    [2, 3],
    [3, null]
  ]

  pull(
    pull.values([1, 2, 3]),
    pairs(function (a, b) {
      t.deepEqual([a, b], expected.shift())
    }),
    pull.drain(null, function (err) {
      if(err) throw err

      t.end()
    })

  )

})

tape('filter', function (t) {

  pull(
    pull.values([1,2,3,4,5,6]),
    pairs(function (a, b) {
      //filter to pairs where a is odd
      console.log(a, b)
      if(1 & a) return [a, b]
    }),
    pull.collect(function (err, ary) {
      t.deepEqual([
        [1, 2],
        [3, 4],
        [5, 6]
      ], ary)
      t.end()
    })
  )
})

tape('filter everything', function (t) {
  var n = 0, c = 0
  pull(
    function (abort, cb) {
      if(++c <= 10000) cb(null, c)
      else           cb(true)
    },
    pairs(function () {
      n++
    }),
    pull.drain(function (d) {
      throw new Error('should not call this')
    }, function (err) {
      if(err) throw err
      t.equal(n, 10001)
      t.end()
    })
  )

})
