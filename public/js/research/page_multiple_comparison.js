changeSidebarLink(4);

let app = angular.module('shinfo', []);
app.controller('controller', function($scope, $http) {
    let updateDate="2019-06-20";

    if (localStorage.getItem("research_updateDate") != null) {
        updateDate = localStorage.getItem("research_updateDate");
    }

    let subject="";
    let category="Q1";
    let uni1="";
    let uni2="";

    // x坐标比例尺
    let ti=undefined;
    let tp=undefined;

    let mcUrl="/shinfo/public/api/output/high_quality_paper/"+category+"/"+updateDate+"/"+uni1+","+uni2+"/"+subject;
    let optionsUrl="/shinfo/public/api/output/get_options/"+updateDate;

    $scope.getOption=function() {
        $http.get(optionsUrl)
            .success(function (response) {
                $scope.universityName = response.universityName;
                $scope.dicipline = response.dicipline;
                $scope.timeRange = [];
                for (let i in response["time_range"]) {
                    $scope.timeRange.push(response["time_range"][i]["updateTime"])
                }
                uni1 = response.universityName[0];
                uni2 = response.universityName[1];
                subject = response.dicipline.toString();
                mcUrl="/shinfo/public/api/output/high_quality_paper/"+category+"/"+updateDate+"/"+uni1+","+uni2+"/"+subject;
                $scope.mc();
            });
    };

    $scope.getOption();


    $("#institution1").change(function () {
        uni1=$(this).val();
        mcUrl="/shinfo/public/api/output/high_quality_paper/"+category+"/"+updateDate+"/"+uni1+","+uni2+"/"+subject;
        $scope.mc();
    });

    $("#institution2").change(function () {
        uni2=$(this).val();
        mcUrl="/shinfo/public/api/output/high_quality_paper/"+category+"/"+updateDate+"/"+uni1+","+uni2+"/"+subject;
        $scope.mc();
    });

    $("#high_quality_paper").change(function () {
        category=$(this).val();
        mcUrl="/shinfo/public/api/output/high_quality_paper/"+category+"/"+updateDate+"/"+uni1+","+uni2+"/"+subject;
        $scope.mc();
    });

    $("#updateDate").change(function () {
        updateDate=$(this).val();
        mcUrl="/shinfo/public/api/output/high_quality_paper/"+category+"/"+updateDate+"/"+uni1+","+uni2+"/"+subject;
        optionsUrl="/shinfo/public/api/output/get_options/"+updateDate;
        $scope.getOption();
    });

    $scope.mc=function() {
        $http.get(mcUrl).success(function (response){
            let allData=[];
            let all1=[];
            let all2=[];

            for (let key in response) {
                allData.push(response[key]);
            }

            let cate="";
            switch (category) {
                case "Q1": cate="Q1论文数量"; break;
                case "HQ": cate="高被引论文数"; break;
                case "HOT": cate="热点论文数"; break;
                case "CNS": cate="CNS论文数"; break;
                case "H": cate="h指数"; break;
                case "COAU": cate="国际合作论文数"; break;
                case "CNCI": cate="CNCI"; break;
                case "RF": cate="进入RF的论文"; break;
            }

            for(let i=0;i<allData[0].length;i++){
                all1.push(allData[0][i][cate]);
                all2.push(allData[1][i][cate]);
            }

            // x坐标比例尺
            let all3=all1.concat(all2);
            let max=Math.max(...all3);
            max=parseInt(max/5)*5;

            $("#scale").change(function() {
                if($(this).is(':checked')){
                    ti=max/5;
                    tp=[0, max/5, max/5*2, max/5*3, max/5*4];
                    $scope.mc();
                }else{
                    ti=undefined;
                    tp=undefined;
                    $scope.mc();
                }
            });

            let duoxiangduibi = [],
                $containers = $('.ddbar .element'),
                datasets = [
                    {
                        name: uni1,
                        data: all1,
                        isReversed: true,
                        titleAlign: "left",
                        dataLabels: {
                            enabled: true,
                            color: '#FFFFFF',
                            align: 'left'
                        }
                    },
                    {
                        name: uni2,
                        data: all2,
                        isReversed: false,
                        titleAlign: "right",
                        dataLabels: {
                            enabled: true,
                            color: '#FFFFFF',
                            align: 'right'
                        }
                    }
                ];
            $.each(datasets, function (i, dataset) {
                duoxiangduibi.push(new Highcharts.Chart({
                    chart: {
                        renderTo: $containers[i],
                        type: 'bar',
                        // marginLeft: i === 0 ? 100 : 10
                    },
                    title: {
                        text: dataset.name,
                        align: dataset.titleAlign,
                        x: i === 0 ? 90 : 0
                    },
                    exporting: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    },
                    xAxis:
                        {
                            categories: [],
                            labels: {
                                enabled: i === 0
                            },
                            visible: false,
                        },
                    yAxis: {
                        allowDecimals: false,
                        title: {
                            text: null
                        },
                        reversed: dataset.isReversed,
                        // x坐标比例尺
                        tickInterval: ti,
                        tickPositions: tp
                    },
                    legend: {
                        enabled: false
                    },
                    series: [dataset],
                    tooltip: {
                        enabled: false,
                    },
                    plotOptions: {
                        series: {
                            cursor: 'pointer',
                            events: {
                                click: function (event) {
                                    if(cate=="Q1论文数量"||cate=="高被引论文数"||cate=="热点论文数"||cate=="CNS论文数") {
                                        localStorage.setItem("uni", event.point.series.name);
                                        let num = parseInt(event.point.category) + parseInt(1);
                                        let idText = "#diciplineSelect" + num + " option:selected";
                                        localStorage.setItem("type", cate);
                                        localStorage.setItem("cate", $(idText).text());
                                        localStorage.setItem("ifdg", false);
                                        window.open("list");
                                    }
                                }
                            }
                        }
                    }
                }));
            });
            $('.ddbar .element').highcharts().reflow();
        });
    };

});