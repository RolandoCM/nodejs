var port = 3000;
var today = require('./today.js');
var express = require('express');
var request = require('request');
var parse = require('xml2js').parseString;
var app = express();

app.get('/api/today', function(req, res){
  var body = "The day of the week is "+today()+".";
  res.type('text/plain');
  res.set('Content-Length', Buffer.byteLength(body));
  res.status(200).send(body);
});



app.get('/api/weather/:location', function(req, res){
  var options = {
    method: 'GET',
    uri: 'http://weather.gov/xml/current_obs/'+
    req.params.location + '.xml',
    headers:{
      'User-agent': 'weatherRequest/1.0'
    }
  };
  var callback = function(error, response, body){
    if(error){
      res.status(500).send(error.message);
    }
    parse(body, function(err, result){
      var message =
      'The current temperature is '+
      result.current_observation.temp_f[0] +
      ' degrees Fahrenheit. ';
      res.type('text/plain');
      res.set('Content-Length', Buffer.byteLength(message));
      res.status(response.statusCode).send(message);
    });
    //res.type('text/plain');
    //res.status(res.statusCode).send(body);
  };
  request(options, callback);
});

app.listen(port, function(){
  console.log('Listening on port %s.', port);
});

/*var server = http.createServer(function (request, response){
  var body = "The day of the week is "+ today();
  response.writeHead(200, {
    'Content-Length': body.length,
    'Content-Type': 'text/plain'
  });
  response.end(body);
});
server.listen(3000);
*/
