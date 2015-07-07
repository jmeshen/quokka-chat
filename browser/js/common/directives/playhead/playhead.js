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
                VideoFactory.playVid();
            }
            scope.tik = 5
            if (scope.duration > 1000) {
                scope.tik = Math.floor(scope.duration / 200);
            }

            $rootScope.$on('playing', function(event, currentTime) {
                scope.selectedN = scope.timeline.indexOf(Math.floor(currentTime / scope.tik) * scope.tik);
                scope.$apply();
            })

            scope.selectedN = 0;
            scope.playbitSelected = function($index) {
                scope.selectedN = $index;

            }

            scope.timeline = []

            for (var i = 0; i < scope.duration; i += scope.tik) {
                scope.timeline.push(i)
            }

            $compile(element.contents())(scope);

        }
    };
});