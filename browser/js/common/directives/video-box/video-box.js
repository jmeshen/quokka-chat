app.directive('videoBox', function($rootScope, AuthService, AUTH_EVENTS, $state, $stateParams, VideoFactory) {
    return {
        restrict: 'E',
        scope: {
            video: "="
        },
        templateUrl: 'js/common/directives/video-box/video-box.html',
        link: function(scope) {
            console.log('this is scope from link', scope)

            VideoFactory.onYouTubeIframeAPIReady();

            // scope.embedURL = 'https://youtube.com/embed/'+ scope.video.embedId;
            // VideoFactory.getVideoObjectId($stateParams.id).then(function(video) {

            //     scope.video = video;
            //     scope.embedURL = 'https://youtube.com/embed/'+ scope.video.embedId;
            //     console.log('this $scope.video', scope.video)
            //     console.log(scope.video.embedUrl);
            // })
        }
    };
});