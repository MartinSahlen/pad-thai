(function() {
  'use strict';

  angular
  .module('pad-thai')
  .directive('directives.sunnyDirective', SunnyDirective);

  function SunnyDirective() {

    function SunnyDirectiveController() {
     $('#sky').animate({'backgroundColor':'#4F0030'}, 18000);
     $('#clouds').animate({'backgroundPosition':'1000px 0px','opacity':0}, 30000);
    }

    return {
      restrict: 'AE',
      templateUrl: 'modules/pad-thai/templates/sunny.html',
      controller: SunnyDirectiveController
    }
  }
})();
