(function() {
  'use strict';

  angular
  .module('pad-thai')
  .controller('pad-thai.controllers.PadThaiIndexController', PadThaiIndexController);

  PadThaiIndexController.$inject = [
    '$scope',
    '$uibModal',
    'pad-thai.services.TracksService',
    'pad-thai.services.PlayerService',
    'pad-thai.services.SoundcloudService'
  ];

  function PadThaiIndexController($scope, $uibModal, TracksService, PlayerService, SoundcloudService) {
      
    $scope.player = PlayerService;
    $scope.soundcloud = SoundcloudService;

    function fetchTracks(refreshing) {
      if(navigator.geolocation) {
        $scope.isLoading = true;
        if(refreshing) {
          $scope.isRefreshing = true;
        }
        navigator.geolocation.getCurrentPosition(function(position) {
          TracksService.getTracksForCoordinates(position.coords.latitude, position.coords.longitude, $scope.mood).then(
            function(data) {
              $scope.isLoading = false;
              $scope.isRefreshing = false;
              $scope.weatherType = data.weatherType;
              $scope.tracksData = data.tracks;
              $scope.weatherData = data.weatherData;

              PlayerService.loadTracks(data.tracks);
              PlayerService.play();
            });
        });
      }
    }

    $scope.weatherType = false;
    $scope.isLoading = false;
    $scope.isRefreshing = false;

    $scope.play = function() {
      PlayerService.play();
    };

    $scope.pause = function() {
      PlayerService.pause();
    };

    $scope.toggleShuffle = function() {
      PlayerService.toggleShuffle();
    };

    $scope.mood = 'neutral';

    $scope.setMood = function(mood) {
      if($scope.mood === mood && mood !== 'neutral') {
        return;
      }
      $scope.mood = mood;

      fetchTracks(true);
    };

    $scope.isVisibleByWeatherTypes = function(weatherTypes) {
      return weatherTypes.indexOf($scope.weatherType) !== -1;
    };

    $scope.openPlaylistCreateModal = function(tracks) {
      $uibModal.open({
        templateUrl: 'modules/pad-thai/templates/playlist-create-modal.html',
        controller: 'pad-thai.controllers.PlaylistCreateModalController',
        resolve: {
          'resolve.tracks': function() {
            return tracks
          }
        }
      })
    };

    $scope.openFavoritesModal = function(tracks) {
      $uibModal.open({
        templateUrl: 'modules/pad-thai/templates/favorites-modal.html',
        controller: 'pad-thai.controllers.FavoritesModalController',
        resolve: {
          'resolve.tracks': function() {
            return tracks
          }
        }
      })
    };

    $scope.openGenresModal = function() {
      $uibModal.open({
        templateUrl: 'modules/pad-thai/templates/genres-modal.html',
        controller: 'pad-thai.controllers.GenresModalController'
      })
    };

    // Init
    fetchTracks();
  }
})();
