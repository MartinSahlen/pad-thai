(function() {
  'use strict';

  angular
  .module('pad-thai')
  .directive('directives.thunderDirective', ThunderDirective);

  function ThunderDirective() {

    return {
      restrict: 'AE',
      template: '<div class="thunder"></div>'
    }
  }
})();
