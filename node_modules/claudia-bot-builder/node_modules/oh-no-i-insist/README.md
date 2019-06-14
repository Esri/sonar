# Oh, no, I insist

[![Build Status](https://travis-ci.org/gojko/oh-no-i-insist.svg?branch=master)](https://travis-ci.org/gojko/oh-no-i-insist)

Flexible retry for JavaScript promises. Supports native Promises and 3rd party A+ Promise libraries.

## Installation

Install using NPM

```bash
npm install oh-no-i-insist -S
```

[![NPM](https://nodei.co/npm/oh-no-i-insist.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/oh-no-i-insist/)

## Usage

```javascript
 retry(promiseGenerator, delay, maxTimes, predicate, onRetry, PromiseImplementation)
```

* `promiseGenerator`: `function` that should return a `Promise` you want to retry. Will be invoked once per each try.
* `delay`: `int` number of milliseconds between retries
* `maxTimes`: `int` the number of times to retry 
* `predicate`: `function (error)` __optional__ a function executed to check if the error is retriable. It will receive the error/rejection reason, and should return `true` if it is retriable. Return `false` to break the retry chain.
* `onRetry`: `function` __optional__ a function that will be executed before waiting for each retry, but not before the first try. Use this to clean up resources, tell the user that you're waiting for a retry and things like that
* `PromiseImplementation`: `class` __optional__ if working with an older Node.js implementation, the 3rd party `Promise` implementation that you want to use. If working with a more recent Node.js version and you want to use the native `Promise`, don't supply this argumenrt

## Example

```javascript
var retry = require('oh-no-i-insist'),
  generator = function() { 
    return new Promise(function (resolve, reject) { 
      var x = Math.random();
      if (x < 0.3) { 
        resolve(x);
      } else {
        reject(x);
      } 
    }); 
  }, shouldRetry = function (number) {
    console.log('got wrong', number);
    return number > 0.6;
  }, onRetry = function () {
    console.log('waiting for retry');
  };

retry(generator, 100, 5, shouldRetry, onRetry).then(function (num) {
  console.log('generated', num);
}, function (err) {
  console.log('failed with', err);
});
```

## License

MIT
