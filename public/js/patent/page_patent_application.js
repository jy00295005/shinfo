let app = angular.module('shinfo', []);

app.controller('controller', function($scope, $http) {

    // 获得选项
    let optionsUrl="/shinfo/public/api/output/get_options";

    $http.get(optionsUrl)
        .success(function (response) {
            $scope.cates=response["patent_cate"];
        });

    let cate="Fog Computing";
    let patentUrl="/shinfo/public/api/output/patent_yearly_trend/"+cate;

    // 筛选&刷新
    $scope.updateFilter=function(){

        cate="";

        // 多选框
        $("#lingyu .checkboxs input[type='checkbox']:checked").each(function () {
            cate=$(this).val();
        });

        // 如果没有选中项，默认
        if(cate=="") cate="Fog Computing";
        console.log("领域："+cate);

        // 显示提示
        $(".info-display").css("display","flex");
        $(".info-display span")[0].innerHTML=cate;

        patentUrl="/shinfo/public/api/output/patent_yearly_trend/"+cate;

        // 显示加载动画
        $("#apply-public").highcharts().showLoading();
        $("#patentees").highcharts().showLoading();
        $("#country-area").highcharts().showLoading();
        $("#ipc-tech").highcharts().showLoading();

        // 刷新图表
        $scope.getPatent();
    };

    $scope.getPatent=function(){
        $http.get(patentUrl)
            .success(function (response) {
                // 专利申请及公开趋势Data
                let appYear=response["app_year"];
                let applicationYear=[];
                let applicationCount=[];

                for(let i=0;i<appYear.length;i++){
                    applicationYear.push(appYear[i]["application_year"]);
                    applicationCount.push(appYear[i]["count"]);
                }

                let pubYear=response["pub_year"];
                let publicYear=[];
                let publicCount=[];

                for(let i=0;i<appYear.length;i++){
                    publicYear.push(pubYear[i]["public_year"]);
                    publicCount.push(pubYear[i]["count"]);
                }

                let series=[];
                let ob={};
                ob.name="专利申请";
                ob.data=applicationCount;
                series.push(ob);
                let ob2={};
                ob2.name="专利公开";
                ob2.data=publicCount;
                series.push(ob2);

                // 申请国家/地区Data
                let appCountry=response["app_country"];
                let appCountryCountry=[];
                let appCountryCount=[];

                for(let i=0;i<appCountry.length;i++){
                    appCountryCountry.push(appCountry[i]["app_country"]);
                    appCountryCount.push(appCountry[i]["count"]);
                }

                // 专利权人分布Data
                let applicant=response["applicant"];
                let applicantName=[];
                let applicantCount=[];

                for(let i=0;i<applicant.length;i++){
                    applicantName.push(applicant[i]["applicant"]);
                    applicantCount.push(applicant[i]["count"]);
                }

                // IPC技术构成Data
                let ipc=response["IPC"];
                let ipcName=[];
                let ipcCount=[];

                for(let i=0;i<ipc.length;i++){
                    ipcName.push(ipc[i]["IPC"]);
                    ipcCount.push(ipc[i]["count"]);
                }


                // 专利申请及公开趋势Chart
                let chart1 = Highcharts.chart('apply-public', { //trend of published papers
                    title: {
                        text: '专利申请及公开趋势'
                    },
                    yAxis: {
                        title: {
                            text: '数量'
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
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
                    },
                    loading: {
                        hideDuration: 1000,
                        showDuration: 1000
                    },
                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false
                            },
                            pointStart: 2010,
                            cursor: 'pointer',
                        }
                    }
                }, function () {
                    Highcharts.addEvent($('#apply-public').highcharts(), 'render', function () {
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
                            $("#applyPublicModal .modal-title").html(this.title.textStr);
                            $("#applyPublicModal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });

                // 专利权人分布Chart
                let chart2 = Highcharts.chart('patentees', {
                    title: {
                        text: '专利权人分布'
                    },
                    xAxis: [{
                        categories: applicantName,
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
                        name: '数量',
                        type: 'column',
                        yAxis: 0,
                        data: applicantCount,
                        tooltip: {
                            valueSuffix: ' '
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
                    Highcharts.addEvent($('#patentees').highcharts(), 'render', function () {
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
                            $("#patenteesModal .modal-title").html(this.title.textStr);
                            $("#patenteesModal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });

                // 申请国家/地区Chart
                let chart3 = Highcharts.chart('country-area', {
                    title: {
                        text: '申请国家/地区'
                    },
                    xAxis: [{
                        categories: appCountryCountry,
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
                        name: '数量',
                        type: 'column',
                        yAxis: 0,
                        data: appCountryCount,
                        tooltip: {
                            valueSuffix: ' '
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
                    Highcharts.addEvent($('#country-area').highcharts(), 'render', function () {
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
                            $("#countryAreaModal .modal-title").html(this.title.textStr);
                            $("#countryAreaModal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });

                // IPC技术构成Chart
                let chart4 = Highcharts.chart('ipc-tech', {
                    title: {
                        text: 'IPC技术构成'
                    },
                    xAxis: [{
                        categories: ipcName,
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
                        name: '数量',
                        type: 'column',
                        yAxis: 0,
                        data: ipcCount,
                        tooltip: {
                            valueSuffix: ' '
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
                    Highcharts.addEvent($('#ipc-tech').highcharts(), 'render', function () {
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
                            $("#ipcTechModal .modal-title").html(this.title.textStr);
                            $("#ipcTechModal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });


                // 刷新数据
                $("#apply-public").highcharts().reflow();
                $("#apply-public").highcharts().hideLoading();

                $("#patentees").highcharts().reflow();
                $("#patentees").highcharts().hideLoading();

                $("#country-area").highcharts().reflow();
                $("#country-area").highcharts().hideLoading();

                $("#ipc-tech").highcharts().reflow();
                $("#ipc-tech").highcharts().hideLoading();
            });
    };

    $scope.getPatent();

});