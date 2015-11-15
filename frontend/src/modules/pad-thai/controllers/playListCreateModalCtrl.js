(function() {
  'use strict';

  angular
  .module('pad-thai')
  .controller('pad-thai.controllers.PlaylistCreateModalController', PlayListCreateModalController);
  
  PlayListCreateModalController.$inject = [
    '$scope',
    '$uibModalInstance',
    'resolve.tracks',
    'pad-thai.services.SoundcloudService',
    'pad-thai.services.MessageService'
  ];

  function PlayListCreateModalController($scope, $uibModalIinstance, tracks, SoundcloudService, MessageService) {
    $scope.modal = $uibModalIinstance;
    $scope.tracks = tracks;
    $scope.tracksToAdd = angular.copy(tracks);

    $scope.createPlaylist = function(playlistName) {
      if ($scope.tracksToAdd.length > 0) {
        SoundcloudService.createPlayListWithTracks(playlistName, $scope.tracksToAdd).then(function(createdPlayList){
          MessageService.displaySuccessMessage('Created playlist with name ' + createdPlayList.title +', containing ' +
            createdPlayList.tracks.length + ' songs.');
          $uibModalIinstance.close();
        }, function(response){
          MessageService.displayErrorMessage(response);
        });
      } else {
        MessageService.displayErrorMessage('You need to add at least 1 song to your playlist.');
      }
    
    };
  }
})();
