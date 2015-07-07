app.directive('heatmap', function() {
    return {
        restrict: 'E',
        scope: {
            video: "=",
            duration: "="
        },
        templateUrl: 'js/common/directives/heatmap/heatmap.html',
        link: function(scope) {
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
            //     if (!scope.heatMapComments[i]) scope.heatMapComments.push(0)
            //     if (i < scope.comments.length) {
            //         if ((lowerbound < scope.comments[i].videoTime) && (scope.comments[i].videoTime < upperbound)) {
            //             scope.heatMapComments[bucket] += 1
            //         } else {
            //             i--
            //             bucket += 1
            //             scope.heatMapComments[bucket] = 0
            //             lowerbound += 5
            //             upperbound += 5
            //         }
            //     }
            // }
            scope.heatMapComments = [22, 41, 2, 3, 1, 44, 12, 31, 52, 11, 5, 8, 4, 7, 29, 6, 2, 4, 7, 3, 1, 4, 4, 56, 2, 5, 5, 2, 4, 6, 3, 4, 54, 64, 2, 57, 2, 5, 8, 2, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            console.log(scope.heatMapComments.length)
            var w = 500
            var h = 70
            var factor = h / Math.max.apply(Math, scope.heatMapComments)
            var svg = d3.select('heatmap')
                .append('svg')
                .attr('class', 'heatmap')
                .attr('width', w)
                .attr('height', h);

            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([(h / factor) * 1.5, 0]).html(function(d) {
                    console.log(tip, 'tip')
                    return "<span><strong>" + d + " Comments" + "</strong></span>"
                });
            svg.call(tip)
            svg.selectAll('rect')
                .data(scope.heatMapComments)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", function(d, i) {
                    return i * (w / scope.heatMapComments.length);
                })
                .attr("y", function(d) {
                    return 0
                })
                .attr("width", w / scope.heatMapComments.length)
                .attr("height", function(d) {
                    return d;
                })
                .attr("fill", function(d) {
                    return "rgb(0,0, " + (d * 50) + ")";
                })
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide);

            // svg.selectAll("text")
            //     .data(scope.heatMapComments)
            //     .enter()
            //     .append("text")
            //     .text(function(d) {
            //         return d;
            //     })
            //     .attr("x", function(d, i) {
            //         return i * (w / scope.heatMapComments.length) + (w / scope.heatMapComments.length - 1) / 2;
            //     })
            //     .attr("y", function(d) {
            //         return h - (d * factor) + 10 * factor
            //     })
            //     .attr("font-family", "sans-serif")
            //     .attr("font-size", ((w / scope.heatMapComments.length) * .7) + "px")
            //     .attr("fill", "white")
            //     .attr("text-anchor", "middle")
        }
    };
});