(function() {
  'use strict';

  angular
  .module('pad-thai')
  .factory('pad-thai.services.TracksService', TracksService);

  TracksService.$inject = [
    '$http',
    '$q',
    'pad-thai.config.environment',
    'pad-thai.config.weather-types',
    'pad-thai.services.GenresService'
  ];

  function TracksService($http, $q, environment, weatherConstants, GenresService) {
    function getTracksForCoordinates(lat, lng, mood) {
      var defered = $q.defer();

      var weatherTypes = weatherConstants.types;
      var genreWeatherMap = {};

      for(var i = 0; i < weatherTypes.length; i++) {
        genreWeatherMap[weatherTypes[i]] = GenresService.getSelectedGenreByWeatherType(weatherTypes[i]);
      }

      $http.post(environment.apiUrl + ':' + environment.apiPort + '/tracks?lat=' + lat + '&lng=' + lng + '&mood=' + mood, genreWeatherMap).then(
          function success(response){
            defered.resolve({
              weatherType: response.data.weatherType,
              tracks: response.data.tracks,
              weatherData: response.data.weatherData
            });
          },
          function error(response){
            defered.reject();
          }
      );
      return defered.promise;

      //$http.get(environment.apiUrl + ':' + environment.apiPort + '/tracks?lat=' + lat + '&lng=' + lng + '&mood=' + mood).then(
      //  function success(response){
      //    defered.resolve({
      //      weatherType: response.data.weatherType,
      //      tracks: response.data.tracks,
      //      weatherData: response.data.weatherData
      //    });
      //  },
      //  function error(response){
      //    defered.reject();
      //  }
      //);
      //return defered.promise;
    }

    return {
      getTracksForCoordinates: getTracksForCoordinates
    }
  }
})();
