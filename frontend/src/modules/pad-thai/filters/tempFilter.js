(function() {
  'use strict';

  angular
  .module('pad-thai')
  .filter('tempFilter', TempFilterFilter);

    TempFilterFilter.$inject = [
        '$sce'
    ];

  function TempFilterFilter($sce) {
    return function(temperature) {
        if(!temperature) {
            return '-';
        }

        return $sce.trustAsHtml(temperature.split(' ')[0] + ' &deg;C');
    };
  }
})();
