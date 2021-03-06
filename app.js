var express = require('express');
var helpers = require('./helpers');
var weatherMap = require('./weather-map');
var genreMap = require('./genre-map');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var argv = require('yargs').argv;
var PORT = argv.port || 8000;

app.use(cors());
app.use(bodyParser.json());

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

app.post('/tracks', function(req, res){
  helpers.getWeatherForLatLong(req.query.lat, req.query.lng, function weatherData(error, weatherData) {
    var weatherType = weatherMap.getTypeByNumber(weatherData.iconNumber);
    var genre = genreMap.getGenreByType(weatherMap.getGenreByNumberAndUserDefinedMapping(weatherData.iconNumber, req.body))[1];
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
  app.use(function(req, res, next) {
    if (req.headers["x-forwarded-proto"] == 'https') {
      next();
     } else {
      res.redirect(301, "https://" + req.headers.host + req.url);
    }
  });
  PORT = process.env.PORT; 
}

app.listen(PORT, function() {
  var host = 'localhost:';
  console.log('Server listening at http://%s:%s', host, PORT);
});
