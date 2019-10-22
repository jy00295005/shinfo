var app = angular.module('shinfo', []);

app.controller('controller', function($scope, $http) {
    $scope.isFirst=true;
    var updateDate="2019-06-20";
    var uni="上交大";
    var dic="Physics";
    var optionsUrl="/shinfo/public/api/output/get_options";
    var cooUrl="/shinfo/public/api/cooccurrence/inst_coo/"+updateDate+"/"+uni+"/"+dic;

    $http.get(optionsUrl)
        .success(function (response) {
            $scope.universityName=response.universityName;
            $scope.dicipline=response.dicipline;
        });

    $("#institution").change(function () {
        uni=$(this).val();
        cooUrl="/shinfo/public/api/cooccurrence/inst_coo/"+updateDate+"/"+uni+"/"+dic;
        d3.select(".nodes").remove();
        d3.select(".links").remove();
        $scope.getCoo();
    });

    $("#dicipline").change(function () {
        dic=$(this).val();
        cooUrl="/shinfo/public/api/cooccurrence/inst_coo/"+updateDate+"/"+uni+"/"+dic;
        d3.select(".nodes").remove();
        d3.select(".links").remove();
        $scope.getCoo();
    });

    $scope.getCoo=function(){
        var svg = d3.select("#coo"),
            width = +$("#coo").width(),
            height = +svg.attr("height");

        var color = d3.scaleOrdinal(d3.schemeCategory20);

        var simulation = d3.forceSimulation()
            .alphaDecay(0.05)
            .alphaMin(0.1)
            .velocityDecay(0.5)
            .force("link", d3.forceLink()
                .id(function(d) { return d.id; })
                .distance(60)
            )
            .force("charge", d3.forceManyBody())
            // .force("charge",d3.forceManyBody().strength(-10))
            .force("center", d3.forceCenter(width / 2, height / 2));

        d3.json(cooUrl, function(error, graph) {
            var link = svg.append("g")
                .attr("class", "links")
                .selectAll("line")
                .data(graph.links)
                .enter().append("line")
                .attr("stroke-width", function(d) { return Math.sqrt(d.weight); });

            var node = svg.append("g")
                .attr("class", "nodes")
                .selectAll("g")
                .data(graph.nodes)
                .enter().append("g");

            // Define the div for the tooltip
            var div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            var circles = node.append("circle")
                .attr("r", function (d) {
                    return Math.sqrt(d.size)*4;
                })
                .attr("fill", function(d) { return color(d.size); })
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended))
                .on("mouseover", function(d) {
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div	.html(d.id+": "+d.size)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function(d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                });

            var lables = node.append("text")
                .text(function(d) {
                    return d.id;
                })
                .attr('x', 6)
                .attr('y', 3);

            node.append("title")
                .text(function(d) { return d.id; });

            simulation
                .nodes(graph.nodes)
                .on("tick", ticked);

            simulation.force("link")
                .links(graph.links);

            function ticked() {
                link
                    .attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });

                node
                    .attr("transform", function(d) {
                        return "translate(" + d.x + "," + d.y + ")";
                    })
            }

            function dragstarted(d) {
                if (!d3.event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            }

            function dragended(d) {
                if (!d3.event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }

            $("circle").click(function () {
                localStorage.setItem("uni",uni);
                localStorage.setItem("cate",dic);
                localStorage.setItem("keyWord",$(this).parent()[0].lastChild.innerHTML);
                localStorage.setItem("ifdg",true);
                window.open("list");
            });
        });
    };

    $scope.getCoo();
});
