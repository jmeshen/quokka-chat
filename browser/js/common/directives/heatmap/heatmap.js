app.directive('heatmap', function(D3Factory) {
    return {
        restrict: 'E',
        scope: {
            video: "=",
            duration: "="
        },
        templateUrl: 'js/common/directives/heatmap/heatmap.html',
        link: function(scope, element, attrs) {
            // scope.comments = scope.video.comments.sort(function(a, b) {
            //     if (a.videoTime < b.videoTime) return -1
            //     else if (a.videoTime > b.videoTime) return 1
            //     else return 0
            // })

            // var lowerbound = 0 - (5 / 2)
            // var upperbound = 0 + (5 / 2)
            // var bucket = 0
            // scope.heatMapComments = []
            // for (var i = 0; i < scope.duration / 5; i++) {
            //     scope.heatMapComments[i] = 0
            // }
            // for (var i = 0; i < scope.comments.length; i++) {
            //     var bucket = Math.floor(scope.comments[i].videoTime / 5)
            //     scope.heatMapComments[bucket]++
            // }
            scope.heatMapComments = [22, 41, 2, 3, 1, 44, 12, 31, 52, 11, 5, 8, 4, 7, 29, 36, 27, 48, 17, 3, 13, 4, 42, 56, 21, 53, 34, 22, 44, 26, 33, 64, 54, 64, 42, 57, 23, 51, 28, 25, 15, 11, 31, 21, 41, 51, 13, 31, 16, 19, 18, 14, 12, 13, 14, 31]
            var w = 400
            var h = 40
            var factor = h / Math.max.apply(Math, scope.heatMapComments)
            D3Factory.createHeatMap(scope.heatMapComments, w, h, factor)

        }
    };
});