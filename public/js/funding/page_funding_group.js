changeNavbarLink(2);
changeSidebarLink(2);

let app = angular.module('shinfo', []);
app.controller('controller', function($scope, $http) {

    // 获得选项
    let optionsUrl="/shinfo/public/api/output/funding_opt";

    $http.get(optionsUrl)
        .success(function (response) {
            $scope.fields=response.fields;
        });

    let field="Physical Science & Technology";
    let baseUrl="/shinfo/public/api/output/funding_group/"+field;

    // 筛选&刷新
    $scope.filterss=function(){

        field="";

        // 多选框
        $("#lingyu .checkboxs input[type='checkbox']:checked").each(function () {
            field=$(this).val();
        });

        // 如果没有选中项，默认
        if(field=="") field="Physical Science & Technology";
        console.log("研究领域："+field);

        // 显示提示
        $(".info-display").css("display","flex");
        $(".info-display span")[0].innerHTML=field;

        baseUrl="/shinfo/public/api/output/funding_group/"+field;

        // 显示加载动画
        $("#group-NIH").highcharts().showLoading();
        $("#group-DOE").highcharts().showLoading();
        $("#group-ECERC").highcharts().showLoading();
        $("#group-DOD").highcharts().showLoading();
        $("#group-UKRI").highcharts().showLoading();
        $("#group-NASA").highcharts().showLoading();

        // 刷新图表
        $scope.getNIH();
        $scope.getDOD();
        $scope.getDOE();
        $scope.getUKRI();
        $scope.getECERC();
        $scope.getNASA();
    };

    $scope.getNIH=function(){
        $http.get(baseUrl+"/NIH")
            .success(function (response) {

                let fundingName=[];
                let fundingUSD=[];
                let fundingStr=[];

                for(let i=0;i<response.length;i++){
                    fundingName.push(response[i]["Org_stand"]);
                    fundingUSD.push(response[i]["FundingUSD"]/1000000);
                    fundingStr.push(parseFloat(response[i]["funding_str"].toString().slice(0,7)));
                }

                let NIH = Highcharts.chart('group-NIH', {
                    title: {
                        text: 'NIH'
                    },
                    xAxis: [{
                        categories: fundingName,
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
                            text: '资助强度',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        },
                        opposite: true
                    }, { // Secondary yAxis
                        title: {
                            text: '\n' +
                                '美金',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                        labels: {
                            format: '{value} (百万)',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
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
                        name: 'USD',
                        type: 'column',
                        yAxis: 1,
                        data: fundingUSD,
                        tooltip: {
                            valueSuffix: '百万'
                        }
                    }, {
                        name: '资助强度',
                        type: 'spline',
                        data: fundingStr,
                        tooltip: {
                            valueSuffix: ''
                        }
                    }],
                    exporting: {
                        showTable: true,
                        allowHTML: true
                    },
                    plotOptions: {
                        series: {
                            cursor: 'pointer',
                            events: {
                                click: function (event) {}
                            }
                        }
                    }
                }, function () {
                    Highcharts.addEvent($('#group-NIH').highcharts(), 'render', function () {
                        let table = this.dataTableDiv;
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
                            $("#groupNIHModal .modal-title").html(this.title.textStr);
                            $("#groupNIHModal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });

                // 刷新数据
                $("#group-NIH").highcharts().reflow();
                $("#group-NIH").highcharts().hideLoading();
            });
    };

    $scope.getDOD=function(){
        $http.get(baseUrl+"/NSF")
            .success(function (response) {

                let fundingName=[];
                let fundingUSD=[];
                let fundingStr=[];

                for(let i=0;i<response.length;i++){
                    fundingName.push(response[i]["Org_stand"]);
                    fundingUSD.push(response[i]["FundingUSD"]/1000000);
                    fundingStr.push(parseFloat(response[i]["funding_str"].toString().slice(0,7)));
                }

                let DOD = Highcharts.chart('group-DOD', {
                    title: {
                        text: 'NSF'
                    },
                    xAxis: [{
                        categories: fundingName,
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
                            text: '资助强度',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        },
                        opposite: true
                    }, { // Secondary yAxis
                        title: {
                            text: '\n' +
                                '美金',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                        labels: {
                            format: '{value} (百万)',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
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
                        name: 'USD',
                        type: 'column',
                        yAxis: 1,
                        data: fundingUSD,
                        tooltip: {
                            valueSuffix: '百万'
                        }
                    }, {
                        name: '资助强度',
                        type: 'spline',
                        data: fundingStr,
                        tooltip: {
                            valueSuffix: ''
                        }
                    }],
                    exporting: {
                        showTable: true,
                        allowHTML: true
                    },
                    plotOptions: {
                        series: {
                            cursor: 'pointer',
                            events: {
                                click: function (event) {}
                            }
                        }
                    }
                }, function () {
                    Highcharts.addEvent($('#group-DOD').highcharts(), 'render', function () {
                        let table = this.dataTableDiv;
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
                            $("#groupDODModal .modal-title").html(this.title.textStr);
                            $("#groupDODModal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });

                // 刷新数据
                $("#group-DOD").highcharts().reflow();
                $("#group-DOD").highcharts().hideLoading();
            });
    };

    $scope.getDOE=function(){
        $http.get(baseUrl+"/DOE")
            .success(function (response) {

                let fundingName=[];
                let fundingUSD=[];
                let fundingStr=[];

                for(let i=0;i<response.length;i++){
                    fundingName.push(response[i]["Org_stand"]);
                    fundingUSD.push(response[i]["FundingUSD"]/1000000);
                    fundingStr.push(parseFloat(response[i]["funding_str"].toString().slice(0,7)));
                }

                let DOE = Highcharts.chart('group-DOE', {
                    title: {
                        text: 'DOE'
                    },
                    xAxis: [{
                        categories: fundingName,
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
                            text: '资助强度',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        },
                        opposite: true
                    }, { // Secondary yAxis
                        title: {
                            text: '\n' +
                                '美金',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                        labels: {
                            format: '{value} (百万)',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
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
                        name: 'USD',
                        type: 'column',
                        yAxis: 1,
                        data: fundingUSD,
                        tooltip: {
                            valueSuffix: '百万'
                        }
                    }, {
                        name: '资助强度',
                        type: 'spline',
                        data: fundingStr,
                        tooltip: {
                            valueSuffix: ''
                        }
                    }],
                    exporting: {
                        showTable: true,
                        allowHTML: true
                    },
                    plotOptions: {
                        series: {
                            cursor: 'pointer',
                            events: {
                                click: function (event) {}
                            }
                        }
                    }
                }, function () {
                    Highcharts.addEvent($('#group-DOE').highcharts(), 'render', function () {
                        let table = this.dataTableDiv;
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
                            $("#groupDOEModal .modal-title").html(this.title.textStr);
                            $("#groupDOEModal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });

                // 刷新数据
                $("#group-DOE").highcharts().reflow();
                $("#group-DOE").highcharts().hideLoading();
            });
    };

    $scope.getUKRI=function(){
        $http.get(baseUrl+"/UKRI")
            .success(function (response) {

                let fundingName=[];
                let fundingUSD=[];
                let fundingStr=[];

                for(let i=0;i<response.length;i++){
                    fundingName.push(response[i]["Org_stand"]);
                    fundingUSD.push(response[i]["FundingUSD"]/1000000);
                    fundingStr.push(parseFloat(response[i]["funding_str"].toString().slice(0,7)));
                }

                let UKRI = Highcharts.chart('group-UKRI', {
                    title: {
                        text: 'UKRI'
                    },
                    xAxis: [{
                        categories: fundingName,
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
                            text: '资助强度',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        },
                        opposite: true
                    }, { // Secondary yAxis
                        title: {
                            text: '\n' +
                                '美金',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                        labels: {
                            format: '{value} (百万)',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
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
                        name: 'USD',
                        type: 'column',
                        yAxis: 1,
                        data: fundingUSD,
                        tooltip: {
                            valueSuffix: '百万'
                        }
                    }, {
                        name: '资助强度',
                        type: 'spline',
                        data: fundingStr,
                        tooltip: {
                            valueSuffix: ''
                        }
                    }],
                    exporting: {
                        showTable: true,
                        allowHTML: true
                    },
                    plotOptions: {
                        series: {
                            cursor: 'pointer',
                            events: {
                                click: function (event) {}
                            }
                        }
                    }
                }, function () {
                    Highcharts.addEvent($('#group-UKRI').highcharts(), 'render', function () {
                        let table = this.dataTableDiv;
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
                            $("#groupUKRIModal .modal-title").html(this.title.textStr);
                            $("#groupUKRIModal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });

                // 刷新数据
                $("#group-UKRI").highcharts().reflow();
                $("#group-UKRI").highcharts().hideLoading();
            });
    };

    $scope.getECERC=function(){
        $http.get(baseUrl+"/EC-ERC")
            .success(function (response) {

                let fundingName=[];
                let fundingUSD=[];
                let fundingStr=[];

                for(let i=0;i<response.length;i++){
                    fundingName.push(response[i]["Org_stand"]);
                    fundingUSD.push(response[i]["FundingUSD"]/1000000);
                    fundingStr.push(parseFloat(response[i]["funding_str"].toString().slice(0,7)));
                }

                let ECERC = Highcharts.chart('group-ECERC', {
                    title: {
                        text: 'EC-ERH'
                    },
                    xAxis: [{
                        categories: fundingName,
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
                            text: '资助强度',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        },
                        opposite: true
                    }, { // Secondary yAxis
                        title: {
                            text: '\n' +
                                '美金',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                        labels: {
                            format: '{value} (百万)',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
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
                        name: 'USD',
                        type: 'column',
                        yAxis: 1,
                        data: fundingUSD,
                        tooltip: {
                            valueSuffix: '百万'
                        }
                    }, {
                        name: '资助强度',
                        type: 'spline',
                        data: fundingStr,
                        tooltip: {
                            valueSuffix: ''
                        }
                    }],
                    exporting: {
                        showTable: true,
                        allowHTML: true
                    },
                    plotOptions: {
                        series: {
                            cursor: 'pointer',
                            events: {
                                click: function (event) {}
                            }
                        }
                    }
                }, function () {
                    Highcharts.addEvent($('#group-ECERC').highcharts(), 'render', function () {
                        let table = this.dataTableDiv;
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
                            $("#groupECERCModal .modal-title").html(this.title.textStr);
                            $("#groupECERCModal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });

                // 刷新数据
                $("#group-ECERC").highcharts().reflow();
                $("#group-ECERC").highcharts().hideLoading();
            });
    };

    $scope.getNASA=function(){
        $http.get(baseUrl+"/NASA")
            .success(function (response) {

                let fundingName=[];
                let fundingUSD=[];
                let fundingStr=[];

                for(let i=0;i<response.length;i++){
                    fundingName.push(response[i]["Org_stand"]);
                    fundingUSD.push(response[i]["FundingUSD"]/1000000);
                    fundingStr.push(parseFloat(response[i]["funding_str"].toString().slice(0,7)));
                }

                let NASA = Highcharts.chart('group-NASA', {
                    title: {
                        text: 'NASA'
                    },
                    xAxis: [{
                        categories: fundingName,
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
                            text: '资助强度',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        },
                        opposite: true
                    }, { // Secondary yAxis
                        title: {
                            text: '\n' +
                                '美金',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                        labels: {
                            format: '{value} (百万)',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
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
                        name: 'USD',
                        type: 'column',
                        yAxis: 1,
                        data: fundingUSD,
                        tooltip: {
                            valueSuffix: '百万'
                        }
                    }, {
                        name: '资助强度',
                        type: 'spline',
                        data: fundingStr,
                        tooltip: {
                            valueSuffix: ''
                        }
                    }],
                    exporting: {
                        showTable: true,
                        allowHTML: true
                    },
                    plotOptions: {
                        series: {
                            cursor: 'pointer',
                            events: {
                                click: function (event) {}
                            }
                        }
                    }
                }, function () {
                    Highcharts.addEvent($('#group-NASA').highcharts(), 'render', function () {
                        let table = this.dataTableDiv;
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
                            $("#groupNASAModal .modal-title").html(this.title.textStr);
                            $("#groupNASAModal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });

                // 刷新数据
                $("#group-NASA").highcharts().reflow();
                $("#group-NASA").highcharts().hideLoading();
            });
    };

    $scope.getNIH();
    $scope.getDOD();
    $scope.getDOE();
    $scope.getUKRI();
    $scope.getECERC();
    $scope.getNASA();
});