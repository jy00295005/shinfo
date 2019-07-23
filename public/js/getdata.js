var app = angular.module('shinfo', []);

var optionsUrl="http://127.0.0.1/shinfo/public/api/output/get_options";

function zoomChart(c){ // 放大图表
    var element="#"+c;
    $(".c").parent().each(function () {
        $(this).addClass("display-none");
    });
    $(element).parent().removeClass("display-none");
    $(element).addClass("zoom");
    $(element).prepend("<button class='btn-sm btn-danger closeB' style='position: relative; float: right' onclick='closeF()'>关闭</button>");
    $(element).highcharts().reflow();
}

function closeF(){ // 关闭浮层
    $(".c").parent().each(function () {
        $(this).removeClass("display-none");
    });
    $(".c").each(function () {
        $(this).removeClass("zoom");
    });
    $(".c").each(function () {
        $(this).highcharts().reflow();
    });
    $(".closeB").remove();
}

var ischecked1=true;
var ischecked2=true;
function checkAll(e){ // 全选
    var element=$(e);
    if (e=="#all1"){
        element.checked=ischecked1;
    } else{
        element.checked=ischecked2;
    }

    if (element.checked){
        element.parent().parent().parent().find("input").each(function () {
            $(this).attr("checked", true);
        });
        if (e=="#all1"){
            ischecked1=false;
        } else{
            ischecked2=false;
        }
    } else{
        element.parent().parent().parent().find("input").each(function () {
            $(this).attr("checked", false);
        });
        if (e=="#all1"){
            ischecked1=true;
        } else{
            ischecked2=true;
        }
    }
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

    var updateDate="2019-06-20";
    var university="all";
    var dicipline="all";

    var noppUrl="http://127.0.0.1/shinfo/public/api/output/inst_paper_count/"+updateDate+"/"+university+"/"+dicipline;
    var toppUrl="http://127.0.0.1/shinfo/public/api/output/inst_paper_trend/"+updateDate+"/"+university+"/"+dicipline;
    var q1Url="http://127.0.0.1/shinfo/public/api/output/high_quality_paper/Q1/"+updateDate+"/"+university+"/"+dicipline;
    var hotUrl="http://127.0.0.1/shinfo/public/api/output/high_quality_paper/HOT/"+updateDate+"/"+university+"/"+dicipline;
    var hqUrl="http://127.0.0.1/shinfo/public/api/output/high_quality_paper/HQ/"+updateDate+"/"+university+"/"+dicipline;
    var cnsUrl="http://127.0.0.1/shinfo/public/api/output/high_quality_paper/CNS/"+updateDate+"/"+university+"/"+dicipline;

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
        console.log("时间范围："+updateDate);
        console.log("机构选择："+university);
        console.log("研究领域："+dicipline);

        toppUrl="http://127.0.0.1/shinfo/public/api/output/inst_paper_trend/"+updateDate+"/"+university+"/"+dicipline;
        noppUrl="http://127.0.0.1/shinfo/public/api/output/inst_paper_count/"+updateDate+"/"+university+"/"+dicipline;
        q1Url="http://127.0.0.1/shinfo/public/api/output/high_quality_paper/Q1/"+updateDate+"/"+university+"/"+dicipline;
        hqUrl="http://127.0.0.1/shinfo/public/api/output/high_quality_paper/HQ/"+updateDate+"/"+university+"/"+dicipline;
        hotUrl="http://127.0.0.1/shinfo/public/api/output/high_quality_paper/HOT/"+updateDate+"/"+university+"/"+dicipline;
        cnsUrl="http://127.0.0.1/shinfo/public/api/output/high_quality_paper/CNS/"+updateDate+"/"+university+"/"+dicipline;

        $scope.getNopp();
        $scope.getTopp();
        $scope.getQ1();
        $scope.getHq();
        $scope.getHot();
        $scope.getCns();
    }

    $http.get(optionsUrl)
        .success(function (response) {
            $scope.universityName=response.universityName;
            $scope.dicipline=response.dicipline;
        });

    $scope.getNopp=function(){
        $http.get(noppUrl)
            .success(function (response) {
                var disUniName=[];
                var uniPaperCount=[];
                for(var i=0;i<response.length;i++){
                    disUniName.push(response[i]["dis_uni_name"]);
                }
                for(var i=0;i<response.length;i++){
                    uniPaperCount.push(response[i]["uni_paper_count"]);
                }

                var nopp = Highcharts.chart('nopp', { //number of published papers
                    title: {
                        text: '发文总量'
                    },
                    xAxis: [{
                        categories: disUniName,
                        crosshair: true
                    }],
                    yAxis: [{ // Primary yAxis
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
                        name: '总量',
                        type: 'column',
                        yAxis: 0,
                        data: uniPaperCount,
                        tooltip: {
                            valueSuffix: ' '
                        }
                    }],
                    exporting: {
                        showTable: true,
                        allowHTML: true
                    }
                }, function () {
                    Highcharts.addEvent($('#nopp').highcharts(), 'render', function () {
                        var table = this.dataTableDiv;
                        if (table) {

                            // Apply styles inline because stylesheets are not passed to the exported SVG
                            Highcharts.css(table.querySelector('table'), {
                                'border-collapse': 'collapse',
                                'border-spacing': 0,
                                background: 'white',
                                'min-width': '100%',
                                'font-family': 'sans-serif',
                                'font-size': '14px'
                            });

                            [].forEach.call(table.querySelectorAll('td, th, caption'), function (elem) {
                                Highcharts.css(elem, {
                                    border: '1px solid silver',
                                    padding: '0.5em'
                                });
                            });

                            Highcharts.css(table.querySelector('caption'), {
                                'border-bottom': 'none',
                                'font-size': '1.1em',
                                'font-weight': 'bold'
                            });

                            [].forEach.call(table.querySelectorAll('caption, tr'), function (elem, i) {
                                if (i % 2) {
                                    Highcharts.css(elem, {
                                        background: '#f8f8f8'
                                    });
                                }
                            });

                            // Add the table as the subtitle to make it part of the export
                            $("#noppModal .modal-title").html(this.title.textStr);
                            $("#noppModal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });

                $("#nopp").highcharts().reflow();
            });
    }

    $scope.getTopp=function(){
        $http.get(toppUrl)
            .success(function (response) {
                var uniName=[];
                var trendData=[];
                var length=0;
                for (var key in response) {
                    uniName.push(key);
                    trendData.push(response[key]);
                    length++;
                }

                var series=[];
                for(var i=0; i<length; i++){
                    var data={};
                    var dataData=[];
                    for(var year=2015;year<2020;year++){
                        dataData.push(trendData[i][year]);
                    }
                    data.data=dataData;
                    data.name=uniName[i];
                    series.push(data);
                }

                var topp = Highcharts.chart('topp', { //trend of published papers
                    title: {
                        text: '年发文趋势'
                    },
                    yAxis: {
                        title: {
                            text: '年发文量'
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
                            pointStart: 2015
                        }
                    },
                    series: series,
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
                    },
                    exporting: {
                        showTable: true,
                        allowHTML: true
                    }
                }, function () {
                    Highcharts.addEvent($('#topp').highcharts(), 'render', function () {
                        var table = this.dataTableDiv;
                        if (table) {
                            // Apply styles inline because stylesheets are not passed to the exported SVG
                            Highcharts.css(table.querySelector('table'), {
                                'border-collapse': 'collapse',
                                'border-spacing': 0,
                                background: 'white',
                                'min-width': '100%',
                                'font-family': 'sans-serif',
                                'font-size': '14px'
                            });

                            [].forEach.call(table.querySelectorAll('td, th, caption'), function (elem) {
                                Highcharts.css(elem, {
                                    border: '1px solid silver',
                                    padding: '0.5em'
                                });
                            });

                            Highcharts.css(table.querySelector('caption'), {
                                'border-bottom': 'none',
                                'font-size': '1.1em',
                                'font-weight': 'bold'
                            });

                            [].forEach.call(table.querySelectorAll('caption, tr'), function (elem, i) {
                                if (i % 2) {
                                    Highcharts.css(elem, {
                                        background: '#f8f8f8'
                                    });
                                }
                            });

                            // Add the table as the subtitle to make it part of the export
                            $("#toppModal .modal-title").html(this.title.textStr);
                            $("#toppModal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });

                $("#topp").highcharts().reflow();
            });
    }

    $scope.getQ1=function(){
        $http.get(q1Url)
            .success(function (response) {
                var disUniName=[];
                var allData=[];
                var sciAll=[];
                var q1All=[];
                var q1Ratio=[];

                var length=0;
                for (var key in response) {
                    disUniName.push(key);
                    allData.push(response[key]);
                    length++;
                }

                for(var i=0;i<length;i++){
                    var sci=0;
                    var q1=0;
                    for(var j=0;j<allData[i].length;j++) {
                        sci+=allData[i][j]["SCI论文总数"];
                        q1+=allData[i][j]["高被引论文数"];
                    }
                    sciAll.push(sci);
                    q1All.push(q1);
                }

                for(var i=0;i<length;i++){
                    q1Ratio[i]=q1All[i]/sciAll[i];
                }

                var q1 = Highcharts.chart('q1', { // Q1
                    title: {
                        text: 'Q1文章及比例'
                    },
                    xAxis: [{
                        categories: disUniName,
                        crosshair: true
                    }],
                    yAxis: [{ // Primary yAxis
                        labels: {
                            format: '{value}',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                        title: {
                            text: 'Q1文章比例',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        }
                    }, { // Secondary yAxis
                        title: {
                            text: '\n' +
                                'Q1文章数量',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        },
                        labels: {
                            format: '{value}',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        },
                        opposite: true
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
                        name: 'Q1文章比例',
                        type: 'column',
                        data: q1Ratio,
                        tooltip: {
                            valueSuffix: ''
                        }
                    }, {
                        name: 'Q1文章数量',
                        type: 'spline',
                        yAxis: 1,
                        data: q1All,
                        tooltip: {
                            valueSuffix: ''
                        }
                    }],
                    exporting: {
                        showTable: true,
                        allowHTML: true
                    }
                }, function () {
                    Highcharts.addEvent($('#q1').highcharts(), 'render', function () {
                        var table = this.dataTableDiv;
                        if (table) {
                            // Apply styles inline because stylesheets are not passed to the exported SVG
                            Highcharts.css(table.querySelector('table'), {
                                'border-collapse': 'collapse',
                                'border-spacing': 0,
                                background: 'white',
                                'min-width': '100%',
                                'font-family': 'sans-serif',
                                'font-size': '14px'
                            });

                            [].forEach.call(table.querySelectorAll('td, th, caption'), function (elem) {
                                Highcharts.css(elem, {
                                    border: '1px solid silver',
                                    padding: '0.5em'
                                });
                            });

                            Highcharts.css(table.querySelector('caption'), {
                                'border-bottom': 'none',
                                'font-size': '1.1em',
                                'font-weight': 'bold'
                            });

                            [].forEach.call(table.querySelectorAll('caption, tr'), function (elem, i) {
                                if (i % 2) {
                                    Highcharts.css(elem, {
                                        background: '#f8f8f8'
                                    });
                                }
                            });

                            // Add the table as the subtitle to make it part of the export
                            $("#q1Modal .modal-title").html(this.title.textStr);
                            $("#q1Modal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });
                $("#q1").highcharts().reflow();
            });
    }

    $scope.getHq=function(){
        $http.get(hqUrl)
            .success(function (response) {
                var disUniName=[];
                var allData=[];
                var sciAll=[];
                var hqAll=[];
                var hqRatio=[];

                var length=0;
                for (var key in response) {
                    disUniName.push(key);
                    allData.push(response[key]);
                    length++;
                }

                for(var i=0;i<length;i++){
                    var sci=0;
                    var hq=0;
                    for(var j=0;j<allData[i].length;j++) {
                        sci+=allData[i][j]["SCI论文总数"];
                        hq+=allData[i][j]["高被引论文数"];
                    }
                    sciAll.push(sci);
                    hqAll.push(hq);
                }

                for(var i=0;i<length;i++){
                    hqRatio[i]=hqAll[i]/sciAll[i];
                }

                var q1 = Highcharts.chart('hq', { // Q1
                    title: {
                        text: '高被引论文及比例'
                    },
                    xAxis: [{
                        categories: disUniName,
                        crosshair: true
                    }],
                    yAxis: [{ // Primary yAxis
                        labels: {
                            format: '{value}',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                        title: {
                            text: '高被引论文比例',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        }
                    }, { // Secondary yAxis
                        title: {
                            text: '\n' +
                                '高被引论文数量',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        },
                        labels: {
                            format: '{value}',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        },
                        opposite: true
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
                        name: '高被引论文比例',
                        type: 'column',
                        data: hqRatio,
                        tooltip: {
                            valueSuffix: ''
                        }
                    }, {
                        name: '高被引论文数量',
                        type: 'spline',
                        yAxis: 1,
                        data: hqAll,
                        tooltip: {
                            valueSuffix: ''
                        }
                    }],
                    exporting: {
                        showTable: true,
                        allowHTML: true
                    }
                }, function () {
                    Highcharts.addEvent($('#hq').highcharts(), 'render', function () {
                        var table = this.dataTableDiv;
                        if (table) {
                            // Apply styles inline because stylesheets are not passed to the exported SVG
                            Highcharts.css(table.querySelector('table'), {
                                'border-collapse': 'collapse',
                                'border-spacing': 0,
                                background: 'white',
                                'min-width': '100%',
                                'font-family': 'sans-serif',
                                'font-size': '14px'
                            });

                            [].forEach.call(table.querySelectorAll('td, th, caption'), function (elem) {
                                Highcharts.css(elem, {
                                    border: '1px solid silver',
                                    padding: '0.5em'
                                });
                            });

                            Highcharts.css(table.querySelector('caption'), {
                                'border-bottom': 'none',
                                'font-size': '1.1em',
                                'font-weight': 'bold'
                            });

                            [].forEach.call(table.querySelectorAll('caption, tr'), function (elem, i) {
                                if (i % 2) {
                                    Highcharts.css(elem, {
                                        background: '#f8f8f8'
                                    });
                                }
                            });

                            // Add the table as the subtitle to make it part of the export
                            $("#hqModal .modal-title").html(this.title.textStr);
                            $("#hqModal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });
                $("#hq").highcharts().reflow();
            });
    }

    $scope.getHot=function(){
        $http.get(hotUrl)
            .success(function (response) {
                var disUniName=[];
                var allData=[];
                var sciAll=[];
                var hotAll=[];
                var hotRatio=[];

                var length=0;
                for (var key in response) {
                    disUniName.push(key);
                    allData.push(response[key]);
                    length++;
                }

                for(var i=0;i<length;i++){
                    var sci=0;
                    var hot=0;
                    for(var j=0;j<allData[i].length;j++) {
                        sci+=allData[i][j]["SCI论文总数"];
                        hot+=allData[i][j]["热点论文数"];
                    }
                    sciAll.push(sci);
                    hotAll.push(hot);
                }

                for(var i=0;i<length;i++){
                    hotRatio[i]=hotAll[i]/sciAll[i];
                }

                var q1 = Highcharts.chart('hot', { // Q1
                    title: {
                        text: '热点论文及比例'
                    },
                    xAxis: [{
                        categories: disUniName,
                        crosshair: true
                    }],
                    yAxis: [{ // Primary yAxis
                        labels: {
                            format: '{value}',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                        title: {
                            text: '热点论文比例',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        }
                    }, { // Secondary yAxis
                        title: {
                            text: '\n' +
                                '热点论文数量',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        },
                        labels: {
                            format: '{value}',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        },
                        opposite: true
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
                        name: '热点论文比例',
                        type: 'column',
                        data: hotRatio,
                        tooltip: {
                            valueSuffix: ''
                        }
                    }, {
                        name: '热点论文数量',
                        type: 'spline',
                        yAxis: 1,
                        data: hotAll,
                        tooltip: {
                            valueSuffix: ''
                        }
                    }],
                    exporting: {
                        showTable: true,
                        allowHTML: true
                    }
                }, function () {
                    Highcharts.addEvent($('#hot').highcharts(), 'render', function () {
                        var table = this.dataTableDiv;
                        if (table) {
                            // Apply styles inline because stylesheets are not passed to the exported SVG
                            Highcharts.css(table.querySelector('table'), {
                                'border-collapse': 'collapse',
                                'border-spacing': 0,
                                background: 'white',
                                'min-width': '100%',
                                'font-family': 'sans-serif',
                                'font-size': '14px'
                            });

                            [].forEach.call(table.querySelectorAll('td, th, caption'), function (elem) {
                                Highcharts.css(elem, {
                                    border: '1px solid silver',
                                    padding: '0.5em'
                                });
                            });

                            Highcharts.css(table.querySelector('caption'), {
                                'border-bottom': 'none',
                                'font-size': '1.1em',
                                'font-weight': 'bold'
                            });

                            [].forEach.call(table.querySelectorAll('caption, tr'), function (elem, i) {
                                if (i % 2) {
                                    Highcharts.css(elem, {
                                        background: '#f8f8f8'
                                    });
                                }
                            });

                            // Add the table as the subtitle to make it part of the export
                            $("#hotModal .modal-title").html(this.title.textStr);
                            $("#hotModal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });
                $("#hot").highcharts().reflow();
            });
    }

    $scope.getCns=function(){
        $http.get(cnsUrl)
            .success(function (response) {
                var disUniName=[];
                var allData=[];
                var sciAll=[];
                var cnsAll=[];
                var cnsRatio=[];

                var length=0;
                for (var key in response) {
                    disUniName.push(key);
                    allData.push(response[key]);
                    length++;
                }

                for(var i=0;i<length;i++){
                    var sci=0;
                    var cns=0;
                    for(var j=0;j<allData[i].length;j++) {
                        sci+=allData[i][j]["SCI论文总数"];
                        cns+=allData[i][j]["CNS论文数"];
                    }
                    sciAll.push(sci);
                    cnsAll.push(cns);
                }

                for(var i=0;i<length;i++){
                    cnsRatio[i]=cnsAll[i]/sciAll[i];
                }

                var q1 = Highcharts.chart('cns', { // Q1
                    title: {
                        text: 'CNS论文及比例'
                    },
                    xAxis: [{
                        categories: disUniName,
                        crosshair: true
                    }],
                    yAxis: [{ // Primary yAxis
                        labels: {
                            format: '{value}',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                        title: {
                            text: 'CNS论文比例',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        }
                    }, { // Secondary yAxis
                        title: {
                            text: '\n' +
                                'CNS论文数量',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        },
                        labels: {
                            format: '{value}',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        },
                        opposite: true
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
                        name: 'CNS论文比例',
                        type: 'column',
                        data: cnsRatio,
                        tooltip: {
                            valueSuffix: ''
                        }
                    }, {
                        name: 'CNS论文数量',
                        type: 'spline',
                        yAxis: 1,
                        data: cnsAll,
                        tooltip: {
                            valueSuffix: ''
                        }
                    }],
                    exporting: {
                        showTable: true,
                        allowHTML: true
                    }
                }, function () {
                    Highcharts.addEvent($('#cns').highcharts(), 'render', function () {
                        var table = this.dataTableDiv;
                        if (table) {
                            // Apply styles inline because stylesheets are not passed to the exported SVG
                            Highcharts.css(table.querySelector('table'), {
                                'border-collapse': 'collapse',
                                'border-spacing': 0,
                                background: 'white',
                                'min-width': '100%',
                                'font-family': 'sans-serif',
                                'font-size': '14px'
                            });

                            [].forEach.call(table.querySelectorAll('td, th, caption'), function (elem) {
                                Highcharts.css(elem, {
                                    border: '1px solid silver',
                                    padding: '0.5em'
                                });
                            });

                            Highcharts.css(table.querySelector('caption'), {
                                'border-bottom': 'none',
                                'font-size': '1.1em',
                                'font-weight': 'bold'
                            });

                            [].forEach.call(table.querySelectorAll('caption, tr'), function (elem, i) {
                                if (i % 2) {
                                    Highcharts.css(elem, {
                                        background: '#f8f8f8'
                                    });
                                }
                            });

                            // Add the table as the subtitle to make it part of the export
                            $("#cnsModal .modal-title").html(this.title.textStr);
                            $("#cnsModal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });
                $("#cns").highcharts().reflow();
            });
    }

    $scope.getNopp();
    $scope.getTopp();
    $scope.getQ1();
    $scope.getHq();
    $scope.getHot();
    $scope.getCns();

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