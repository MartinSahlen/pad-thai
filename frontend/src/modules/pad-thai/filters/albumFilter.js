(function() {
  'use strict';

  angular
  .module('pad-thai')
  .filter('albumFilter', AlbumFilterFilter);

  function AlbumFilterFilter() {
    return function(url) {
        if(!url) {
            return '/img/album.png';
        }

        return url;
    };
  }
})();
