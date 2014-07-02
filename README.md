# express-boom

[Boom](https://www.npmjs.org/package/boom) response objects in Express.

## Install

```
npm install express-boom --save
```

## Usage

```js
var express = require('express');
var boom = require('express-boom');

var app = express();

app.use(boom());

app.use(function (req, res) {
  res.boom.notFound(); // Responsds with a 404 status code
});
```

For a complete list of methods, see the [Boom docs](https://github.com/spumko/boom#list-of-friendly-errors-available)