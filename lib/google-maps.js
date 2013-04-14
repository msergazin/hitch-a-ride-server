var request = require('request');
//Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.
var querystring = require('querystring');
//querystring.stringify(obj, [sep], [eq])#
//Serialize an object to a query string. Optionally override the default separator ('&') and assignment ('=') characters.

/*
var reqOptions = {
  origin: "Chicago, IL",
  destination: "Los Angeles, CA",
  waypoints: [
    {
      location:"Joplin, MO",
      stopover:false
    },{
      location:"Oklahoma City, OK",
      stopover:true
    }],
  provideRouteAlternatives: false,
  travelMode: TravelMode.DRIVING,
  unitSystem: UnitSystem.IMPERIAL
};
*/

/*
 * opts = {
 *   driver: {
 *     from: '...',
 *     to: '...'
 *   },
 *   rider: {
 *     from: '...',
 *     to: '...' 
 *   }
 * }
 *
 * cb(err, bool) // arg in callback true iff it is reasonable to hitch a ride
 */

<<<<<<< HEAD
var googleMapsAPI = module.exports = function (opts, cb) {
	
=======
exports.directions = function (opts, cb) {
>>>>>>> 20840534701d38bd741f35af858065d1abaeac8b
  var url = 'https://maps.googleapis.com/maps/api/directions/json?' +
    querystring.stringify(opts);
	
//___________________________ https://maps.googleapis.com/maps/api/directions/json?origin=Chicago%2C%20IL&destination=Los%20Angeles%2C%20CA&waypoints=Joplin%2C%20MO%7COklahoma%20City%2C%20OK&sensor=false
//___________________________ https://maps.googleapis.com/maps/api/directions/json?origin=Chicago%2C%20IL&destination=Los%20Angeles%2C%20CA&sensor=false
  request({url : url, json: true}, function (err, status, body) {
    //console.log(JSON.stringify(body, null, 2));
	//console.log(body);
    /* { routes: 
   [ { bounds: [Object],
       copyrights: 'Map data ©2013 Google',
       legs: [Object],
       overview_polyline: [Object],
       summary: 'I-40 W',
       warnings: [],
       waypoint_order: [Object] } ],
  status: 'OK' }
{ routes: 
   [ { bounds: [Object],
       copyrights: 'Map data ©2013 Google',
       legs: [Object],
       overview_polyline: [Object],
       summary: 'I-80 W',
       warnings: [],
       waypoint_order: [] } ],
  status: 'OK' } */
	cb(err, body);
  });
};


exports.reverseGeocode = function (opts, cb) {
  var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' +
    opts.latitude +
    ',' +
    opts.longitude +
    '&sensor=true';

  request({url : url, json: true}, function (err, status, body) {
    //console.log(JSON.stringify(body, null, 2));
    cb(err || body.results[0].formatted_address);
  });
};
