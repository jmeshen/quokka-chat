app.factory('D3Factory', function(VideoFactory) {
    var svg;
    d3.createHeatMap = function(array, w, h, factor) {
        svg = d3.select('heatmap')
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
            .data(array)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("id", function(d, i) {
                return i
            })
            .attr("x", function(d, i) {
                return i * (w / array.length);
            })
            .attr("y", function(d) {
                return h - (d * factor)
            })
            .attr("width", w / array.length)
            .attr("height", function(d) {
                return d * factor;
            })
            .attr("fill", function(d) {

                return "rgb(" + Math.floor((d * factor * 3)) + "," + Math.floor((d * factor * 3.5)) + "," + Math.floor((d * factor * 6)) + ")";
            })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
            .on('click', function(d, i) {
                VideoFactory.seekTo(i * 5)
            })
    }
    return d3
})