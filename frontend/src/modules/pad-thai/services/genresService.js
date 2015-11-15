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

  function GenresService(genreConstants, weatherConstants, localStorage) {
    function getAllWeatherTypeGenres() {
      var weatherTypeGenres = [];

      weatherConstants.types.map(function(weatherType, key) {
        weatherTypeGenres.push(localStorage.get(key) || '-');
      });

      return weatherTypeGenres;
    }

    function getSelectedGenreByWeatherType(weatherType) {
      var selectedGenre = localStorage.get(weatherType);

      if(!selectedGenre) {
        if(weatherType === 'SUNNY') {
          return 'POP';
        }
        if(weatherType === 'FAIR') {
          return 'DISCO';
        }
        if(weatherType === 'CLOUDY') {
          return 'COUNTRY';
        }
        if(weatherType === 'PARTLY_CLOUDY') {
          return 'DANCEHALL';
        }
        if(weatherType === 'FOG') {
          return 'CLASSICAL';
        }
        if(weatherType === 'LIGHT_RAIN') {
          return 'PIANO';
        }
        if(weatherType === 'MEDIUM_RAIN') {
          return 'DUBSTEP';
        }
        if(weatherType === 'HEAVY_RAIN') {
          return 'REAGGE';
        }
        if(weatherType === 'THUNDER') {
          return 'METAL';
        }
        if(weatherType === 'LIGHT_SNOW') {
          return 'TECHNO';
        }
        if(weatherType === 'MEDIUM_SNOW') {
          return 'TRANCE';
        }
        if(weatherType === 'HEAVY_SNOW') {
          return 'INDIE';
        }
        if(weatherType === 'SNOW_AND_RAIN') {
          return 'LATIN';
        }
      }

      return selectedGenre;
    }

    function setSelectedGenreByWeatherType(genreType, weatherType) {
      localStorage.set(weatherType, genreType);
    }

    function getAllGenreTypes() {
      return genreConstants.types;
    }

    function getGenreNameByType(type) {
      return genreConstants.names[type];
    }

    return {
      getAllGenreTypes: getAllGenreTypes,
      getGenreNameByType: getGenreNameByType,
      getAllWeatherTypeGenres: getAllWeatherTypeGenres,
      getSelectedGenreByWeatherType: getSelectedGenreByWeatherType,
      setSelectedGenreByWeatherType: setSelectedGenreByWeatherType
    };
  }
})();
