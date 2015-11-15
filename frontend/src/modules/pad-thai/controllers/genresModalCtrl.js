(function() {
  'use strict';

  angular
  .module('pad-thai')
  .controller('pad-thai.controllers.GenresModalController', GenresModalController);
  
  GenresModalController.$inject = [
    '$scope',
    '$uibModalInstance',
    'pad-thai.services.GenresService',
    'pad-thai.services.WeatherService',
    'pad-thai.services.MessageService'
  ];

  function GenresModalController($scope, $uibModalIinstance, GenresService, WeatherService, MessageService) {
    $scope.modal = $uibModalIinstance;

    $scope.selectedGenreSunny = GenresService.getSelectedGenreByWeatherType('SUNNY');

    $scope.$watch('selectedGenreSunny', function(newValue, oldValue) {
      if(newValue !== oldValue) {
        GenresService.setSelectedGenreByWeatherType(newValue, 'SUNNY');
        MessageService.displaySuccessMessage(WeatherService.getWeatherNameByType('SUNNY') + ' genre successfully updated.');
      }
    });

    $scope.selectedGenreFair = GenresService.getSelectedGenreByWeatherType('FAIR');

    $scope.$watch('selectedGenreFair', function(newValue, oldValue) {
      GenresService.setSelectedGenreByWeatherType(newValue, 'FAIR');
      if(newValue !== oldValue) {
        MessageService.displaySuccessMessage(WeatherService.getWeatherNameByType('FAIR') + ' genre successfully updated.');
      }
    });

    $scope.selectedGenreCloudy = GenresService.getSelectedGenreByWeatherType('CLOUDY');

    $scope.$watch('selectedGenreCloudy', function(newValue, oldValue) {
      GenresService.setSelectedGenreByWeatherType(newValue, 'CLOUDY');
      if(newValue !== oldValue) {
        MessageService.displaySuccessMessage(WeatherService.getWeatherNameByType('CLOUDY') + ' genre successfully updated.');
      }
    });

    $scope.selectedGenrePartlyCloudy = GenresService.getSelectedGenreByWeatherType('PARTLY_CLOUDY');

    $scope.$watch('selectedGenrePartlyCloudy', function(newValue, oldValue) {
      GenresService.setSelectedGenreByWeatherType(newValue, 'PARTLY_CLOUDY');
      if(newValue !== oldValue) {
        MessageService.displaySuccessMessage(WeatherService.getWeatherNameByType('PARTLY_CLOUDY') + ' genre successfully updated.');
      }
    });

    $scope.selectedGenreFog = GenresService.getSelectedGenreByWeatherType('FOG');

    $scope.$watch('selectedGenreFog', function(newValue, oldValue) {
      GenresService.setSelectedGenreByWeatherType(newValue, 'FOG');
      if(newValue !== oldValue) {
        MessageService.displaySuccessMessage(WeatherService.getWeatherNameByType('FOG') + ' genre successfully updated.');
      }
    });

    $scope.selectedGenreLightRain = GenresService.getSelectedGenreByWeatherType('LIGHT_RAIN');

    $scope.$watch('selectedGenreLightRain', function(newValue, oldValue) {
      GenresService.setSelectedGenreByWeatherType(newValue, 'LIGHT_RAIN');
      if(newValue !== oldValue) {
        MessageService.displaySuccessMessage(WeatherService.getWeatherNameByType('LIGHT_RAIN') + ' genre successfully updated.');
      }
    });
    $scope.selectedGenreMediumRain = GenresService.getSelectedGenreByWeatherType('MEDIUM_RAIN');

    $scope.$watch('selectedGenreMediumRain', function(newValue, oldValue) {
      GenresService.setSelectedGenreByWeatherType(newValue, 'MEDIUM_RAIN');
      if(newValue !== oldValue) {
        MessageService.displaySuccessMessage(WeatherService.getWeatherNameByType('MEDIUM_RAIN') + ' genre successfully updated.');
      }
    });

    $scope.selectedGenreHeavyRain = GenresService.getSelectedGenreByWeatherType('HEAVY_RAIN');

    $scope.$watch('selectedGenreHeavyRain', function(newValue, oldValue) {
      GenresService.setSelectedGenreByWeatherType(newValue, 'HEAVY_RAIN');
      if(newValue !== oldValue) {
        MessageService.displaySuccessMessage(WeatherService.getWeatherNameByType('HEAVY_RAIN') + ' genre successfully updated.');
      }
    });

    $scope.selectedGenreThunder = GenresService.getSelectedGenreByWeatherType('THUNDER');

    $scope.$watch('selectedGenreThunder', function(newValue, oldValue) {
      GenresService.setSelectedGenreByWeatherType(newValue, 'THUNDER');
      if(newValue !== oldValue) {
        MessageService.displaySuccessMessage(WeatherService.getWeatherNameByType('THUNDER') + ' genre successfully updated.');
      }
    });

    $scope.selectedGenreLightSnow = GenresService.getSelectedGenreByWeatherType('LIGHT_SNOW');

    $scope.$watch('selectedGenreLightSnow', function(newValue, oldValue) {
      GenresService.setSelectedGenreByWeatherType(newValue, 'LIGHT_SNOW');
      if(newValue !== oldValue) {
        MessageService.displaySuccessMessage(WeatherService.getWeatherNameByType('LIGHT_SNOW') + ' genre successfully updated.');
      }
    });

    $scope.selectedGenreMediumSnow = GenresService.getSelectedGenreByWeatherType('MEDIUM_SNOW');

    $scope.$watch('selectedGenreMediumSnow', function(newValue, oldValue) {
      GenresService.setSelectedGenreByWeatherType(newValue, 'MEDIUM_SNOW');
      if(newValue !== oldValue) {
        MessageService.displaySuccessMessage(WeatherService.getWeatherNameByType('MEDIUM_SNOW') + ' genre successfully updated.');
      }
    });

    $scope.selectedGenreHeavySnow = GenresService.getSelectedGenreByWeatherType('HEAVY_SNOW');

    $scope.$watch('selectedGenreHeavySnow', function(newValue, oldValue) {
      GenresService.setSelectedGenreByWeatherType(newValue, 'HEAVY_SNOW');
      if(newValue !== oldValue) {
        MessageService.displaySuccessMessage(WeatherService.getWeatherNameByType('HEAVY_SNOW') + ' genre successfully updated.');
      }
    });

    $scope.selectedGenreSnowAndRain = GenresService.getSelectedGenreByWeatherType('SNOW_AND_RAIN');

    $scope.$watch('selectedGenreSnowAndRain', function(newValue, oldValue) {
      GenresService.setSelectedGenreByWeatherType(newValue, 'SNOW_AND_RAIN');
      if(newValue !== oldValue) {
        MessageService.displaySuccessMessage(WeatherService.getWeatherNameByType('SNOW_AND_RAIN') + ' genre successfully updated.');
      }
    });

    $scope.weatherTypes = WeatherService.getAllWeatherTypes();
    $scope.genreTypes = GenresService.getAllGenreTypes();
    $scope.getWeatherNameByType = WeatherService.getWeatherNameByType;
    $scope.getGenreNameByType = GenresService.getGenreNameByType;
    $scope.weatherTypeGenres = GenresService.getAllWeatherTypeGenres();

    $scope.updateTracks = function() {
      $uibModalIinstance.close(true);
    };
  }
})();
