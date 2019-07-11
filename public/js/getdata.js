var app = angular.module('shinfo', []);

var noppUrl="http://127.0.0.1/shinfo/public/api/output/inst_paper_count";
var noppList;

var toppUrl="http://127.0.0.1/shinfo/public/api/output/inst_paper_trend";
var toppList;

var influenceUrl="http://127.0.0.1/shinfo/public/api/output/inst_paper_impact";
var influenceList=[];

var icUrl="http://127.0.0.1/shinfo/public/api/output/inst_paper_co_author";
var icList;

var collegeTotal=[];
var collegeQ1=[];
var collegePercentage=[];

var collegeTopp1=[];
var collegeTopp2=[];
var collegeTopp3=[];

var collegeIc=[];

function closeF(){
    $(".highcharts-data-table").remove();
}

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

    $scope.getDemo=function(){
        var timeSlider = $("#timeslider").dateRangeSlider("values");
        var college="";
        var field="";

        $("#jigou input[type='checkbox']:checked").each(function () {
            college+=$(this).val()+"&";
        });

        $("#lingyu input[type='checkbox']:checked").each(function () {
            field+=$(this).val()+"&";
        });

        console.log("时间范围："+timeSlider.min.getFullYear()+"&"+timeSlider.max.getFullYear());
        console.log("机构选择："+college);
        console.log("研究领域："+field);

    }

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
                }],
                zoomType: 'xy'
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

var duoxiangduibi = [],
    $containers = $('.ddbar .element'),
    datasets = [
        {
            name: 'University of Oxford',
            data: [3, 6, 1, 2, 6],
            isReversed: true,
            titleAlign: "left"
        },
        {
            name: 'University of Cambridge',
            data: [5, 6, 4, 2, 1],
            isReversed: false,
            titleAlign: "right"
        }
    ];
