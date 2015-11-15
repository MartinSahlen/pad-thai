(function() {
  'use strict';

  angular
  .module('pad-thai')
  .controller('pad-thai.controllers.CallbackController', CallbackController);
  
  CallbackController.$inject = [
    '$window',
    '$location'
  ];

  function CallbackController($window, $location) {
    if ($window.opener) {
      try {
        $window.opener.authCallback(null, $location.hash().split('=')[1].split('&')[0]);
      }
      catch(err) {
        $window.opener.authCallback('error');
      } finally {
        $window.close();
      }
      
    }
  }
})();
