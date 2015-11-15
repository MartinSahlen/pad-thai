(function() {
  'use strict';

  angular
  .module('pad-thai')
  .filter('playTime', PlayTimeFilter);

  function PlayTimeFilter() {
     return function(ms) {
            var hours = Math.floor(ms / 36e5),
                    mins = '0' + Math.floor((ms % 36e5) / 6e4),
                    secs = '0' + Math.floor((ms % 6e4) / 1000);
                    mins = mins.substr(mins.length - 2);
                    secs = secs.substr(secs.length - 2);
            if(!isNaN(secs)){
                if (hours){
                    return hours+':'+mins+':'+secs;  
                } else {
                    return mins+':'+secs;  
                }
            } else {
                return '00:00';
            }
        };
  }
})();
