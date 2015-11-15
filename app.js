var express = require('express');
var helpers = require('./helpers');
var weatherMap = require('./weather-map');
var cors = require('cors');
var app = express();
var argv = require('yargs').argv;
var PORT = argv.port || 8000;

app.use(cors());

app.get('/weather', function(req, res){
  helpers.getWeatherForLatLong(req.query.lat, req.query.lng, function weatherData(error, weatherData) {
    if (error) {
      res.status(500);
    } else {
      res.json(weatherData);
    }
  });
});

app.get('/tracks', function(req, res){
  helpers.getWeatherForLatLong(req.query.lat, req.query.lng, function weatherData(error, weatherData) {
    var weatherType = weatherMap.getTypeByNumber(weatherData.iconNumber);
    var genre = weatherMap.getGenreByNumber(weatherData.iconNumber);
    var mood = req.query.mood;
    helpers.getTracksByGenre(genre, mood, function(error, tracks) {
      if (error) {
        res.status(500);
      } else {
        res.json({weatherType: weatherType, tracks: tracks, weatherData: weatherData});
      }
    });
  });
});

if (argv.production) {
  app.use(express.static(__dirname + '/frontend/dist'));
  app.use('*', function(req, res){
    res.sendFile(__dirname + '/frontend/dist/index.html');
  });
}

app.listen(PORT, function() {
  var host = 'localhost:';
  console.log('Server listening at http://%s:%s', host, PORT);
});
