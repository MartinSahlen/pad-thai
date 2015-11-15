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

    $scope.setGenreByWeatherType = function(genre, weatherType) {
      GenresService.setGenreByWeatherType(genre, weatherType);
    };

    $scope.weatherTypes = WeatherService.getAllWeatherTypes();
    $scope.genres = GenresService.getAllGenres();
    $scope.weatherTypeGenres = GenresService.getAllWeatherTypeGenres();
  }
})();
