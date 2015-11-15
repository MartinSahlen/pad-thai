(function() {
  'use strict';

  angular
  .module('pad-thai')
  .controller('pad-thai.controllers.FavoritesModalController', FavoritesModalController);
  
  FavoritesModalController.$inject = [
    '$scope',
    '$uibModalInstance',
    'resolve.tracks',
    'pad-thai.services.SoundcloudService',
    'pad-thai.services.MessageService'
  ];

  function FavoritesModalController($scope, $uibModalIinstance, tracks, SoundcloudService, MessageService) {
    $scope.modal = $uibModalIinstance;
    $scope.soundcloud = SoundcloudService;
    $scope.tracks = tracks;

    function mapTracks() {
      tracks.map(function(track){
        track.isFavorite = false;
        SoundcloudService.favorites.map(function(favorite){
          if (track.id === favorite.id) {
            track.isFavorite = true;
          }
        });
      });
    }
   
    mapTracks();

    $scope.addFavorite = function(track) {
      SoundcloudService.addFavorite(track);
      mapTracks();
      MessageService.displaySuccessMessage(track.title + ' was added to your favorites.');
    };

    $scope.removeFavorite = function(track) {
      SoundcloudService.removeFavorite(track);
      mapTracks();
      MessageService.displaySuccessMessage(track.title + ' was removed from your favorites.');
    };
  }
})();
