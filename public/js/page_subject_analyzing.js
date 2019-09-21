var app = angular.module('shinfo', []);

app.controller('controller', function($scope, $http) {
    $scope.isFirst=true;

    $scope.loadTime=function () {
        if($scope.isFirst){
            $("#timeslider").dateRangeSlider({
                bounds: {
                    min: new Date(2010, 2, 1),
                    max: new Date(2020, 11, 31)
                },
                defaultValues: {
                    min: new Date(2010, 3, 1),
                    max: new Date(2020, 10, 31)
                },
                formatter: function(val){
                    var year = val.getFullYear()+"年";
                    return year;
                },
                step: {
                    years: 1
                }
            });
            $scope.isFirst=false;
        }
    };

    var updateDate="2019-06-20";
    var university="all";
    var dicipline="all";

    var optionsUrl="http://127.0.0.1/shinfo/public/api/output/get_options";
    var noppUrl="http://127.0.0.1/shinfo/public/api/output/inst_paper_count/citation/"+updateDate+"/"+university+"/"+dicipline;
    var toppUrl="http://127.0.0.1/shinfo/public/api/output/inst_paper_trend/citation/"+updateDate+"/"+university+"/"+dicipline;
    var hUrl="http://127.0.0.1/shinfo/public/api/output/high_quality_paper/H/"+updateDate+"/"+university+"/"+dicipline;
    var coauUrl="http://127.0.0.1/shinfo/public/api/output/high_quality_paper/COAU/"+updateDate+"/"+university+"/"+dicipline;
    var cnciUrl="http://127.0.0.1/shinfo/public/api/output/high_quality_paper/CNCI/"+updateDate+"/"+university+"/"+dicipline;
    var rfUrl="http://127.0.0.1/shinfo/public/api/output/high_quality_paper/RF/"+updateDate+"/"+university+"/"+dicipline;

    $scope.filterss=function(){
        var timeSlider = $("#timeslider").dateRangeSlider("values");
        university="";
        dicipline="";
        $("#jigou .checkboxs input[type='checkbox']:checked").each(function () {
            university+=","+$(this).val();
        });

        $("#lingyu .checkboxs input[type='checkbox']:checked").each(function () {
            dicipline+=","+$(this).val();
        });

        university=university.replace(",","");
        dicipline=dicipline.replace(",","");
        // updateDate=timeSlider.min.getFullYear()+"&"+timeSlider.max.getFullYear();

        if(university=="") university="all"; // 如果没有选中项，默认全选
        if(dicipline=="") dicipline="all";

        console.log("时间范围："+updateDate);
        console.log("机构选择："+university);
        console.log("研究领域："+dicipline);

        $(".info-display").css("display","flex");

        $(".info-display span")[0].innerHTML=updateDate;
        $(".info-display span")[1].innerHTML=university;
        $(".info-display span")[2].innerHTML=dicipline;

        toppUrl="http://127.0.0.1/shinfo/public/api/output/inst_paper_trend/citation/"+updateDate+"/"+university+"/"+dicipline;
        noppUrl="http://127.0.0.1/shinfo/public/api/output/inst_paper_count/citation/"+updateDate+"/"+university+"/"+dicipline;
        hUrl="http://127.0.0.1/shinfo/public/api/output/high_quality_paper/H/"+updateDate+"/"+university+"/"+dicipline;
        coauUrl="http://127.0.0.1/shinfo/public/api/output/high_quality_paper/COAU/"+updateDate+"/"+university+"/"+dicipline;
        cnciUrl="http://127.0.0.1/shinfo/public/api/output/high_quality_paper/CNCI/"+updateDate+"/"+university+"/"+dicipline;
        rfUrl="http://127.0.0.1/shinfo/public/api/output/high_quality_paper/RF/"+updateDate+"/"+university+"/"+dicipline;

        // $("#nopp").highcharts().showLoading();
        // $("#topp").highcharts().showLoading();
        // $("#q1").highcharts().showLoading();
        // $("#hq").highcharts().showLoading();
        // $("#hot").highcharts().showLoading();
        // $("#cns").highcharts().showLoading();

        // $scope.getNopp();
        // $scope.getTopp();
        // $scope.getH();
        // $scope.getCoau();
        // $scope.getCnci();
        // $scope.getRf();
    }

    $http.get(optionsUrl)
        .success(function (response) {
            $scope.universityName=response.universityName;
            $scope.dicipline=response.dicipline;
        });

    var weightV={
        "Pr": 2,
        "Ba": 4,
        "Ge": 3,
        "Ce": 4,
        "It": 5,
        "He": 9,
        "An": 3,
        "In": 7,
        "To": 6,
        "Os": 5,
        "Br": 4,
        "Go": 3,
    };

    Highcharts.addEvent(
        Highcharts.seriesTypes.networkgraph,
        'afterSetOptions',
        function (e) {
            var colors = Highcharts.getOptions().colors,
                i = 0,
                nodes = {};
            e.options.data.forEach(function (link) {
                if (link[0] === 'Proto') {
                    nodes['Proto'] = {
                        id: 'Proto',
                        marker: {
                            radius: 20
                        }
                    };
                    nodes[link[1]] = {
                        id: link[1],
                        marker: {
                            radius: 10
                        },
                        color: colors[i++]
                    };
                } else if (nodes[link[0]] && nodes[link[0]].color) {
                    nodes[link[1]] = {
                        id: link[1],
                        color: nodes[link[0]].color
                    };
                }
            });
            e.options.nodes = Object.keys(nodes).map(function (id) {
                return nodes[id];
            });
        }
    );
    Highcharts.chart('hot', {
        chart: {
            type: 'networkgraph',
            height: '100%'
        },
        title: {
            text: '关键词共现图谱'
        },
        plotOptions: {
            networkgraph: {
                keys: ['from', 'to', 'weight'],
                layoutAlgorithm: {
                    enableSimulation: true
                }
            }
        },
        tooltip: {
            formatter: function(){
                console.log(this);
                this.x=weightV[this.key];
                return this.key+"<br>"+"权重："+this.x;
            }
        },
        series: [{
            dataLabels: {
                enabled: true
            },
            data: [
                ['Proto', 'Ba'],
                ['Proto', 'Ge'],
                ['Proto', 'Ce'],
                ['Proto', 'It'],
                ['Proto', 'He'],
                ['Proto', 'An'],
                ['Proto', 'In'],
                ['Proto', 'To'],
                ['It', 'Os'],
                ['Ce', 'Br'],
                ['Ce', 'Go'],
                ["Os","He"],
                ["It","An"],
                ["It","In"],
                ["Go","Ge"]
            ]
        }]
    });

    Highcharts.chart('q1', {
        chart: {
            type: 'networkgraph',
            height: '100%'
        },
        title: {
            text: '关键词共现图谱'
        },
        plotOptions: {
            networkgraph: {
                keys: ['from', 'to', 'weight'],
                layoutAlgorithm: {
                    enableSimulation: true
                }
            }
        },
        tooltip: {
            formatter: function(){
                console.log(this);
                this.x=weightV[this.key];
                return this.key+"<br>"+"权重："+this.x;
            }
        },
        series: [{
            dataLabels: {
                enabled: true
            },
            data: [
                ['Proto', 'Ba'],
                ['Proto', 'Ge'],
                ['Proto', 'Ce'],
                ['Proto', 'It'],
                ['Proto', 'He'],
                ['Proto', 'An'],
                ['Proto', 'In'],
                ['Proto', 'To'],
                ['It', 'Os'],
                ['Ce', 'Br'],
                ['Ce', 'Go'],
                ["Os","He"],
                ["It","An"],
                ["It","In"],
                ["Go","Ge"]
            ]
        }]
    });

    Highcharts.chart('hq', {
        chart: {
            type: 'networkgraph',
            height: '100%'
        },
        title: {
            text: '关键词共现图谱'
        },
        plotOptions: {
            networkgraph: {
                keys: ['from', 'to', 'weight'],
                layoutAlgorithm: {
                    enableSimulation: true
                }
            }
        },
        tooltip: {
            formatter: function(){
                console.log(this);
                this.x=weightV[this.key];
                return this.key+"<br>"+"权重："+this.x;
            }
        },
        series: [{
            dataLabels: {
                enabled: true
            },
            data: [
                ['Proto', 'Ba'],
                ['Proto', 'Ge'],
                ['Proto', 'Ce'],
                ['Proto', 'It'],
                ['Proto', 'He'],
                ['Proto', 'An'],
                ['Proto', 'In'],
                ['Proto', 'To'],
                ['It', 'Os'],
                ['Ce', 'Br'],
                ['Ce', 'Go'],
                ["Os","He"],
                ["It","An"],
                ["It","In"],
                ["Go","Ge"]
            ]
        }]
    });

    Highcharts.chart('cns', {
        chart: {
            type: 'networkgraph',
            height: '100%'
        },
        title: {
            text: '关键词共现图谱'
        },
        plotOptions: {
            networkgraph: {
                keys: ['from', 'to', 'weight'],
                layoutAlgorithm: {
                    enableSimulation: true
                }
            }
        },
        tooltip: {
            formatter: function(){
                console.log(this);
                this.x=weightV[this.key];
                return this.key+"<br>"+"权重："+this.x;
            }
        },
        series: [{
            dataLabels: {
                enabled: true
            },
            data: [
                ['Proto', 'Ba'],
                ['Proto', 'Ge'],
                ['Proto', 'Ce'],
                ['Proto', 'It'],
                ['Proto', 'He'],
                ['Proto', 'An'],
                ['Proto', 'In'],
                ['Proto', 'To'],
                ['It', 'Os'],
                ['Ce', 'Br'],
                ['Ce', 'Go'],
                ["Os","He"],
                ["It","An"],
                ["It","In"],
                ["Go","Ge"]
            ]
        }]
    });


    // $scope.getNopp();
    // $scope.getTopp();
    // $scope.getH();
    // $scope.getCoau();
    // $scope.getCnci();
    // $scope.getRf();

});