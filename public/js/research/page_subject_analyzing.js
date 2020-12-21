changeSidebarLink(3);

let app = angular.module('shinfo', []);
app.controller('controller', function($scope, $http) {
    $scope.isFirst=true;
    let updateDate="2019-06-20";

    if (localStorage.getItem("research_updateDate") != null) {
        updateDate = localStorage.getItem("research_updateDate");
    }

    let uni="上交大";
    let dic="Physics";
    let optionsUrl="/shinfo/public/api/output/get_options/"+updateDate;
    let cooUrl="/shinfo/public/api/cooccurrence/inst_coo/"+updateDate+"/"+uni+"/"+dic;

    $scope.getOption=function(){
        $http.get(optionsUrl)
            .success(function (response) {
                $scope.universityName=response.universityName;
                $scope.dicipline=response.dicipline;
                $scope.timeRange = [];
                for (let i in response["time_range"]) {
                    $scope.timeRange.push(response["time_range"][i]["updateTime"])
                }
                uni = response.universityName[0];
                dic = response.dicipline[0];
                cooUrl="/shinfo/public/api/cooccurrence/inst_coo/"+updateDate+"/"+uni+"/"+dic;
                $scope.getCoo();
            });
    };

    $scope.getOption();

    let interval=400;

    $scope.zoomUp=function(){
        interval+=100;
        d3.select(".nodes").remove();
        d3.select(".links").remove();
        $scope.getCoo();
    };

    $scope.zoomDown=function(){
        interval-=100;
        d3.select(".nodes").remove();
        d3.select(".links").remove();
        $scope.getCoo();
    };


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

    $("#updateDate").change(function () {
        updateDate=$(this).val();
        cooUrl="/shinfo/public/api/cooccurrence/inst_coo/"+updateDate+"/"+uni+"/"+dic;
        optionsUrl="/shinfo/public/api/output/get_options/"+updateDate;
        d3.select(".nodes").remove();
        d3.select(".links").remove();
        $scope.getOption();
    });

    $scope.getCoo=function(){
        let svg = d3.select("#coo"),
            width = +$("#coo").width(),
            height = +svg.attr("height");

        let color = d3.scaleOrdinal(d3.schemeCategory20);

        let simulation = d3.forceSimulation()
            .alphaDecay(0.05)
            .alphaMin(0.1)
            .velocityDecay(0.5)
            .force("link", d3.forceLink()
                .id(function(d) { return d.id; })
                .distance(interval)
            )
            .force("charge", d3.forceManyBody())
            // .force("charge",d3.forceManyBody().strength(-10))
            .force("center", d3.forceCenter(width / 2, height / 2));

        d3.json(cooUrl, function(error, graph) {
            let link = svg.append("g")
                .attr("class", "links")
                .selectAll("line")
                .data(graph.links)
                .enter().append("line")
                .attr("stroke-width", function(d) { return Math.sqrt(d.weight); });

            let node = svg.append("g")
                .attr("class", "nodes")
                .selectAll("g")
                .data(graph.nodes)
                .enter().append("g");

            // Define the div for the tooltip
            let div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            let circles = node.append("circle")
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

            let lables = node.append("text")
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

});
