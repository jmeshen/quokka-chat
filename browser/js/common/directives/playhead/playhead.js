app.directive('playhead', function($rootScope, AuthService, AUTH_EVENTS, $state, $compile, VideoFactory) {
    return {
        restrict: 'E',
        scope: {
            video: "=",
            duration: "=",
            interval: "="
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
            $rootScope.$on('playing', function(event, currentTime) {
                scope.selectedN = scope.timeline.indexOf(Math.ceil(currentTime / scope.interval) * scope.interval);
                scope.$digest();
            })

            scope.selectedN = 0;
            scope.playbitSelected = function($index) {
                scope.selectedN = $index;

            }

            scope.timeline = []
            for (var i = 0; i < scope.duration; i += scope.interval) {
                scope.timeline.push(i)
            }

            $compile(element.contents())(scope);

        }
    };
});