'use strict';

angular.module('thomasApp')
  .factory('audioFactory', function ($q, $document, $timeout) {
    // Service logic

    var audioElement = $document[0].createElement('audio');


    return {
      toSpeech: function(text, pause) {
        var processing = $q.defer();
        var timeout = 0;
        console.log('speeching...')
        var params = {
          accept: 'audio/ogg; codecs=opus',
          voice: 'VoiceEnUsMichael',
          text: text
        }
        var parametrize = '/api/tts/synthesize?' + $.param(params);
        if (pause && pause == parseInt(pause, 10)){
          timeout = pause;
        }
        $timeout(function(){
          audioElement.src = parametrize;
          audioElement.play();
          audioElement.addEventListener("ended", function(){
            audioElement.currentTime = 0;
            audioElement.pause();
            processing.resolve('ended')
          });
        }, timeout)
        return processing.promise;
      }
    }
  });
