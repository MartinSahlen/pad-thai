(function() {
  'use strict';

  angular
      .module('pad-thai')
      .directive('directives.cloudyDirective', CloudyDirective);

  function CloudyDirective() {

    function CloudyDirectiveController() {
      $('#sky').animate({'backgroundColor':'#4F0030'}, 18000);
      $('#clouds').animate({'backgroundPosition':'1000px 0px','opacity':0}, 30000);
    }

    return {
      restrict: 'AE',
      templateUrl: 'modules/pad-thai/templates/cloudy.html',
      controller: CloudyDirectiveController
    }
  }
})();
