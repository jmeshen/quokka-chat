app.directive('heatmap', function() {
    return {
        restrict: 'E',
        scope: {
            video: "=",
            duration: "="
        },
        templateUrl: 'js/common/directives/heatmap/heatmap.html',
        link: function(scope, element, attrs) {
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
                scope.heatMapComments[i] = 0
            }
            for (var i = 0; i < scope.comments.length; i++) {
                var bucket = Math.floor(scope.comments[i].videoTime / 5)
                scope.heatMapComments[bucket]++
            }
            // scope.heatMapComments = [22, 41, 2, 3, 1, 44, 12, 31, 52, 11, 5, 8, 4, 7, 29, 6, 2, 4, 7, 3, 1, 4, 4, 56, 2, 5, 5, 2, 4, 6, 3, 4, 54, 64, 2, 57, 2, 5, 8, 2, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            console.log(scope.heatMapComments.length * 5, scope.duration)
            var w = 400
            var h = 40
            var factor = h / Math.max.apply(Math, scope.heatMapComments)
            var svg = d3.select('heatmap')
                .append("div")
                .classed("svg-container", true)
                //container class to make it responsive
                .append("svg")
                //responsive SVG needs these 2 attributes and no width and height attr
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", "0 0 400 40")
                //class to make it responsive
                .classed("svg-content-responsive", true);

            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-5, 0]).html(function(d) {
                    return "<span><strong>" + d + " Comments" + "</strong></span>"
                });
            svg.call(tip)
            svg.selectAll('rect')
                .data(scope.heatMapComments)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("id", function(d, i) {
                    return i
                })
                .attr("x", function(d, i) {
                    return i * (w / scope.heatMapComments.length);
                })
                .attr("y", function(d) {
                    return h - (d * factor)
                })
                .attr("width", w / scope.heatMapComments.length)
                .attr("height", function(d) {
                    return d * factor;
                })
                .attr("fill", function(d) {
                    return "rgb(" + (d * 15) + "," + d * 15 + "," + d * 20 + ")";
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