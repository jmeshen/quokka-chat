app.directive('top', function(VideoFactory) {
    return {
        restrict: 'E',
        scope: {
            video: "="
        },
        templateUrl: "js/common/directives/top/top.html",
        link: function(scope, element, attrs) {
            // var first, second, third;
            // console.log("video", scope.video.comments)
            // for (var i = 0; i < scope.video.comments.length; i++) {
            //     if (!first || (scope.video.comments[i].rating > first.rating)) {
            //         third = second
            //         second = first
            //         first = scope.video.comments[i]
            //     }
            //     if (!second) || (scope.video.comments[i].rating > second.rating) {
            //         third = second
            //         second = scope.video.comments[i]
            //     }
            //     if (!third) || (scope.video.comments[i].rating > third.rating) {
            //         third = scope.video.comments[i]
            //     }
            // }

            scope.comments = scope.video.comments.sort(function(a, b) {
                (a.rating < b.rating) ? -1 : ((a.rating > b.rating) ? 1 : 0)
            })

            scope.seek = function(sec) {
                VideoFactory.seekTo(sec)
                VideoFactory.playVid()
            };
            scope.comments.splice(5);
            scope.comments.forEach(function(a) {
                a.videoTime = Math.floor(a.videoTime)
            })
        }
    }
})