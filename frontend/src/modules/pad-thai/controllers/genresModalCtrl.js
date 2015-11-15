(function() {
  'use strict';

  angular
  .module('pad-thai')
  .controller('pad-thai.controllers.GenresModalController', GenresModalController);
  
  GenresModalController.$inject = [
    '$scope',
    '$uibModalInstance',
    'pad-thai.services.GenresService',
    'pad-thai.services.WeatherService'
  ];

  function GenresModalController($scope, $uibModalIinstance, GenresService, WeatherService) {
    $scope.modal = $uibModalIinstance;

    $scope.selectedGenreSunny = GenresService.getSelectedGenreByWeatherType('SUNNY');

    $scope.$watch('selectedGenreSunny', function(newValue) {
      GenresService.setSelectedGenreByWeatherType(newValue, 'SUNNY');
    });

    $scope.selectedGenreFair = GenresService.getSelectedGenreByWeatherType('FAIR');

    $scope.$watch('selectedGenreFair', function(newValue) {
      GenresService.setSelectedGenreByWeatherType(newValue, 'FAIR');
    });

    $scope.selectedGenreCloudy = GenresService.getSelectedGenreByWeatherType('CLOUDY');

    $scope.$watch('selectedGenreCloudy', function(newValue) {
      GenresService.setSelectedGenreByWeatherType(newValue, 'CLOUDY');
    });

    $scope.selectedGenrePartlyCloudy = GenresService.getSelectedGenreByWeatherType('PARTLY_CLOUDY');

    $scope.$watch('selectedGenrePartlyCloudy', function(newValue) {
      GenresService.setSelectedGenreByWeatherType(newValue, 'PARTLY_CLOUDY');
    });

    $scope.selectedGenreFog = GenresService.getSelectedGenreByWeatherType('FOG');

    $scope.$watch('selectedGenreFog', function(newValue) {
      GenresService.setSelectedGenreByWeatherType(newValue, 'FOG');
    });

    $scope.selectedGenreLightRain = GenresService.getSelectedGenreByWeatherType('LIGHT_RAIN');

    $scope.$watch('selectedGenreLightRain', function(newValue) {
      GenresService.setSelectedGenreByWeatherType(newValue, 'LIGHT_RAIN');
    });
    $scope.selectedGenreMediumRain = GenresService.getSelectedGenreByWeatherType('MEDIUM_RAIN');

    $scope.$watch('selectedGenreMediumRain', function(newValue) {
      GenresService.setSelectedGenreByWeatherType(newValue, 'MEDIUM_RAIN');
    });

    $scope.selectedGenreHeavyRain = GenresService.getSelectedGenreByWeatherType('HEAVY_RAIN');

    $scope.$watch('selectedGenreHeavyRain', function(newValue) {
      GenresService.setSelectedGenreByWeatherType(newValue, 'HEAVY_RAIN');
    });

    $scope.selectedGenreThunder = GenresService.getSelectedGenreByWeatherType('THUNDER');

    $scope.$watch('selectedGenreThunder', function(newValue) {
      GenresService.setSelectedGenreByWeatherType(newValue, 'THUNDER');
    });

    $scope.selectedGenreLightSnow = GenresService.getSelectedGenreByWeatherType('LIGHT_SNOW');

    $scope.$watch('selectedGenreLightSnow', function(newValue) {
      GenresService.setSelectedGenreByWeatherType(newValue, 'LIGHT_SNOW');
    });

    $scope.selectedGenreMediumSnow = GenresService.getSelectedGenreByWeatherType('MEDIUM_SNOW');

    $scope.$watch('selectedGenreMediumSnow', function(newValue) {
      GenresService.setSelectedGenreByWeatherType(newValue, 'MEDIUM_SNOW');
    });

    $scope.selectedGenreHeavySnow = GenresService.getSelectedGenreByWeatherType('HEAVY_SNOW');

    $scope.$watch('selectedGenreHeavySnow', function(newValue) {
      GenresService.setSelectedGenreByWeatherType(newValue, 'HEAVY_SNOW');
    });

    $scope.selectedGenreSnowAndRain = GenresService.getSelectedGenreByWeatherType('SNOW_AND_RAIN');

    $scope.$watch('selectedGenreSnowAndRain', function(newValue) {
      GenresService.setSelectedGenreByWeatherType(newValue, 'SNOW_AND_RAIN');
    });

    $scope.weatherTypes = WeatherService.getAllWeatherTypes();
    $scope.genreTypes = GenresService.getAllGenreTypes();
    $scope.getWeatherNameByType = WeatherService.getWeatherNameByType;
    $scope.getGenreNameByType = GenresService.getGenreNameByType;
    $scope.weatherTypeGenres = GenresService.getAllWeatherTypeGenres();
  }
})();
