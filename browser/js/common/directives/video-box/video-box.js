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
            scope.seekTo = function(sec) {
                VideoFactory.seekTo(sec);
            }
            scope.testData = [6,12,18,24,30,36,42,48,54,60,66,72,76,82,88,94,100,106,112,118];
            // console.log(scope.testData);

        }
    };
});