# pull-pairs

pull stream every pair of values through a function.


``` js

var pull = require('pull-stream')
var pairs = require('pull-pairs')

pull(
  pull.values([1,2,3,4,5]),
  pairs(function mapper (a, b) {
    console.log([a, b])
    //return the normal output.
    return b
  }),
  pull.drain()
)

```
`console.log` output will be:

``` js
null 1
1 2
2 3
3 4
4 5
```

the return value of mapper will be the output of the stream.
if the return value is `undefined` then 

## License

MIT
