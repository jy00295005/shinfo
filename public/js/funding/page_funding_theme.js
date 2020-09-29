changeNavbarLink(2);

let app = angular.module('shinfo', []);
app.controller('controller', function($scope, $http) {

    // 获得选项
    let optionsUrl="/shinfo/public/api/output/funding_opt";

    $http.get(optionsUrl)
        .success(function (response) {
            $scope.fields=response.fields;
        });

    let field="Physical Science & Technology";

    if(localStorage.getItem("funding_field")!=null){
        field=localStorage.getItem("funding_field");
    }

    let fundingUrl="/shinfo/public/api/output/funding/"+field;
    let topicUrl="/shinfo/public/api/output/get_funding_topic_name/"+field;
    let topic="";

    // 获得topic
    $http.get(topicUrl)
        .success(function (response) {
            let topics=[];
            for(let item in response){
                topics.push(item);
            }
            $scope.topics=topics;
        });

    // 选择topic
    $scope.chooseTopic=function(value){
        console.log($(this)[0].$index);
        let index=$(this)[0].$index;
        $(".topic").css({color: "rgb(0, 123, 255)", background: ""});
        $(".topic").eq(index).css({color: "#ffffff", background: "rgb(0, 123, 255)"});
        topic=value;
        $scope.filterss();
    };

    // $(document).ready(function(){
    //     $(".checkboxs input[type='checkbox']").click(function () {
    //         $scope.filterss();
    //     });
    //     $("#all2").click(function () {
    //         $scope.filterss();
    //     });
    // });

    // 筛选&刷新
    $scope.filterss=function(){
        let field="";

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

        localStorage.setItem("funding_field", field);

        fundingUrl="/shinfo/public/api/output/funding/"+field+"/"+topic;

        // 显示加载动画
        $("#fund-year").highcharts().showLoading();
        $("#fund-country").highcharts().showLoading();
        $("#fund-cate").highcharts().showLoading();
        $("#fund-group").highcharts().showLoading();
        $("#research-org").highcharts().showLoading();
        $("#fund-researcher").highcharts().showLoading();

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
                    fundingConCon.push(fundingCountry[i]["Funder_Country"]);
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

                // 研究机构Data
                let researchOrg=response["funding_ORG_display"];
                let org=[];
                let orgCount=[];

                for(let i=0;i<researchOrg.length;i++){
                    org.push(researchOrg[i]["org"]);
                    orgCount.push(researchOrg[i]["org_count"]);
                }

                // 申请人分布Data
                let fundingResearcher=response["funding_researcher_display"];
                let researcher=[];
                let researcherCount=[];

                for(let i=0;i<fundingResearcher.length;i++){
                    researcher.push(fundingResearcher[i]["researcher"]);
                    researcherCount.push(fundingResearcher[i]["researcher_count"]);
                }

                // 数量趋势Chart
                let fundYear = Highcharts.chart('fund-year', {
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
                let fundCate = Highcharts.chart('fund-cate', {
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
                let fundCountry = Highcharts.chart('fund-country', {
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
                let fundGroup = Highcharts.chart('fund-group', {
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
                            $("#fundGroupModal .modal-title").html(this.title.textStr);
                            $("#fundGroupModal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });

                // 研究机构Chart
                let researchingOrg = Highcharts.chart('research-org', {
                    title: {
                        text: '研究机构'
                    },
                    xAxis: [{
                        categories: org,
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
                        data: orgCount,
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
                    Highcharts.addEvent($('#research-org').highcharts(), 'render', function () {
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
                            $("#researchOrgModal .modal-title").html(this.title.textStr);
                            $("#researchOrgModal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });

                // 申请人分布Chart
                let fundResearcher = Highcharts.chart('fund-researcher', {
                    title: {
                        text: '申请人分布'
                    },
                    xAxis: [{
                        categories: researcher,
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
                        data: researcherCount,
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
                    Highcharts.addEvent($('#fund-researcher').highcharts(), 'render', function () {
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
                            $("#fundResearcherModal .modal-title").html(this.title.textStr);
                            $("#fundResearcherModal .modal-body").html(table.outerHTML);

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

                $("#research-org").highcharts().reflow();
                $("#research-org").highcharts().hideLoading();

                $("#fund-researcher").highcharts().reflow();
                $("#fund-researcher").highcharts().hideLoading();
            });
    };

    $scope.getFunding();

    $(".info-display").css("display","flex");
    $(".info-display span")[0].innerHTML=field;

});