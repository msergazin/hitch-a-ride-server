var async = require('async');
var googleMapsAPI = require('./google-maps').directions;

var tolerance = 1.1;

var canHitchRide = module.exports = function (opts, cb) {
  var withRider = {
    origin: opts.driver.from,
    destination: opts.driver.to,
    waypoints: [ opts.rider.from, opts.rider.to ].join('|'),
    sensor: false
  };

  var withoutRider = {
    origin: opts.driver.from,
    destination: opts.driver.to,
    sensor: false
  };

  async.map([
    withRider,
    withoutRider
  ], googleMapsAPI, function(err, results) {
//Produces a new array of values by mapping each value in the given array
//through the iterator function. The iterator is called with an item from 
//the array and a callback for when it has finished processing. The callback 
//takes 2 arguments, an error and the transformed item from the array. 
//If the iterator passes an error to this callback, the main callback 
//for the map function is immediately called with the error.
    if (err) {
      //TODO
      cb(false);
      return;
    }

    var durations = results.map(function (way) {
      return way.routes[0].legs.reduce(function (sum, leg) {
        return sum + leg.duration.value;
      }, 0);
    });
	//console.log("        fasfsf");
	//console.log(durations[0]+' '+durations[1]);
    cb(durations[0] <= durations[1] * tolerance, results[0]);
  });
};
