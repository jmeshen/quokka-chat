app.directive('heatmap', function() {
    return {
        restrict: 'E',
        scope: {
            video: "=",
            duration: "="
        },
        templateUrl: 'js/common/directives/heatmap/heatmap.html',
        link: function(scope) {
            scope.comments = scope.video.comments.sort(function(a, b) {
                if (a.videoTime < b.videoTime) return -1
                else if (a.videoTime > b.videoTime) return 1
                else return 0
            })

            var lowerbound = 0 - (5 / 2)
            var upperbound = 0 + (5 / 2)
            var bucket = 0
            scope.heatMapComments = []
            for (var i = 0; i < scope.duration / 5; i++) {
                if (!scope.heatMapComments[i]) scope.heatMapComments.push(0)
                if (i < scope.comments.length) {
                    if ((lowerbound < scope.comments[i].videoTime) && (scope.comments[i].videoTime < upperbound)) {
                        scope.heatMapComments[bucket] += 1
                    } else {
                        i--
                        bucket += 1
                        scope.heatMapComments[bucket] = 0
                        lowerbound += 5
                        upperbound += 5
                    }
                }
            }


            var svg = d3.select('heatmap')
                .append('svg')
                .attr('width', 500)
                .attr('height', 100);

            svg.selectAll('rect')
                .data(scope.heatMapComments)
                .enter()
                .append("rect")
                .attr("x", function(d, i) {
                    return i * (500 / scope.heatMapComments.length);
                })
                .attr("y", function(d) {
                    return -d;
                })
                .attr("width", 500 / scope.heatMapComments.length - 1)
                .attr("height", function(d) {
                    return d * 20;
                });

        }
    };
});