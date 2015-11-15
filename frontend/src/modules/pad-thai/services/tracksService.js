(function() {
  'use strict';

  angular
  .module('pad-thai')
  .factory('pad-thai.services.TracksService', TracksService);

  TracksService.$inject = [
    '$http',
    '$q',
    'pad-thai.config.environment'
  ];

  function TracksService($http, $q, environment) {
    function getTracksForCoordinates(lat, lng, mood) {
      var defered = $q.defer();

      $http.get(environment.apiUrl + ':' + environment.apiPort + '/tracks?lat=' + lat + '&lng=' + lng + '&mood=' + mood).then(
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
    }

    return {
      getTracksForCoordinates: getTracksForCoordinates
    }
  }
})();
