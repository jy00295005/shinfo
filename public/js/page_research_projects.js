// 放大图表（显示浮层）
function zoomChart(c){
    var element="#"+c;
    $(".c").parent().each(function () {
        $(this).addClass("display-none");
    });
    $(element).parent().removeClass("display-none");
    $(element).addClass("zoom");
    $(element).prepend("<button class='btn-sm btn-danger closeB' style='position: relative; float: right' onclick='closeF()'>关闭</button>");
    $(element).highcharts().reflow();
}

// 关闭浮层
function closeF(){
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

// 全选操作
var ischecked1=true;
var ischecked2=true;

function checkAll(e){
    var element=$(e);
    if (e=="#all1"){ // 选择对哪个列表进行操作
        element.checked=ischecked1;
    } else{
        element.checked=ischecked2;
    }

    if (element.checked){
        element.parent().parent().parent().find("input").each(function () {
            $(this)[0].checked=true;
        });
        if (e=="#all1") ischecked1=false;
        else ischecked2=false;
    } else{
        element.parent().parent().parent().find("input").each(function () {
            $(this)[0].checked=false;
        });
        if (e=="#all1") ischecked1=true;
        else ischecked2=true;
    }
}

// 控制筛选body的隐藏
$(".btn-customize button")[1].onclick=function () {
    $("#filter_body").collapse('hide');
};


var app = angular.module('shinfo', []);

app.controller('controller', function($scope, $http) {

    // 获得选项
    var optionsUrl="/shinfo/public/api/output/funding_opt";

    $http.get(optionsUrl)
        .success(function (response) {
            $scope.fields=response.fields;
        });

    var field="Physical Science & Technology";
    var fundingUrl="/shinfo/public/api/output/funding/"+field;

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

        fundingUrl="/shinfo/public/api/output/funding/"+field;

        // 显示加载动画
        $("#fund-year").highcharts().showLoading();
        $("#fund-country").highcharts().showLoading();
        $("#fund-cate").highcharts().showLoading();
        $("#fund-group").highcharts().showLoading();

        // 刷新图表
        $scope.getFunding();
    };

    $scope.getFunding=function(){
        $http.get(fundingUrl)
            .success(function (response) {
                // 数量趋势Data
                let fundingYear=response["funding_year"];
                let fundingYearYear=[];
                let fundingYearCount=[];

                for(let i=0;i<fundingYear.length;i++){
                    fundingYearYear.push(fundingYear[i]["StartYear"]);
                    fundingYearCount.push(fundingYear[i]["year_count"]);
                }

                // 学科分布Data
                let fundingCate=response["funding_cate"];
                let fundingCateCate=[];
                let fundingCateCount=[];

                for(let i=0;i<fundingCate.length;i++){
                    fundingCateCate.push(fundingCate[i]["cate"]);
                    fundingCateCount.push(fundingCate[i]["cate_count"]);
                }

                // 资助国家Data
                let fundingCountry=response["funding_country"];
                let fundingConCon=[];
                let fundingConCount=[];

                for(let i=0;i<fundingCountry.length;i++){
                    fundingConCon.push(fundingCountry[i]["country"]);
                    fundingConCount.push(fundingCountry[i]["country_count"]);
                }

                // 资助机构Data
                let fundingGroup=response["funding_FunderGroup_display"];
                let fundingGroupDisplay=[];
                let fundingGroupCount=[];

                for(let i=0;i<fundingGroup.length;i++){
                    fundingGroupDisplay.push(fundingGroup[i]["FunderGroup_display"]);
                    fundingGroupCount.push(fundingGroup[i]["FunderGroup_display_count"]);
                }

                // 数量趋势Chart
                var fundYear = Highcharts.chart('fund-year', {
                    title: {
                        text: '数量趋势'
                    },
                    xAxis: [{
                        categories: fundingYearYear,
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
                        data: fundingYearCount,
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
                    Highcharts.addEvent($('#fund-year').highcharts(), 'render', function () {
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
                            $("#fundYearModal .modal-title").html(this.title.textStr);
                            $("#fundYearModal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });

                // 学科分布Chart
                var fundCate = Highcharts.chart('fund-cate', {
                    title: {
                        text: '学科分布'
                    },
                    xAxis: [{
                        categories: fundingCateCate,
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
                        data: fundingCateCount,
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
                    Highcharts.addEvent($('#fund-cate').highcharts(), 'render', function () {
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
                            $("#fundCateModal .modal-title").html(this.title.textStr);
                            $("#fundCateModal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });

                // 资助国家Chart
                var fundCountry = Highcharts.chart('fund-country', {
                    title: {
                        text: '资助国家/地区'
                    },
                    xAxis: [{
                        categories: fundingConCon,
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
                        data: fundingConCount,
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
                    Highcharts.addEvent($('#fund-country').highcharts(), 'render', function () {
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
                            $("#fundCountryModal .modal-title").html(this.title.textStr);
                            $("#fundCountryModal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });

                // 资助机构Chart
                var fundGroup = Highcharts.chart('fund-group', {
                    title: {
                        text: '资助机构'
                    },
                    xAxis: [{
                        categories: fundingGroupDisplay,
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
                        data: fundingGroupCount,
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
                    Highcharts.addEvent($('#fund-group').highcharts(), 'render', function () {
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
                            $("#fundGroupModal .modal-title").html(this.title.textStr);
                            $("#fundGroupModal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });

                // 刷新数据
                $("#fund-year").highcharts().reflow();
                $("#fund-year").highcharts().hideLoading();

                $("#fund-cate").highcharts().reflow();
                $("#fund-cate").highcharts().hideLoading();

                $("#fund-country").highcharts().reflow();
                $("#fund-country").highcharts().hideLoading();

                $("#fund-group").highcharts().reflow();
                $("#fund-group").highcharts().hideLoading();
            });
    };

    $scope.getFunding();

});