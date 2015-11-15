(function() {
  'use strict';

  angular
  .module('pad-thai')
  .config(Router);

  Router.$inject = [
    '$stateProvider',
    '$urlRouterProvider'
  ];

  function Router($stateProvider) {
    $stateProvider
    .state('pad-thai-index', {
      url: '/?background',
      templateUrl: 'modules/pad-thai/templates/pad-thai.html',
      controller: 'pad-thai.controllers.PadThaiIndexController'
    })
    .state('pad-thai-callback', {
      url: '/callback',
      templateUrl: 'modules/pad-thai/templates/callback.html',
      controller: 'pad-thai.controllers.CallbackController'
    });
  }
})();
