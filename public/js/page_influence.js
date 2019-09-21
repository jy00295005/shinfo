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

        $("#nopp").highcharts().showLoading();
        $("#topp").highcharts().showLoading();
        $("#q1").highcharts().showLoading();
        $("#hq").highcharts().showLoading();
        $("#hot").highcharts().showLoading();
        $("#cns").highcharts().showLoading();

        $scope.getNopp();
        $scope.getTopp();
        $scope.getH();
        $scope.getCoau();
        $scope.getCnci();
        $scope.getRf();
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
                var sum=0;
                var pieData=[];

                for(var i=0;i<response.length;i++){
                    disUniName.push(response[i]["dis_uni_name"]);
                }
                for(var i=0;i<response.length;i++){
                    uniPaperCount.push(response[i]["uni_paper_count"]);
                    sum+=response[i]["uni_paper_count"];
                }
                for(var i=0;i<response.length;i++){
                    var noppData={};
                    noppData.name=disUniName[i];
                    noppData.y=uniPaperCount[i];
                    pieData.push(noppData);
                }

                var nopp = Highcharts.chart('nopp', {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: '总被引次数'
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
                        data: pieData
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
                $("#nopp").highcharts().hideLoading();
            });
    }

    $scope.getTopp=function(){
        $http.get(toppUrl)
            .success(function (response) {
                var disUniName=[];
                var res=[];
                for (var key in response) {
                    disUniName.push(key);
                    res.push(response[key])
                }

                var paperCounts=[];
                var paperCitaitons=[];
                var paperAveCitations=[];
                for(var x in res){
                    var paperCount=0;
                    var paperCitaiton=0;
                    var paperAveCitation=0;
                    for(var year=2015;year<2020;year++){
                        paperCount=paperCount+res[x][year]["paper_count"];
                        paperCitaiton=paperCitaiton+res[x][year]["paper_citaiton"];
                    }
                    paperCounts.push(paperCount);
                    paperCitaitons.push(paperCitaiton);
                    paperAveCitation=paperCount/paperCitaiton;
                    paperAveCitations.push(paperAveCitation);
                }

                var topp = Highcharts.chart('topp', { // Q1
                    title: {
                        text: '篇均被引'
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
                            text: '',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        }
                    }],
                    tooltip: {
                        shared: true,
                        formatter: function(){
                            console.log(this);
                            this.count=paperCounts[this.points[0].point.index];
                            this.citation=paperCitaitons[this.points[0].point.index];
                            return this.x+"<br>"+"篇均被引: "+this.y+"<br>"+"被引总数: "+this.count+"<br>"+"文章总数: "+this.citation;
                        }
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
                        name: '篇均被引',
                        type: 'column',
                        data: paperAveCitations,
                        tooltip: {
                            valueSuffix: ''
                        }
                    }],
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
                $("#topp").highcharts().hideLoading();
            });
    }

    $scope.getH=function(){
        $http.get(hUrl)
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
                        q1+=allData[i][j]["h指数"];
                    }
                    sciAll.push(sci);
                    q1All.push(q1);
                }

                for(var i=0;i<length;i++){
                    q1Ratio[i]=q1All[i]/sciAll[i];
                }

                var q1 = Highcharts.chart('q1', { // Q1
                    title: {
                        text: 'H指数'
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
                            text: 'h指数',
                            style: {
                                color: Highcharts.getOptions().colors[0]
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
                        name: 'h指数',
                        type: 'column',
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
                $("#q1").highcharts().hideLoading();
            });
    }

    $scope.getCoau=function(){
        $http.get(coauUrl)
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
                        hq+=allData[i][j]["国际合作论文数"];
                    }
                    sciAll.push(sci);
                    hqAll.push(hq);
                }

                for(var i=0;i<length;i++){
                    hqRatio[i]=hqAll[i]/sciAll[i];
                }

                var q1 = Highcharts.chart('hq', { // Q1
                    title: {
                        text: '国际合作数量及比例'
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
                            text: '国际合作论文比例',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        },
                        opposite: true
                    }, { // Secondary yAxis
                        title: {
                            text: '\n' +
                                '国际合作论文数量',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                        labels: {
                            format: '{value}',
                            style: {
                                color: Highcharts.getOptions().colors[0]
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
                        name: '国际合作论文数量',
                        type: 'column',
                        yAxis: 1,
                        data: hqAll,
                        tooltip: {
                            valueSuffix: ''
                        }
                    }, {
                        name: '国际合作论文比例',
                        type: 'spline',
                        data: hqRatio,
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
                $("#hq").highcharts().hideLoading();
            });
    }

    $scope.getCnci=function(){
        $http.get(cnciUrl)
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
                        hot+=allData[i][j]["CNCI"];
                    }
                    sciAll.push(sci);
                    hotAll.push(hot);
                }

                for(var i=0;i<length;i++){
                    hotRatio[i]=hotAll[i]/sciAll[i];
                }

                var q1 = Highcharts.chart('hot', { // Q1
                    title: {
                        text: 'CNCI'
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
                            text: 'CNCI',
                            style: {
                                color: Highcharts.getOptions().colors[0]
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
                        name: 'CNCI',
                        type: 'column',
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
                $("#hot").highcharts().hideLoading();
            });
    }

    $scope.getRf=function(){
        $http.get(rfUrl)
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
                        cns+=allData[i][j]["进入RF的论文"];
                    }
                    sciAll.push(sci);
                    cnsAll.push(cns);
                }

                for(var i=0;i<length;i++){
                    cnsRatio[i]=cnsAll[i]/sciAll[i];
                }

                var q1 = Highcharts.chart('cns', { // Q1
                    title: {
                        text: '对Research Front的贡献度'
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
                            text: '进入RF的论文比例',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        },
                        opposite: true
                    }, { // Secondary yAxis
                        title: {
                            text: '\n' +
                                '进入RF的论文数量',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                        labels: {
                            format: '{value}',
                            style: {
                                color: Highcharts.getOptions().colors[0]
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
                        name: '进入RF的论文数量',
                        type: 'column',
                        yAxis: 1,
                        data: cnsAll,
                        tooltip: {
                            valueSuffix: ''
                        }
                    }, {
                        name: '进入RF的论文比例',
                        type: 'spline',
                        data: cnsRatio,
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
                $("#cns").highcharts().hideLoading();
            });
    }

    $scope.getNopp();
    $scope.getTopp();
    $scope.getH();
    $scope.getCoau();
    $scope.getCnci();
    $scope.getRf();

});