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
    var baseUrl="/shinfo/public/api/output/funding_group/"+field;

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

                let fundingYear=[];
                let fundingUSD=[];

                for(let i=0;i<response.length;i++){
                    fundingYear.push(response[i]["StartYear"]);
                    fundingUSD.push(response[i]["FundingUSD"]/1000000);
                }

                var NIH = Highcharts.chart('group-NIH', {
                    title: {
                        text: 'NIH'
                    },
                    xAxis: [{
                        categories: fundingYear,
                        crosshair: true
                    }],
                    yAxis: [{ // Primary yAxis
                        labels: {
                            format: '{value} (百万)',
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
                        name: 'USD',
                        type: 'column',
                        yAxis: 0,
                        data: fundingUSD,
                        tooltip: {
                            valueSuffix: '百万'
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

                let fundingYear=[];
                let fundingUSD=[];

                for(let i=0;i<response.length;i++){
                    fundingYear.push(response[i]["StartYear"]);
                    fundingUSD.push(response[i]["FundingUSD"]/1000000);
                }

                var DOD = Highcharts.chart('group-DOD', {
                    title: {
                        text: 'NSF'
                    },
                    xAxis: [{
                        categories: fundingYear,
                        crosshair: true
                    }],
                    yAxis: [{ // Primary yAxis
                        labels: {
                            format: '{value} (百万)',
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
                        name: 'USD',
                        type: 'column',
                        yAxis: 0,
                        data: fundingUSD,
                        tooltip: {
                            valueSuffix: '百万'
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

                let fundingYear=[];
                let fundingUSD=[];

                for(let i=0;i<response.length;i++){
                    fundingYear.push(response[i]["StartYear"]);
                    fundingUSD.push(response[i]["FundingUSD"]/1000000);
                }

                var DOE = Highcharts.chart('group-DOE', {
                    title: {
                        text: 'DOE'
                    },
                    xAxis: [{
                        categories: fundingYear,
                        crosshair: true
                    }],
                    yAxis: [{ // Primary yAxis
                        labels: {
                            format: '{value} (百万)',
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
                        name: 'USD',
                        type: 'column',
                        yAxis: 0,
                        data: fundingUSD,
                        tooltip: {
                            valueSuffix: '百万'
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

                let fundingYear=[];
                let fundingUSD=[];

                for(let i=0;i<response.length;i++){
                    fundingYear.push(response[i]["StartYear"]);
                    fundingUSD.push(response[i]["FundingUSD"]/1000000);
                }

                var UKRI = Highcharts.chart('group-UKRI', {
                    title: {
                        text: 'UKRI'
                    },
                    xAxis: [{
                        categories: fundingYear,
                        crosshair: true
                    }],
                    yAxis: [{ // Primary yAxis
                        labels: {
                            format: '{value} (百万)',
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
                        name: 'USD',
                        type: 'column',
                        yAxis: 0,
                        data: fundingUSD,
                        tooltip: {
                            valueSuffix: '百万'
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

                let fundingYear=[];
                let fundingUSD=[];

                for(let i=0;i<response.length;i++){
                    fundingYear.push(response[i]["StartYear"]);
                    fundingUSD.push(response[i]["FundingUSD"]/1000000);
                }

                var UKRI = Highcharts.chart('group-ECERC', {
                    title: {
                        text: 'EC-ERC'
                    },
                    xAxis: [{
                        categories: fundingYear,
                        crosshair: true
                    }],
                    yAxis: [{ // Primary yAxis
                        labels: {
                            format: '{value} (百万)',
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
                        name: 'USD',
                        type: 'column',
                        yAxis: 0,
                        data: fundingUSD,
                        tooltip: {
                            valueSuffix: '百万'
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

                let fundingYear=[];
                let fundingUSD=[];

                for(let i=0;i<response.length;i++){
                    fundingYear.push(response[i]["StartYear"]);
                    fundingUSD.push(response[i]["FundingUSD"]/1000000);
                }

                var NASA = Highcharts.chart('group-NASA', {
                    title: {
                        text: 'NASA'
                    },
                    xAxis: [{
                        categories: fundingYear,
                        crosshair: true
                    }],
                    yAxis: [{ // Primary yAxis
                        labels: {
                            format: '{value} (百万)',
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
                        name: 'USD',
                        type: 'column',
                        yAxis: 0,
                        data: fundingUSD,
                        tooltip: {
                            valueSuffix: '百万'
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