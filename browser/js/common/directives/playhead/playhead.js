app.directive('playhead', function($rootScope, AuthService, AUTH_EVENTS, $state, $compile, VideoFactory) {
    return {
        restrict: 'E',
        scope: {
            video: "=",
            duration: "="
        },
        templateUrl: 'js/common/directives/playhead/playhead.html',
        link: function(scope, element, attrs) {
            scope.play = function() {
                VideoFactory.playVid();
            }
            scope.pause = function() {
                VideoFactory.pauseVid();
            }
            scope.seekTo = function(sec) {
                VideoFactory.seekTo(sec);
            }
            // $rootScope.on('playing', function(event, currentTime) {
            //     scope.currentTime = currentTime;
            // })

            //todo: update playbit to show currentTime progress of video in realTime
            scope.selectedN = -1;
            scope.playbitSelected = function($index) {
                scope.selectedN = $index;
                console.log('THIS IS SELECTED N', scope.selectedN)
            }


            scope.timeline = []
            for (var i = 0; i < scope.duration; i += 5) {
                scope.timeline.push(i)
            }

            // scope.timeline.forEach(function(seg) {
            //     console.log(seg);
            //     seg = scope.selectedN;
            // })

            $compile(element.contents())(scope);

        }
    };
});