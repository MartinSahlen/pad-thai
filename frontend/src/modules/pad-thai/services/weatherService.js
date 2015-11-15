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

  function WeatherService($http, $q, environment, weatherConstants) {

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
      return weatherConstants.types;
    }

    function getWeatherNameByType(type) {
      return weatherConstants.names[type];
    }

    return {
      getAllWeatherTypes: getAllWeatherTypes,
      getWeatherNameByType: getWeatherNameByType,
      getWeatherForCoordinates: getWeatherForCoordinates
    }
  }
})();
