(function() {
  'use strict';

  angular
  .module('pad-thai')
  .factory('pad-thai.services.SoundcloudService', SoundcloudService);

  SoundcloudService.$inject = [
    'pad-thai.config.environment',
    '$window',
    '$http',
    '$q',
    'localStorageService'
  ];

  function SoundcloudService(environment, $window, $http, q, localStorage) {
      
    var status = {
      isAuthenticated: false,
      authenticationFailed: false,
      user: {}
    };

    var favorites = [];
    var playlists = [];

    function authenticate(force) {
      if (getToken()) {
        loginWithToken(getToken());
        status.isAuthenticated = true;
      } else {
        if (force===true) {
          SC.initialize({
            client_id: environment.soundcloudClientId,
            redirect_uri: environment.soundcloudRedirectUri
          });
          SC.connect();
          $window.authCallback = function(error, token) {
            if (error) {
              status.authenticationFailed = true;
            } else {
             loginWithToken(token);
             status.isAuthenticated = true;
            }
          }
        }
      }
    }

    function getToken() {
      return localStorage.get('SC_TOKEN');
    }

    function unAuthenticate() {
      localStorage.set('SC_TOKEN', '');
      var favorites = [];
      var playlists = [];
      status.isAuthenticated = false;
      status.authenticationFailed = false;
      status.user = {};
    }

    function loginWithToken(token) {
      localStorage.set('SC_TOKEN', token);
      SC.initialize({
        oauth_token: token
      });
      status.isAuthenticated = true;
      get('/me').then(function(me){
        status.user = me;
      });
      get('/me/favorites').then(function(songs){
        songs.map(function(track){
          favorites.push(track);
        });
      });
      get('/me/playlists').then(function(lists){
        lists.map(function(list){
          playlists.push(list);
        });
      })
    }

    function generateAuthenticatedRequestUrl(path) {
      return environment.soundcloudApiUrl + path + '?format=json&oauth_token=' + getToken();
    }

    function performRequest(url, method, data) {
      var request = {method: method, url: url, data: data}
      var defered = q.defer();
      $http(request).then(function(data) {
        defered.resolve(data.data);
      }, function(error){
        defered.reject(error);
      });
      return defered.promise;
    }

    function del(path) {
      return performRequest(generateAuthenticatedRequestUrl(path), 'DELETE');
    }

    function get(path) {
      return performRequest(generateAuthenticatedRequestUrl(path), 'GET');
    }

    function put(path) {
      return performRequest(generateAuthenticatedRequestUrl(path), 'PUT');
    }

    function post(path, data) {
      return performRequest(generateAuthenticatedRequestUrl(path), 'POST', data);
    }

    function createPlayListWithTracks(playlistName, tracks) {
      var trackIds = [];
      tracks.map(function(track) {
        trackIds.push({id: track.id});
      });
      return post('/playlists',{playlist:{title: playlistName, tracks: trackIds}});
    }

    function addFavorite(track) {
      favorites.push(track);
      return put('/me/favorites/' + track.id);
    }

    function removeFavorite(track) {
      favorites.map(function(favorite, index){
        if (track.id === favorite.id) {
          favorites.splice(index, 1);
          return del('/me/favorites/' + track.id);
        }
      });
    }

    authenticate(false);

    return {
      status: status,
      favorites: favorites,
      playlists: playlists,
      createPlayListWithTracks: createPlayListWithTracks,
      post: post,
      removeFavorite: removeFavorite,
      addFavorite: addFavorite,
      authenticate: authenticate,
      unAuthenticate: unAuthenticate
    };
  }
})();
