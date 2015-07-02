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
            scope.timeline = []
            for(var i = 0; i <scope.duration; i += 5){
                scope.timeline.push(i)
            }
            $compile(element.contents())(scope);
        }
    };
});