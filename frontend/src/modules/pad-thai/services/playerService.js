(function() {
  'use strict';

  angular
  .module('pad-thai')
  .factory('pad-thai.services.PlayerService', PlayerService);

  PlayerService.$inject = [
    '$document',
    '$rootScope',
    '$http',
    'pad-thai.config.environment'
  ];

  function PlayerService($document, $rootScope, $http, environment) {
    var player = {
      audio: document.createElement('audio'),
      clientID: environment.soundcloudClientId,
      currentTime: 0,
      duration: 0,
      timeLeft: 0,
      isLoading: false,
      track: false,
      playing: false,
      paused: false,
      shuffle: false,
      tracks: [],
      i: null,
      init: function() {
        var that = this;
        that.audio.addEventListener('ended', function() {
          $rootScope.$apply(function(){
            if (that.tracks.length > 0){
              that.next();
            }
            else {
              that.pause();
            }
          });
        }, false);
        that.audio.addEventListener('timeupdate', function() {
          $rootScope.$apply(function(){
            that.currentTime = (that.audio.currentTime * 1000).toFixed();
            that.duration = (that.audio.duration * 1000).toFixed();
            that.timeLeft = that.duration - that.currentTime;
          });
        });
      },
      toggleShuffle: function(){
        this.shuffle = !this.shuffle;

        if(this.shuffle) {
          this.play();
        }
      },
      play: function(i) {
        if (i == null) {
          i = this.i || 0;
        }
        if(this.shuffle) {
          this.i = Math.floor(Math.random() * this.tracks.length);
        } else {
          this.i = i;
        }

        this.track = this.tracks[this.i];

        if (this.paused != this.track) {
          this.audio.pause();
          this.audio = document.createElement('audio');
          this.init();
          this.audio.src = this.track.stream_url + '?client_id=' + this.clientID;
          this.audio.playbackRate=1;
        }
        this.audio.play();
        this.playing = this.track;
        this.paused = false;
      },
      pause: function() {
        if (this.playing) {
          this.paused = this.playing;
          this.playing = false;
          this.audio.pause();
        }
      },
      next: function() {
        var i = this.tracks.indexOf(this.track) + 1;
        if (i < this.tracks.length) {
          this.i = i;
        }
        else {
          this.i = 0;
        }
        this.play(this.i);
      },
      previous: function() {
        if (this.audio.currentTime < 5){
          var i = this.tracks.indexOf(this.track) - 1;
          if (i >= 0) {
            this.i = i;
          }
          else {
            this.i = this.tracks.length-1;
          }
          this.play(this.i);
        }
        else {
          this.audio.currentTime = 0;
        }
      },
      seekTo: function(position){
        this.audio.currentTime = (position * this.audio.duration);
      },
      loadTracks: function(tracks) {
        var that = this;
        this.pause();
        this.track = false;
        this.playing = false;
        this.paused = false;
        this.tracks = [];
        angular.forEach(tracks, function(track){
          if (track.streamable) {
            that.tracks.push(track);
          }
        });
      }
    };
    player.init();
    return player;
  }
})();
