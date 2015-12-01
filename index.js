var boom = require('boom');
var helperMethods = ['wrap', 'create'];

module.exports = function () {
  return function (req, res, next) {
    if (res.boom) throw new Error('boom already exists on response object');

    res.boom = {};

    Object.keys(boom).forEach(function (key) {
      if (typeof boom[key] !== 'function') return;
      
      if (helperMethods.indexOf(key) !== -1) {
        res.boom[key] = function () {
          return boom[key].apply(boom, arguments);
        };
      } else {
        res.boom[key] = function () {
          var boomed = boom[key].apply(boom, arguments);
  
          return res.status(boomed.output.statusCode).send(boomed.output.payload);
        };
      }
    });

    next();
  };
};
