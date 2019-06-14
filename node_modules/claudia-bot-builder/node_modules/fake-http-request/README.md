# Fake Node.js HTTP Request 

[![Build status](https://travis-ci.org/gojko/fake-http-request.svg?v=1)](https://travis-ci.org/gojko/fake-http-request) 

Utility class to fake a HTTP/HTTPS request for unit testing Node.js projects. It captures arguments for outgoing requests and allows you to simulate network errors and responses easily. It can also pipe outgoing HTTP/S requests to custom functions, so you can asynchronously wait for them.

[![NPM](https://nodei.co/npm/fake-http-request.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/fake-http-request/)`

## Installation

Install using NPM, with 

```
npm install fake-http-request -D
```

## Usage

Before the relevant HTTP/S requests, install the fake request:

```javascript
var fake = require('fake-http-request');

fake.install('https');

```

To clean up and restore the original HTTP/S requests, after testing, use:

```javascript
fake.uninstall('https');
```

This will replace the system `https.request` with a test method that captures calls instead of sending them out to the network, so it will work with any client code that uses the system http/https libraries.

Both `install` and `uninstall` can take an argument -- the module name where to install the fake requests. By default, they will use `https`.

You can then use `https.request.calls` to inspect individual calls. Each call object will have the following structure:

* `args`: `array` -- arguments passed to the request
* `body`: `array` -- chunks written to the request body
* `networkError`: `function (error)` -- use this to simulate a network error for the call.
* `respond`: `function(httpCode, statusMessage, body)` -- use this to simulate a successful network response.

You can also use `https.request.pipe` to pass in a function that will receive a call every time a network request is initiated. The call is executed using `setTimeout` so you can also respond, knowing that the synchronous processing of the calling function is complete. The arguments to the pipe will be the arguments passed to the HTTP call, and `this` will be set to the fake request. 

### Example

```javascript
var fakeRequest = require('fake-http-request'),
    https = require('https'),
    request = require('request');

fakeRequest.install();

// simulate a response

request('https://www.google.com', function (error, response, body) { 
  console.log('got response', response.statusCode, response.statusMessage, body) 
}).on('request', function () {
  console.log('number of calls', https.request.calls.length);
  console.log('first call', 
	https.request.calls[0].args[0].host, 
	https.request.calls[0].args[0].port, 
	https.request.calls[0].args[0].path
  );

  https.request.calls[0].respond(404, 'Not found', 'some html here');
});

// simulate errors

call = request('https://www.google.com', function (error, response, body) { 
  console.log('got error', error); 
}).on('request', function () {
  var mostRecent = https.request.calls.length - 1;
  console.log('number of calls', https.request.calls.length);
  console.log('second call', 
    https.request.calls[mostRecent].args[0].host,
	https.request.calls[mostRecent].args[0].port, 
	https.request.calls[mostRecent].args[0].path
  );
  https.request.calls[mostRecent].networkError('BOOM!');
});

// pipe calls for async processing

https.request.pipe(function (options) {
  console.log('Received call', options); 
  this.respond(200, 'OK', 'some html here');
});

request('https://www.google.com');
```

### Usage with domain matchers

In case you want to block just a certain URLs, you can pass an object with request type (`type`) and regex matcher to the `install` method. If matcher is not provided, `fake-http-request` will match all URLs. Request type is optional and it defaults to `https`.

For example, this will fake only requests made to Github URL via HTTPS:

```javascript
var fakeRequest = require('fake-http-request');

fakeRequest.install({
  type: 'https',
  matcher: /github/
});

// Do something with fake requests

fakeRequest.uninstall('https');
```