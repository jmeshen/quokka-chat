app.directive('videoBox', function($rootScope, VideoFactory) {
    return {
        restrict: 'E',
        scope: {
            video: "="
        },
        templateUrl: 'js/common/directives/video-box/video-box.html',
        link: function(scope, element, attrs) {
            scope.embedURL = 'https://youtube.com/embed/' + scope.video.embedId;
            VideoFactory.onYouTubeIframeAPIReady(scope.video.embedId);
            scope.arr = [];
            $rootScope.$on('duration', function(event, player) {
                scope.duration = player.getDuration()
                scope.arr.push({
                    duration: scope.duration,
                    video: scope.video
                })
                scope.$apply();
            })

        }
    };
});