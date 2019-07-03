var app = angular.module('shinfo', []);

var noppUrl="http://127.0.0.1/shinfo/public/api/output/inst_paper_count";
var noppList;

var toppUrl="http://127.0.0.1/shinfo/public/api/output/inst_paper_trend";
var toppList;

var influenceUrl="http://127.0.0.1/shinfo/public/api/output/inst_paper_impact";
var influenceList=new Array();

var icUrl="http://127.0.0.1/shinfo/public/api/output/inst_paper_co_author";
var icList;

var collegeTotal=new Array();
var collegeQ1=new Array();
var collegePercentage=new Array();

var collegeTopp1=new Array();
var collegeTopp2=new Array();
var collegeTopp3=new Array();

var collegeIc=new Array();

app.controller('controller', function($scope, $http) {

    $http.get(noppUrl)
        .success(function (response) {
            noppList = response;

            var college="college";
            var num=1;
            for (var i=0;i<5;i++){
                collegeTotal[i]=noppList[college+num].total;
                collegeQ1[i]=noppList[college+num].q1;
                collegePercentage[i]=noppList[college+num].percent;
                num++;
            }

            var nopp = Highcharts.chart('nopp', { //number of published papers
                chart: {
                    zoomType: 'xy'
                },
                title: {
                    text: '发文量'
                },
                subtitle: {
                    text: ''
                },
                xAxis: [{
                    categories: ['college1', 'college2', 'college3', 'college4', 'college5'],
                    crosshair: true
                }],
                yAxis: [{ // Secondary yAxis
                    title: {
                        text: '',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    labels: {
                        format: '{value} %',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    opposite: true
                }, { // Primary yAxis
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: '',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }],
                tooltip: {
                    shared: true
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    x: 120,
                    verticalAlign: 'top',
                    y: 100,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                },
                series: [{
                    name: 'SCI论文数',
                    type: 'column',
                    yAxis: 1,
                    data: collegeTotal,
                    tooltip: {
                        valueSuffix: ' '
                    }
                }, {
                    name: 'Q1论文数',
                    type: 'column',
                    yAxis: 1,
                    data: collegeQ1,
                    tooltip: {
                        valueSuffix: ' '
                    }
                }, {
                    name: 'Q1论文比例',
                    type: 'spline',
                    data: collegePercentage,
                    tooltip: {
                        valueSuffix: '%'
                    }
                }]
            });

        });

    $http.get(toppUrl)
        .success(function (response) {
            toppList = response;
            var year=2010;
            for (var i=0;i<6;i++){
                collegeTopp1[i]=toppList.college1.total[year];
                collegeTopp2[i]=toppList.college2.total[year];
                collegeTopp3[i]=toppList.college3.total[year];
                if(collegeTopp1[i]==null) collegeTopp1[i]=0;
                if(collegeTopp2[i]==null) collegeTopp2[i]=0;
                if(collegeTopp3[i]==null) collegeTopp3[i]=0;
                year++;
            }

            var topp = Highcharts.chart('topp', { //trend of published papers
                title: {
                    text: '发文趋势'
                },
                subtitle: {
                    text: ''
                },
                yAxis: {
                    title: {
                        text: ''
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 2010
                    }
                },
                series: [{
                    name: 'college1',
                    data: collegeTopp1
                }, {
                    name: 'college2',
                    data: collegeTopp2
                }, {
                    name: 'college3',
                    data: collegeTopp3
                }],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }
            });

        });

    $http.get(influenceUrl)
        .success(function (response) {
            influenceList = response;

            var influence = Highcharts.chart('influence', { //influence
                chart: {
                    type: 'bubble',
                    plotBorderWidth: 1,
                    zoomType: 'xy'
                },
                legend: {
                    enabled: false
                },
                title: {
                    text: '影响力'
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    gridLineWidth: 1,
                    title: {
                        text: 'Times Cited'
                    },
                    labels: {
                        format: '{value}'
                    },
                    plotLines: [{
                        color: 'black',
                        dashStyle: 'dot',
                        width: 2,
                        value: 65,
                        label: {
                            rotation: 0,
                            y: 15,
                            style: {
                                fontStyle: 'italic'
                            },
                            text: ''
                        },
                        zIndex: 3
                    }]
                },
                yAxis: {
                    startOnTick: false,
                    endOnTick: false,
                    title: {
                        text: 'Web of Science Documents'
                    },
                    labels: {
                        format: '{value}'
                    },
                    maxPadding: 0.2,
                    plotLines: [{
                        color: 'black',
                        dashStyle: 'dot',
                        width: 2,
                        value: 50,
                        label: {
                            align: 'right',
                            style: {
                                fontStyle: 'italic'
                            },
                            text: '',
                            x: -10
                        },
                        zIndex: 3
                    }]
                },
                tooltip: {
                    useHTML: true,
                    headerFormat: '<table>',
                    pointFormat: '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
                        '<tr><th>脂肪摄取量:</th><td>{point.x}g</td></tr>' +
                        '<tr><th>糖摄取量:</th><td>{point.y}g</td></tr>' +
                        '<tr><th>肥胖 (成年人):</th><td>{point.z}%</td></tr>',
                    footerFormat: '</table>',
                    followPointer: true
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        }
                    }
                },
                series: [{
                    data: influenceList
                }]
            });

        });

    $http.get(icUrl)
        .success(function (response) {
            icList = response;
            collegeIc[0]=icList.Shanghai;
            collegeIc[1]=icList.Beijing;
            collegeIc[2]=icList.Karachi;
            collegeIc[3]=icList.Shenzhen;
            collegeIc[4]=icList.Guangzhou;
            collegeIc[5]=icList.Istanbul;
            collegeIc[5]=icList.Mumbai;

            var hqp = Highcharts.chart('hqp', { // High Quality Paper
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: '高质量论文'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: [{
                        name: 'Shanghai',
                        y: collegeIc[0],
                        sliced: true,
                        selected: true
                    }, {
                        name: 'Beijing',
                        y: collegeIc[1]
                    }, {
                        name: 'Karachi',
                        y: collegeIc[2]
                    }, {
                        name: 'Shenzhen',
                        y: collegeIc[3]
                    }, {
                        name: 'Guangzhou',
                        y: collegeIc[4]
                    }, {
                        name: 'Istanbul',
                        y: collegeIc[5]
                    }, {
                        name: 'Mumbai',
                        y: collegeIc[6]
                    }]
                }]
            });

            var ic = Highcharts.chart('ic', { //international cooperation
                chart: {
                    type: 'bar'
                },
                title: {
                    text: '国际合作'
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: ['Shanghai', 'Beijing', 'Karachi', 'Shenzhen', 'Guangzhou', 'Istanbul', 'Mumbai'],
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ' 百万'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true,
                            allowOverlap: true // 允许数据标签重叠
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 100,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },
                series: [{
                    name: '',
                    data: collegeIc
                }]
            });

        });

});