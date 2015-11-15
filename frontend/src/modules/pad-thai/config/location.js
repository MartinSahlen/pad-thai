(function() {
  'use strict';

  angular
  .module('pad-thai')
  .config(RouterConfig);

  RouterConfig.$inject = [
    '$urlMatcherFactoryProvider',
    '$urlRouterProvider',
    '$locationProvider'
  ];

  function RouterConfig($urlMatcherFactoryProvider, $urlRouterProvider, $locationProvider) {
    $urlMatcherFactoryProvider.strictMode(false);
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
  }
})();
