var app = angular.module('shinfo', []);

app.controller('controller', function($scope, $http) {
    var optionsUrl="/shinfo/public/api/output/get_options";
    var mcUrl="/shinfo/public/api/output/high_quality_paper/Q1/2019-06-20/上交大,上科大/Physics,Chemistry,Molecular Biology & Genetics,Biology & Biochemistry,Neuroscience & Behavior";

    $http.get(optionsUrl)
        .success(function (response) {
            $scope.universityName=response.universityName;
            $scope.dicipline=response.dicipline;
        });

    var uni1="上交大";
    var uni2="上科大";
    var category="Q1";
    var subject=["Physics","Chemistry","Molecular Biology & Genetics","Biology & Biochemistry","Neuroscience & Behavior"];

    for(let i=1;i<6;i++){
        var query="#diciplineSelect"+i;
        $(query).change(function () {
            subject[i-1]=$(this).val();
            mcUrl="/shinfo/public/api/output/high_quality_paper/"+category+"/2019-06-20/"+uni1+","+uni2+"/"+subject.toString();
            $scope.mc();
        });
    }

    $("#institution1").change(function () {
        uni1=$(this).val();
        mcUrl="/shinfo/public/api/output/high_quality_paper/"+category+"/2019-06-20/"+uni1+","+uni2+"/"+subject.toString();
        $scope.mc();
    });

    $("#institution2").change(function () {
        uni2=$(this).val();
        mcUrl="/shinfo/public/api/output/high_quality_paper/"+category+"/2019-06-20/"+uni1+","+uni2+"/"+subject.toString();
        $scope.mc();
    });

    $("#high_quality_paper").change(function () {
        category=$(this).val();
        mcUrl="h/shinfo/public/api/output/high_quality_paper/"+category+"/2019-06-20/"+uni1+","+uni2+"/"+subject.toString();
        $scope.mc();
    });

    $scope.mc=function() {
        $http.get(mcUrl).success(function (response){
            var allData=[];
            var all1=[];
            var all2=[];

            for (var key in response) {
                allData.push(response[key]);
            }

            var cate="";
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

            for(var i=0;i<5;i++){
                all1.push(allData[0][i][cate]);
                all2.push(allData[1][i][cate]);
            }

            var duoxiangduibi = [],
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
                        reversed: dataset.isReversed
                    },
                    legend: {
                        enabled: false
                    },
                    series: [dataset],
                    tooltip: {
                        enabled: false,
                    },
                }));
            });
            $('.ddbar .element').highcharts().reflow();

        });
    }

    $scope.mc();

    window.onload=function(){ // 去除五个select之间的冲突
        $("#institution2 option:nth-child(2)").attr("selected", "selected");

        var dicipline=[];
        for(var i=1;i<6;i++) {
            var query = "#diciplineSelect" + i + " option:nth-child(" + i + ")"
            $(query).attr("selected", "selected");
            var query2 = "#diciplineSelect" + i;
            dicipline.push($(query2).val());
        }

        for(var i=0;i<5;i++) {
            for (var j = 1; j < 6; j++) {
                var query = "#diciplineSelect" + j + " option";
                $(query).each(function () {
                    if ($(this).val() == dicipline[i]) {
                        $(this).attr("disabled", "disabled");
                    }
                });
            }
        }

        var diciplineS=[dicipline.length];
        for(var i=0;i<dicipline.length;i++){
            diciplineS[i]=dicipline[i];
        }

        for(let i=1;i<6;i++){
            var query="#diciplineSelect"+i;
            var thisVal="";
            $(query).change(function () {
                thisVal=diciplineS[this.id.replace(/[^0-9]/ig,"")-1];
                for(let j=1;j<6;j++){
                    var query="#diciplineSelect"+j+" option";
                    $(query).each(function () {
                        if(dicipline.indexOf(thisVal)>-1){
                            $(this).removeAttr("disabled");
                        }
                    });
                }

                dicipline.splice(dicipline.indexOf(thisVal),1);
                thisVal=$(this).val();
                dicipline.push(thisVal);

                for(let j=1;j<6;j++){
                    var query="#diciplineSelect"+j+" option";
                    $(query).each(function () {
                        if(dicipline.indexOf($(this).val())>-1){
                            $(this).attr("disabled","disabled");
                        }
                    });
                }
            });
        }
    }

});

