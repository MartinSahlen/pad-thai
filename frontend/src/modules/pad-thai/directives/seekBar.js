(function() {
  'use strict';

  angular
  .module('pad-thai')
  .directive('directives.seekBarDirective', SeekBarDirective);

  function SeekBarDirective() {
   
    SeekBarDirectiveController.$inject = [
      '$scope',
      '$element',
      'pad-thai.services.PlayerService'
    ];

    function SeekBarDirectiveController($scope, $element, PlayerService) {
      $scope.player = PlayerService;
      $scope.seekTo = function($event){
        var xpos = $event.offsetX / $($element).find('.progress').width();
        $scope.player.seekTo(xpos);
      };
    }

    return {
      restrict: 'AE',
      templateUrl: 'modules/pad-thai/templates/seek-bar.html',
      controller: SeekBarDirectiveController
    }
  }
})();
