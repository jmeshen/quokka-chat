app.directive('videoBox', function($rootScope, AuthService, AUTH_EVENTS, $state, VideoFactory) {
    return {
        restrict: 'E',
        scope: {
            video: "="
        },
        templateUrl: 'js/common/directives/video-box/video-box.html',
        link: function(scope) {

            scope.embedURL = 'https://youtube.com/embed/' + scope.video.embedId;
            VideoFactory.onYouTubeIframeAPIReady(scope.video.embedId);
            scope.play = function() {
                VideoFactory.playVid();
            }
            scope.pause = function() {
                VideoFactory.pauseVid();
            }
        }
    };
});