var boom = require('boom');
var helperMethods = Object.create(null);
helperMethods.wrap = boom.wrap.bind(boom);
helperMethods.create = boom.create.bind(boom);
var keys = Object.keys(boom).filter(function (key) {
  return typeof boom[key] === 'function' && !helperMethods[key]
});

function respond (res, boomed, data) {
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    Object.assign(boomed.payload, data);
  }

  Object.keys(boomed.headers).forEach(function (header) {
    res.setHeader(header, boomed.headers[header]);
  });

  return res.status(boomed.statusCode).json(boomed.payload);
}

function expressBoom (req, res, next) {
  if (res.boom) throw new Error('boom already exists on response object');

  res.boom = Object.create(helperMethods);

  for (var i = 0; i < keys.length; i++) {
    res.boom[keys[i]] = function (message, data) {
      var boomed = boom[keys[i]].apply(boom, arguments).output;
      return respond(res, boomed, data);
    };
  }

  next();
}

module.exports = function () {
  return expressBoom;
};
