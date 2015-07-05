// app.directive('heatmap', function($state) {
//     return {
//         restrict: 'E',
//         scope: {
//             heatMapComments: '='
//         },
//         templateUrl: 'js/common/directives/heatmap/heatmap.html',
//         link: function(scope) {

//             console.log(scope.heatMapComments, 'display')
//             var svg = d3.select('heatmap')
//                 .append('svg')
//                 .attr('width', 500)
//                 .attr('height', 100);

//             svg.selectAll('rect')
//                 .data(scope.heatMapComments)
//                 .enter()
//                 .append("rect")
//                 .attr("x", function(d, i) {
//                     return i * (500 / heatMapComments.length);
//                 })
//                 .attr("y", function(d) {
//                     return 100 - d;
//                 })
//                 .attr("width", 500 / heatMapComments.length - 1)
//                 .attr("height", function(d) {
//                     return d * 100;
//                 });

//         }
//     };
// });