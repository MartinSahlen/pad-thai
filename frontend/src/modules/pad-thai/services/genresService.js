(function() {
  'use strict';

  angular
  .module('pad-thai')
  .factory('pad-thai.services.GenresService', GenresService);

  GenresService.$inject = [
    'pad-thai.config.genres',
    'pad-thai.config.weather-types',
    'localStorageService'
  ];

  function GenresService(genres, weatherTypes, localStorage) {
    function getAllWeatherTypeGenres() {
      var weatherTypes = weatherTypes.types;
      var weatherTypeGenres = [];

      weatherTypes.map(function(weatherType, key) {
        weatherTypeGenres.push(localStorage.get(key) || '-');
      });

      return weatherTypeGenres;
    }

    function getGenreByWeatherType(weatherType) {
      return localStorage.get(weatherType);
    }

    function setGenreByWeatherType(genre, weatherType) {
      localStorage.set(weatherType, genre);
    }

    function getAllGenres() {
      return genres;
    }

    return {
      getAllGenres: getAllGenres,
      getAllWeatherTypeGenres: getAllWeatherTypeGenres,
      getGenreByWeatherType: getGenreByWeatherType,
      setGenreByWeatherType: setGenreByWeatherType
    };
  }
})();
