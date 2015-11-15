(function() {
  'use strict';

  angular
  .module('pad-thai')
  .factory('pad-thai.services.MessageService', MessageService);

  MessageService.$inject = [
    'ngToast'
  ];

  function MessageService(toast) {

    function displayErrorMessage(message) {
      toast.create({
        content: message,
        className: 'danger'
      });
    }

    function displaySuccessMessage(message) {
     toast.create({
        content: message,
        className: 'success'
      });
    }

    return {
      displayErrorMessage: displayErrorMessage,
      displaySuccessMessage: displaySuccessMessage
    };
  }
})();
