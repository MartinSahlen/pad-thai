(function() {
  'use strict';

  angular
  .module('pad-thai')
  .directive('directives.tracksDirective', TracksDirective);

  function TracksDirective() {
   
    TracksDirectiveController.$inject = [
      '$scope',
      '$element',
      'pad-thai.services.PlayerService'
    ];

    function TracksDirectiveController($scope, $element, PlayerService) {
      $scope.player = PlayerService;
      $scope.playTrack = function(trackNo) {
        PlayerService.play(trackNo);
      };
    }

    return {
      restrict: 'AE',
      templateUrl: 'modules/pad-thai/templates/tracks.html',
      controller: TracksDirectiveController
    }
  }
})();
