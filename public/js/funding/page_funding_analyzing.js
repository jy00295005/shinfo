changeNavbarLink(2);
changeSidebarLink(3);

let app = angular.module('shinfo', []);
app.controller('controller', function($scope, $http) {
    $scope.isFirst=true;
    $scope.orgName=[];
    let field="Physical Science & Technology";
    let org="Michigan State University";
    let orgUrl="/shinfo/public/api/output/get_funding_coo_top_orgs/"+field;
    let cooUrl="/shinfo/public/api/output/funding_cooccurrence/"+field+"/"+org;

    let interval=400;
    let fontSize=13;
    let limitWeight=0;

    $scope.weight=function(weight){
        limitWeight=weight;
        d3.select(".nodes").remove();
        d3.select(".links").remove();
        $scope.getCoo();
    };

    $scope.zoomUp=function(){
        interval+=100;
        fontSize+=3;
        d3.select(".nodes").remove();
        d3.select(".links").remove();
        $scope.getCoo();
    };

    $scope.zoomDown=function(){
        interval-=100;
        fontSize-=3;
        d3.select(".nodes").remove();
        d3.select(".links").remove();
        $scope.getCoo();
    };

    $http.get(orgUrl)
        .success(function (response) {
            for(let i=0;i<response.length;i++){
                $scope.orgName.push(response[i]["org"]);
            }
        });

    $("#org").change(function () {
        org=$(this).val();
        cooUrl="/shinfo/public/api/output/funding_cooccurrence/"+field+"/"+org;
        d3.select(".nodes").remove();
        d3.select(".links").remove();
        $scope.getCoo();
    });

    $("#field").change(function () {
        field=$(this).val();
        cooUrl="/shinfo/public/api/output/funding_cooccurrence/"+field+"/"+org;
        d3.select(".nodes").remove();
        d3.select(".links").remove();
        $scope.getCoo();
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
            .force("center", d3.forceCenter(width / 2, height / 2));

        d3.json(cooUrl, function(error, graph) {
            let nodes=[];
            console.log(graph);

            for(let i=graph.links.length-1;i>-1;i--){
                if(graph.links[i]["weight"]<=limitWeight){
                    graph.links.splice(i,1);
                }else{
                    nodes.push(graph.links[i]["source"]);
                    nodes.push(graph.links[i]["target"]);
                }
            }

            for(let i=graph.nodes.length-1;i>-1;i--){
                if(nodes.indexOf(graph.nodes[i]["id"])==-1){
                    graph.nodes.splice(i,1);
                }
            }

            let link = svg.append("g")
                .attr("class", "links")
                .selectAll("line")
                .data(graph.links)
                .enter().append("line")
                .attr("stroke-width", function(d) {
                    return Math.sqrt(d.weight);
                });

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
                .attr("fill", function(d) {
                    return color(d.size);
                })
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
                .attr('y', 3)
                .style("font-size", fontSize+"px")
                .style("text-transform", "uppercase");

            node.append("title")
                .text(function(d) {
                    return d.id;
                })
                .attr("font-size", 50);

            simulation
                .nodes(graph.nodes)
                .on("tick", ticked);

            simulation.force("link")
                .links(graph.links);

            function ticked() {
                link.attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });

                node.attr("transform", function(d) {
                        return "translate(" + d.x + "," + d.y + ")";
                    });
            }

            function dragstarted(d) {
                if (!d3.event.active) simulation.alphaTarget(1).restart();
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
        });
    };

    $scope.getCoo();
});
