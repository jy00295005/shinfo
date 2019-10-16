var app = angular.module('shinfo', []);

app.controller('controller', function($scope, $http) {
    $scope.isFirst=true;
    var updateDate="2019-06-20";
    var university="上科大";
    var dicipline="Chemistry";
    var optionsUrl="http://127.0.0.1/shinfo/public/api/output/get_options";
    var cooUrl="http://127.0.0.1/shinfo/public/api/cooccurrence/inst_coo/"+updateDate+"/"+university+"/"+dicipline;

    $("#all1").parent().hide();
    $("#all2").parent().hide();

    $scope.filterss=function(){
        university="";
        dicipline="";
        $("#jigou .checkboxs input:checked").each(function () {
            university+=","+$(this).val();
        });

        $("#lingyu .checkboxs input:checked").each(function () {
            dicipline+=","+$(this).val();
        });

        university=university.replace(",","");
        dicipline=dicipline.replace(",","");

        if(university=="") university="上科大"; // 如果没有选中项，默认全选
        if(dicipline=="") dicipline="Chemistry";

        $(".info-display").css("display","flex");

        $(".info-display span")[0].innerHTML=updateDate;
        $(".info-display span")[1].innerHTML=university;
        $(".info-display span")[2].innerHTML=dicipline;

        cooUrl="http://127.0.0.1/shinfo/public/api/cooccurrence/inst_coo/"+updateDate+"/"+university+"/"+dicipline;
        d3.select(".nodes").remove();
        d3.select(".links").remove();
        $scope.getCoo();
    }

    $http.get(optionsUrl)
        .success(function (response) {
            $scope.universityName=response.universityName;
            $scope.dicipline=response.dicipline;
        });

    $scope.getCoo=function(){
        var svg = d3.select("#coo"),
            width = +$("#coo").width(),
            height = +svg.attr("height");

        var color = d3.scaleOrdinal(d3.schemeCategory20);

        var simulation = d3.forceSimulation()
            .velocityDecay(0.6)
            .force("link", d3.forceLink().id(function(d) { return d.id; }))
            .force("charge", d3.forceManyBody())
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

            var circles = node.append("circle")
                .attr("r", function (d) {
                    return d.size;
                })
                .attr("fill", function(d) { return color(d.size); })
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));

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
        });
    };

    $scope.getCoo();
});

$("#jigou .checkboxs input[type='checkbox']").attr("type","radio");
$("#jigou .checkboxs input").each(function () {
    $(this).attr("name","jigou");
});
$("#lingyu .checkboxs input[type='checkbox']").attr("type","radio");
$("#lingyu .checkboxs input").each(function () {
    $(this).attr("name","lingyu");
});

