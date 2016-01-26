'use strict';

angular.module('thomasApp')
  .controller('MainCtrl', function ($scope, $http, $timeout, $interval, audioFactory) {

    $scope.started = false;

    $scope.begin=function(){
      $scope.started = true;
      audioFactory.toSpeech('Well hello there. Welcome to the IBM Research THINKLab. My name is Thomas, and I\'ll be guiding your tour today. Before we get started, what can I call you?').then(function(){
        $scope.needName = true;
      })
    }
    var wandTimer;

    $scope.startWand = function(){
      $scope.tryWand = true;
      $scope.wandTime = 0;
      wandTimer = $interval(function() {
          $scope.wandTime += 1;
          console.log($scope.wandTime)
      }, 1000);
    }

    $scope.nameAdded = function(){
      $scope.needName = false;
      audioFactory.toSpeech('Hello ' + $scope.name + '. We\'re glad to have you. I know Yorktown is a little out of the way, so we appreciate you taking the time to come out to see us.').then(function(){
        audioFactory.toSpeech('This is the THINKlab Galaxy. In the galaxy we have many pawleeheedrons, each representing a different IBM Research project. To navigate, we can use the wand. If you\'d like to try, feel free to pick up the one next to me.').then(function(){
          $scope.startWand();
          audioFactory.toSpeech('When you are comfortable with navigating the Galaxy or if you\'re too timid to try, you can skip ahead.').then(function(){
            $timeout(function(){
              if ($scope.tryWand == true){
                audioFactory.toSpeech('To turn it on, press the black button on the end and then let it sit on the table. It\'s waking up by listening for the ultrasonic signals, just like echo location. It is also connecting to the why fie.').then(function(){
                  $timeout(function(){
                    if ($scope.tryWand == true){
                      audioFactory.toSpeech('Now you can select a story or sort them. To sort them, aim the wand at the wall to any side of the screens, which will sort projects by theme, domain, industry or in alphabetical order.')
                    }
                  }, 5000)
                })
              }
            }, 5000)
          })
        })
      })
    }

    $scope.wandTried = function(){
      $scope.tryWand = false;
      console.log($scope.wandTime)
      $interval.cancel(wandTimer);
      console.log('ready')

      if ($scope.wandTime <= 15){
        console.log('short')
        audioFactory.toSpeech('That was fast. You must be a wand prodigy.').then(function(){
          $scope.tryStory();
        })
      } else {
        console.log('long')
        audioFactory.toSpeech('Great job! I haven\'t seen anyone this good since Bring Your Child to Work Day.').then(function(){
          $scope.tryStory();
        })
      }
    }

    $scope.tryStory = function(){
      audioFactory.toSpeech('Now let\'s take a look at one of the stories.', 250)
    }

});
