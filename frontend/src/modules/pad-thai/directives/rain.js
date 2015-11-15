(function() {
  'use strict';

  angular
  .module('pad-thai')
  .directive('directives.rainDirective', rainDirective);

  function rainDirective() {
   
    RainDirectiveController.$inject = [
      '$scope',
      '$element',
      '$document'
    ];

    function RainDirectiveController($scope, $element, $document) {
      // number of drops created.
      var nbDrop = 858; 

      function randRange( minNum, maxNum) {
        return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
      }

      function createRain() {

        for(var i=1;i<nbDrop;i++) {
        var dropLeft = randRange(0,1600);
        var dropTop = randRange(-1000,1400);

        $('.rain').append('<div class="drop" id="drop'+i+'"></div>');
        $('#drop'+i).css('left',dropLeft);
        $('#drop'+i).css('top',dropTop);
        }

      }
      createRain();
    }

    return {
      restrict: 'AE',
      template: '<div class="rain"></div>',
      controller: RainDirectiveController
    }
  }
})();
