app.directive('videoBox', function($rootScope, AuthService, AUTH_EVENTS, $state, $compile, VideoFactory) {
    return {
        restrict: 'E',
        scope: {
            video: "="
        },
        templateUrl: 'js/common/directives/video-box/video-box.html',
        link: function(scope, element, attrs) {
            scope.embedURL = 'https://youtube.com/embed/' + scope.video.embedId;
            VideoFactory.onYouTubeIframeAPIReady(scope.video.embedId);
            $rootScope.$on('duration', function(event, player) {
                var videobox = document.getElementsByTagName('video-box');
                scope.duration = player.getDuration()
                scope.interval = 5;
                var playhead = angular.element(document.createElement('playhead'));
                playhead.attr('duration', 'duration')
                playhead.attr('video', 'video')
                var el = $compile(playhead)(scope);
                if (angular.element(videobox[0]).children.length) {
                    angular.element(videobox[0].lastChild).replaceWith(playhead)
                }
                angular.element(videobox[0]).append(playhead)

            })
        }
    };
});