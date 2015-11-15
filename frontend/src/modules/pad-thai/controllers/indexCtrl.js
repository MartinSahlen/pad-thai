(function() {
  'use strict';

  angular
  .module('pad-thai')
  .controller('pad-thai.controllers.PadThaiIndexController', PadThaiIndexController);

  PadThaiIndexController.$inject = [
    '$scope',
    '$uibModal',
    '$stateParams',
    'pad-thai.services.TracksService',
    'pad-thai.services.PlayerService',
    'pad-thai.services.SoundcloudService'
  ];

  function PadThaiIndexController($scope, $uibModal, $stateParams, TracksService, PlayerService, SoundcloudService) {
      
    $scope.player = PlayerService;
    $scope.soundcloud = SoundcloudService;

    function getTracks(lat, lng) {
      TracksService.getTracksForCoordinates(lat, lng, $scope.mood).then(
          function(data) {
            $scope.isLoading = false;
            $scope.isRefreshing = false;
            $scope.weatherType = data.weatherType;
            $scope.tracksData = data.tracks;
            $scope.weatherData = data.weatherData;

            PlayerService.loadTracks(data.tracks);
            PlayerService.play();
          });
    }

    function fetchTracks(refreshing) {
      $scope.isLoading = true;
      if(refreshing) {
        $scope.isRefreshing = true;
      }

      // Googleplex fallback coordinates
      var lat = 37.4219999;
      var lng = -122.0862515;

      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          lat = position.coords.latitude;
          lng = position.coords.longitude;

          getTracks(lat, lng);
        });
      } else {
        getTracks(lat, lng);
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
      if ($stateParams.background) {
        var weatherType = '';
        switch($stateParams.background) {
          case 'cloudy':
            weatherType = 'CLOUDY';
            break;
          case 'rainy':
            weatherType = 'LIGHT_RAIN';
            break;
          case 'snowy':
            weatherType = 'LIGHT_SNOW';
            break;
          case 'sunny':
            weatherType = 'SUNNY';
            break;
          case 'thunder':
            weatherType = 'THUNDER';
            break;
          default:
            return weatherTypes.indexOf($scope.weatherType) !== -1;
        }
        return weatherTypes.indexOf(weatherType) !== -1;
      } else {
        return weatherTypes.indexOf($scope.weatherType) !== -1;
      }
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
      }).result.then(function(refresh) {
        if(refresh) {
          fetchTracks(true);
        }
      });
    };

    // Init
    fetchTracks();
  }
})();
