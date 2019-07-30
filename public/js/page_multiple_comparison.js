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

    }

    $http.get(optionsUrl)
        .success(function (response) {
            $scope.universityName=response.universityName;
            $scope.dicipline=response.dicipline;
        });

    var value1="上交大";
    var value2="上科大";

    $scope.mc=function() {
        var duoxiangduibi = [],
            $containers = $('.ddbar .element'),
            datasets = [
                {
                    name: value1,
                    data: [3, 6, 1, 2, 6],
                    isReversed: true,
                    titleAlign: "left"
                },
                {
                    name: value2,
                    data: [5, 6, 4, 2, 1],
                    isReversed: false,
                    titleAlign: "right"
                }
            ];
        $.each(datasets, function (i, dataset) {
            duoxiangduibi.push(new Highcharts.Chart({
                chart: {
                    renderTo: $containers[i],
                    type: 'bar',
                    marginLeft: i === 0 ? 100 : 10
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
                    min: 0,
                    max: 10,
                    reversed: dataset.isReversed
                },
                legend: {
                    enabled: false
                },
                series: [dataset]
            }));
        });
        $('.ddbar .element').highcharts().reflow();
    }

    $("#institution1").change(function () {
        value1=$(this).val();
        $scope.mc();
    });

    $("#institution2").change(function () {
        value2=$(this).val();
        $scope.mc();
    });

    $scope.mc();

});