(function() {
  'use strict';

  angular
  .module('pad-thai')
  .directive('directives.snowDirective', SnowDirective);

  function SnowDirective() {

    return {
      restrict: 'AE',
      template: '<div class="snow-container"><div class="snow"></div></div>'
    }
  }
})();
