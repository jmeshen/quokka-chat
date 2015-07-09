app.directive('top', function(VideoFactory) {
    return {
        restrict: 'E',
        scope: {
            video: "="
        },
        templateUrl: "js/common/directives/top/top.html",
        link: function(scope, element, attrs) {
            scope.comments = scope.video.comments.sort(function(a, b) {
                if (a.rating.score < b.rating.score) {
                    return 1
                } else if (a.rating.score > b.rating.score) {
                    return -1
                } else {
                    return 0
                }
            })

            scope.comments.splice(5);
            scope.seek = function(sec) {
                VideoFactory.seekTo(sec)
                VideoFactory.playVid()
            };
            scope.comments.forEach(function(a) {
                a.videoTime = Math.floor(a.videoTime)
            })
        }
    }
})