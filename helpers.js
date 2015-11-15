var yrno = require('yr.no-forecast');
var request = require('request');
var YR_API_VERSION = '1.9';
var SOUNDCLOUD_CLIENT_ID = 'c6eba50612bddd133076b7acc6491ff8';
var SOUNDCLOUD_TRACK_LIMIT = 200;
var TRACK_LIMIT = 20;

function getWeatherForLatLong(lat, lng, callback) {
  yrno.getWeather({
  lat: lat,
  lon: lng
  }, function(error, location) {
    if(error) {
      console.log('GOT ERROR: ' + error);
    } else {
      location.getCurrentSummary(callback);
    }
  }, YR_API_VERSION);
}

function getTracksByTags(tags, mood, callback) {
  var url = 'https://api.soundcloud.com/tracks.json?limit=' +
      SOUNDCLOUD_TRACK_LIMIT + '&tags=' + tags.join() + '&client_id=' +
      SOUNDCLOUD_CLIENT_ID;

  if(mood && mood !== 'neutral') {
    url += '&q=' + mood;
  }

  console.log(url);

  request(url, function(error, response, body){
    if(error) {
      callback(error);
    } else {
      var tracks = JSON.parse(body);
      tracks.sort(function() {
        return 0.5 - Math.random();
      });
      callback(null, tracks.slice(0, TRACK_LIMIT));
    }
  });
}

function getTracksByGenre(genre, mood, callback) {
  var url = 'https://api.soundcloud.com/tracks.json?limit=' +
      SOUNDCLOUD_TRACK_LIMIT + '&genres=' + genre + '&client_id=' +
      SOUNDCLOUD_CLIENT_ID;

  if(mood && mood !== 'neutral') {
    url += '&q=' + mood;
  }

  console.log(url);

  request(url, function(error, response, body){
    if(error) {
      callback(error);
    } else {
      var tracks = JSON.parse(body);
      tracks.sort(function() {
        return 0.5 - Math.random();
      });
      callback(null, tracks.slice(0, TRACK_LIMIT));
    }
  });
}

module.exports = {
  getWeatherForLatLong: getWeatherForLatLong,
  getTracksByTags: getTracksByTags,
  getTracksByGenre: getTracksByGenre
};

