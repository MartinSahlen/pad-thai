(function() {
  'use strict';

  angular
  .module('pad-thai')
  .directive('directives.weatherDirective', WeatherDirective);

  function WeatherDirective() {
   
    WeatherDirectiveController.$inject = [
      '$scope',
      '$element'
    ];

    function WeatherDirectiveController($scope, $element) {
      $scope.$watch('iconNumber', function(newValue) {
        var suffixNumbers = [1, 2, 3, 5, 6, 7, 8, 20, 21, 24, 25, 26, 27, 28, 29, 40, 41, 42, 43, 44, 45];
        var suffix = 'd';

        if(suffixNumbers.indexOf(parseInt(newValue, 10)) === -1) {
          suffix = '';
        }

        $scope.imageUrl = 'http://symbol.yr.no/grafikk/sym/b100/0' + newValue + suffix + '.png';
      });
    }

    return {
      restrict: 'AE',
      scope: {
        name: '@',
        iconNumber: '=',
        weatherType: '=',
        temperature: '='
      },
      templateUrl: 'modules/pad-thai/templates/weather.html',
      controller: WeatherDirectiveController
    }
  }
})();
