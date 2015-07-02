app.directive('videoBox', function($rootScope, AuthService, AUTH_EVENTS, $state, VideoFactory) {
    return {
        restrict: 'E',
        scope: {
            video: "="
        },
        templateUrl: 'js/common/directives/video-box/video-box.html',
        link: function(scope) {
            // console.log('this is scope from link', scope);
            // console.log(scope.video)

            scope.embedURL = 'https://youtube.com/embed/' + scope.video.embedId;
            VideoFactory.onYouTubeIframeAPIReady(scope.video.embedId);
        }
    };
});