$.each(datasets, function(i, dataset) {
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

Highcharts.addEvent(
    Highcharts.seriesTypes.networkgraph,
    'afterSetOptions',
    function (e) {
        var colors = Highcharts.getOptions().colors,
            i = 0,
            nodes = {};
        e.options.data.forEach(function (link) {
            if (link[0] === 'Proto Indo-European') {
                nodes['Proto Indo-European'] = {
                    id: 'Proto Indo-European',
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
var otd = Highcharts.chart('otd', { //Overall topic distribution
    chart: {
        type: 'networkgraph',
        height: '50%'
    },
    title: {
        text: '总体主题分布'
    },
    subtitle: {
        text: ''
    },
    plotOptions: {
        networkgraph: {
            keys: ['from', 'to'],
            layoutAlgorithm: {
                enableSimulation: true
            }
        }
    },
    series: [{
        dataLabels: {
            enabled: true
        },
        data: [
            ['Proto Indo-European', 'Balto-Slavic'],
            ['Proto Indo-European', 'Germanic'],
            ['Proto Indo-European', 'Celtic'],
            ['Proto Indo-European', 'Italic'],
            ['Proto Indo-European', 'Hellenic'],
            ['Proto Indo-European', 'Anatolian'],
            ['Proto Indo-European', 'Indo-Iranian'],
            ['Proto Indo-European', 'Tocharian'],
            ['Indo-Iranian', 'Dardic'],
            ['Indo-Iranian', 'Indic'],
            ['Indo-Iranian', 'Iranian'],
            ['Iranian', 'Old Persian'],
            ['Old Persian', 'Middle Persian'],
            ['Indic', 'Sanskrit'],
            ['Italic', 'Osco-Umbrian'],
            ['Italic', 'Latino-Faliscan'],
            ['Latino-Faliscan', 'Latin'],
            ['Celtic', 'Brythonic'],
            ['Celtic', 'Goidelic'],
            ['Germanic', 'North Germanic'],
            ['Germanic', 'West Germanic'],
            ['Germanic', 'East Germanic'],
            ['North Germanic', 'Old Norse'],
            ['North Germanic', 'Old Swedish'],
            ['North Germanic', 'Old Danish'],
            ['West Germanic', 'Old English'],
            ['West Germanic', 'Old Frisian'],
            ['West Germanic', 'Old Dutch'],
            ['West Germanic', 'Old Low German'],
            ['West Germanic', 'Old High German'],
            ['Old Norse', 'Old Icelandic'],
            ['Old Norse', 'Old Norwegian'],
            ['Old Norwegian', 'Middle Norwegian'],
            ['Old Swedish', 'Middle Swedish'],
            ['Old Danish', 'Middle Danish'],
            ['Old English', 'Middle English'],
            ['Old Dutch', 'Middle Dutch'],
            ['Old Low German', 'Middle Low German'],
            ['Old High German', 'Middle High German'],
            ['Balto-Slavic', 'Baltic'],
            ['Balto-Slavic', 'Slavic'],
            ['Slavic', 'East Slavic'],
            ['Slavic', 'West Slavic'],
            ['Slavic', 'South Slavic'],
            // Leaves:
            ['Proto Indo-European', 'Phrygian'],
            ['Proto Indo-European', 'Thracian'],
            ['Tocharian', 'Tocharian A'],
            ['Tocharian', 'Tocharian B'],
            ['Anatolian', 'Hittite'],
            ['Anatolian', 'Palaic'],
            ['Anatolian', 'Luwic'],
            ['Iranian', 'Pashto'],
            ['Iranian', 'Sogdian'],
            ['Old Persian', 'Pahlavi'],
            ['Middle Persian', 'Persian'],
            ['Hellenic', 'Greek'],
            ['Dardic', 'Dard'],
            ['Sanskrit', 'Sindhi'],
            ['Sanskrit', 'Romani'],
            ['Sanskrit', 'Punjabi'],
            ['Sanskrit', 'Sinhalese'],
            ['Osco-Umbrian', 'Umbrian'],
            ['Osco-Umbrian', 'Oscan'],
            ['Latino-Faliscan', 'Faliscan'],
            ['Latin', 'Portugese'],
            ['Latin', 'Catalan'],
            ['Latin', 'Franco-Provençal'],
            ['Latin', 'Rhaeto-Romance'],
            ['Brythonic', 'Welsh'],
            ['Goidelic', 'Modern Irish'],
            ['Goidelic', 'Scottish Gaelic'],
            ['Goidelic', 'Manx'],
            ['East Germanic', 'Gothic'],
            ['Middle Dutch', 'Dutch'],
            ['Middle Dutch', 'Limburgish'],
            ['Middle Dutch', 'Brabantian'],
            ['Middle Dutch', 'Rhinelandic'],
            ['Middle Norwegian', 'Norwegian'],
            ['Old Norse', 'Faroese'],
            ['Old Icelandic', 'Icelandic'],
            ['Baltic', 'Old Prussian'],
            ['Baltic', 'Lithuanian'],
            ['Baltic', 'Latvian'],
            ['West Slavic', 'Polish'],
            ['West Slavic', 'Slovak'],
            ['South Slavic', 'Ukrainian'],
            ['South Slavic', 'Belarusian'],
            ['South Slavic', 'Rusyn']
        ]
    }]
});

var cit = Highcharts.chart('cit', { //California Institute of Technology
    chart: {
        type: 'networkgraph',
        height: '70%'
    },
    title: {
        text: '对标高校-加州理工'
    },
    subtitle: {
        text: ''
    },
    plotOptions: {
        networkgraph: {
            keys: ['from', 'to'],
            layoutAlgorithm: {
                enableSimulation: true
            }
        }
    },
    series: [{
        dataLabels: {
            enabled: true
        },
        data: [
            ['Proto Indo-European', 'Balto-Slavic'],
            ['Proto Indo-European', 'Germanic'],
            ['Proto Indo-European', 'Celtic'],
            ['Proto Indo-European', 'Italic'],
            ['Proto Indo-European', 'Hellenic'],
            ['Proto Indo-European', 'Anatolian'],
            ['Proto Indo-European', 'Indo-Iranian'],
            ['Proto Indo-European', 'Tocharian'],
            ['Indo-Iranian', 'Dardic'],
            ['Indo-Iranian', 'Indic'],
            ['Indo-Iranian', 'Iranian'],
            ['Iranian', 'Old Persian'],
            ['Old Persian', 'Middle Persian'],
            ['Indic', 'Sanskrit'],
            ['Italic', 'Osco-Umbrian'],
            ['Italic', 'Latino-Faliscan'],
            ['Latino-Faliscan', 'Latin'],
            ['Celtic', 'Brythonic'],
            ['Celtic', 'Goidelic'],
            ['Germanic', 'North Germanic'],
            ['Germanic', 'West Germanic'],
            ['Germanic', 'East Germanic'],
            ['North Germanic', 'Old Norse'],
            ['North Germanic', 'Old Swedish'],
            ['North Germanic', 'Old Danish'],
            ['West Germanic', 'Old English'],
            ['West Germanic', 'Old Frisian'],
            ['West Germanic', 'Old Dutch'],
            ['West Germanic', 'Old Low German'],
            ['West Germanic', 'Old High German'],
            ['Old Norse', 'Old Icelandic'],
            ['Old Norse', 'Old Norwegian'],
            ['Old Norwegian', 'Middle Norwegian'],
            ['Old Swedish', 'Middle Swedish'],
            ['Old Danish', 'Middle Danish'],
            ['Old English', 'Middle English'],
            ['Old Dutch', 'Middle Dutch'],
            ['Old Low German', 'Middle Low German'],
            ['Old High German', 'Middle High German'],
            ['Balto-Slavic', 'Baltic'],
            ['Balto-Slavic', 'Slavic'],
            ['Slavic', 'East Slavic'],
            ['Slavic', 'West Slavic'],
            ['Slavic', 'South Slavic'],
            // Leaves:
            ['Proto Indo-European', 'Phrygian'],
            ['Proto Indo-European', 'Thracian'],
            ['Tocharian', 'Tocharian A'],
            ['Tocharian', 'Tocharian B'],
            ['Anatolian', 'Hittite'],
            ['Anatolian', 'Palaic'],
            ['Anatolian', 'Luwic'],
            ['Iranian', 'Pashto'],
            ['Iranian', 'Sogdian'],
            ['Old Persian', 'Pahlavi'],
            ['Middle Persian', 'Persian'],
            ['Hellenic', 'Greek'],
            ['Dardic', 'Dard'],
            ['Sanskrit', 'Sindhi'],
            ['Sanskrit', 'Romani'],
            ['Sanskrit', 'Punjabi'],
            ['Sanskrit', 'Sinhalese'],
            ['Osco-Umbrian', 'Umbrian'],
            ['Osco-Umbrian', 'Oscan'],
            ['Latino-Faliscan', 'Faliscan'],
            ['Latin', 'Portugese'],
            ['Latin', 'Catalan'],
            ['Latin', 'Franco-Provençal'],
            ['Latin', 'Rhaeto-Romance'],
            ['Brythonic', 'Welsh'],
            ['Goidelic', 'Modern Irish'],
            ['Goidelic', 'Scottish Gaelic'],
            ['Goidelic', 'Manx'],
            ['East Germanic', 'Gothic'],
            ['Middle Dutch', 'Dutch'],
            ['Middle Dutch', 'Limburgish'],
            ['Middle Dutch', 'Brabantian'],
            ['Middle Dutch', 'Rhinelandic'],
            ['Middle Norwegian', 'Norwegian'],
            ['Old Norse', 'Faroese'],
            ['Old Icelandic', 'Icelandic'],
            ['Baltic', 'Old Prussian'],
            ['Baltic', 'Lithuanian'],
            ['Baltic', 'Latvian'],
            ['West Slavic', 'Polish'],
            ['West Slavic', 'Slovak'],
            ['South Slavic', 'Ukrainian'],
            ['South Slavic', 'Belarusian'],
            ['South Slavic', 'Rusyn']
        ]
    }]
});

var sust = Highcharts.chart('sust', { //Shanghai University of Science and Technology
    chart: {
        type: 'networkgraph',
        height: '70%'
    },
    title: {
        text: '上海科技大学'
    },
    subtitle: {
        text: ''
    },
    plotOptions: {
        networkgraph: {
            keys: ['from', 'to'],
            layoutAlgorithm: {
                enableSimulation: true
            }
        }
    },
    series: [{
        dataLabels: {
            enabled: true
        },
        data: [
            ['Proto Indo-European', 'Balto-Slavic'],
            ['Proto Indo-European', 'Germanic'],
            ['Proto Indo-European', 'Celtic'],
            ['Proto Indo-European', 'Italic'],
            ['Proto Indo-European', 'Hellenic'],
            ['Proto Indo-European', 'Anatolian'],
            ['Proto Indo-European', 'Indo-Iranian'],
            ['Proto Indo-European', 'Tocharian'],
            ['Indo-Iranian', 'Dardic'],
            ['Indo-Iranian', 'Indic'],
            ['Indo-Iranian', 'Iranian'],
            ['Iranian', 'Old Persian'],
            ['Old Persian', 'Middle Persian'],
            ['Indic', 'Sanskrit'],
            ['Italic', 'Osco-Umbrian'],
            ['Italic', 'Latino-Faliscan'],
            ['Latino-Faliscan', 'Latin'],
            ['Celtic', 'Brythonic'],
            ['Celtic', 'Goidelic'],
            ['Germanic', 'North Germanic'],
            ['Germanic', 'West Germanic'],
            ['Germanic', 'East Germanic'],
            ['North Germanic', 'Old Norse'],
            ['North Germanic', 'Old Swedish'],
            ['North Germanic', 'Old Danish'],
            ['West Germanic', 'Old English'],
            ['West Germanic', 'Old Frisian'],
            ['West Germanic', 'Old Dutch'],
            ['West Germanic', 'Old Low German'],
            ['West Germanic', 'Old High German'],
            ['Old Norse', 'Old Icelandic'],
            ['Old Norse', 'Old Norwegian'],
            ['Old Norwegian', 'Middle Norwegian'],
            ['Old Swedish', 'Middle Swedish'],
            ['Old Danish', 'Middle Danish'],
            ['Old English', 'Middle English'],
            ['Old Dutch', 'Middle Dutch'],
            ['Old Low German', 'Middle Low German'],
            ['Old High German', 'Middle High German'],
            ['Balto-Slavic', 'Baltic'],
            ['Balto-Slavic', 'Slavic'],
            ['Slavic', 'East Slavic'],
            ['Slavic', 'West Slavic'],
            ['Slavic', 'South Slavic'],
            // Leaves:
            ['Proto Indo-European', 'Phrygian'],
            ['Proto Indo-European', 'Thracian'],
            ['Tocharian', 'Tocharian A'],
            ['Tocharian', 'Tocharian B'],
            ['Anatolian', 'Hittite'],
            ['Anatolian', 'Palaic'],
            ['Anatolian', 'Luwic'],
            ['Iranian', 'Pashto'],
            ['Iranian', 'Sogdian'],
            ['Old Persian', 'Pahlavi'],
            ['Middle Persian', 'Persian'],
            ['Hellenic', 'Greek'],
            ['Dardic', 'Dard'],
            ['Sanskrit', 'Sindhi'],
            ['Sanskrit', 'Romani'],
            ['Sanskrit', 'Punjabi'],
            ['Sanskrit', 'Sinhalese'],
            ['Osco-Umbrian', 'Umbrian'],
            ['Osco-Umbrian', 'Oscan'],
            ['Latino-Faliscan', 'Faliscan'],
            ['Latin', 'Portugese'],
            ['Latin', 'Catalan'],
            ['Latin', 'Franco-Provençal'],
            ['Latin', 'Rhaeto-Romance'],
            ['Brythonic', 'Welsh'],
            ['Goidelic', 'Modern Irish'],
            ['Goidelic', 'Scottish Gaelic'],
            ['Goidelic', 'Manx'],
            ['East Germanic', 'Gothic'],
            ['Middle Dutch', 'Dutch'],
            ['Middle Dutch', 'Limburgish'],
            ['Middle Dutch', 'Brabantian'],
            ['Middle Dutch', 'Rhinelandic'],
            ['Middle Norwegian', 'Norwegian'],
            ['Old Norse', 'Faroese'],
            ['Old Icelandic', 'Icelandic'],
            ['Baltic', 'Old Prussian'],
            ['Baltic', 'Lithuanian'],
            ['Baltic', 'Latvian'],
            ['West Slavic', 'Polish'],
            ['West Slavic', 'Slovak'],
            ['South Slavic', 'Ukrainian'],
            ['South Slavic', 'Belarusian'],
            ['South Slavic', 'Rusyn']
        ]
    }]
});