(function() {
  'use strict';

  angular
  .module('pad-thai')
  .factory('pad-thai.services.WeatherService', WeatherService);

  WeatherService.$inject = [
    '$http',
    '$q',
    'pad-thai.config.environment',
    'pad-thai.config.weather-types'
  ];

  function WeatherService($http, $q, environment, weatherTypes) {

    function getWeatherForCoordinates(lat, lng) {

      var defered = $q.defer();

      $http.get(environment.apiUrl + ':' + environment.apiPort + '/weather?lat=' + lat + '&lng=' + lng).then(
        function success(response){
          defered.resolve(response.data);
        },
        function error(response){
          defered.reject();
        }
      );
      return defered.promise;
    }

    function getAllWeatherTypes() {
      return weatherTypes.types;
    }

    return {
      getAllWeatherTypes: getAllWeatherTypes,
      getWeatherForCoordinates: getWeatherForCoordinates
    }
  }
})();
