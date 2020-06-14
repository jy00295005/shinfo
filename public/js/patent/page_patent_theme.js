changeNavbarLink(3);
changeSidebarLink(3);

let app = angular.module('shinfo', []);
app.controller('controller', function($scope, $http) {

    // 获得选项
    let optionsUrl="/shinfo/public/api/output/get_options";

    $http.get(optionsUrl)
        .success(function (response) {
            $scope.cates=response["patent_cate"];
        });

    let cate="Fog Computing";
    let patentUrl="/shinfo/public/api/output/patent_topic/"+cate;

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

        patentUrl="/shinfo/public/api/output/patent_topic/"+cate;

        // 显示加载动画
        $("#ivy").highcharts().showLoading();
        $("#avi").highcharts().showLoading();

        // 刷新图表
        $scope.getPatent();
    };

    $scope.getPatent=function(){
        $http.get(patentUrl)
            .success(function (response) {
                // 专利权人&关键技术data
                let avi=response["applicantVSIPC"];
                let aviAllList=[];
                let applicant22={};
                let applicant222={};
                let applicantNum2=0;
                let yAxisList4=[];

                let ipcObj22={};
                let ipcObj222={};
                let ipcNum2=0;
                let xAxisList2=[];

                for(let i=0;i<avi.length;i++){
                    let aviList=[];
                    if(!ipcObj22.hasOwnProperty(avi[i]["key_tech"])){
                        ipcNum2++;
                        ipcObj22[avi[i]["key_tech"]]=ipcNum2;
                        ipcObj222[ipcNum2]=avi[i]["key_tech"];
                    }
                    aviList.push(ipcObj22[avi[i]["key_tech"]]);

                    if(!applicant22.hasOwnProperty(avi[i]["applicant"])){
                        applicantNum2++;
                        applicant22[avi[i]["applicant"]]=applicantNum2;
                        applicant222[applicantNum2]=avi[i]["applicant"];
                    }
                    aviList.push(applicant22[avi[i]["applicant"]]);

                    aviList.push(avi[i]["count"]);
                    aviAllList.push(aviList)
                }

                for(let i in Object.keys(applicant222)){
                    yAxisList4.push(parseInt(Object.keys(applicant222)[i]))
                }
                for(let i in Object.keys(ipcObj222)){
                    xAxisList2.push(parseInt(Object.keys(ipcObj222)[i]))
                }

                // 关键技术VS申请年data
                let ivy=response["key_techVSyear"];
                let ivyAllList=[];
                let ipcObj3={};
                let ipcObj33={};
                let ipcNum3=0;
                let yAxisList5=[];
                console.log(response);

                for(let i=0;i<ivy.length;i++){
                    let ivyList=[];
                    ivyList.push(ivy[i]["app_year"]);
                    if(!ipcObj3.hasOwnProperty(ivy[i]["key_tech"])){
                        ipcNum3++;
                        ipcObj3[ivy[i]["key_tech"]]=ipcNum3;
                        ipcObj33[ipcNum3]=ivy[i]["key_tech"];
                    }
                    ivyList.push(ipcObj3[ivy[i]["key_tech"]]);
                    ivyList.push(ivy[i]["count"]);
                    ivyAllList.push(ivyList)
                }

                for(let i in Object.keys(ipcObj33)){
                    yAxisList5.push(parseInt(Object.keys(ipcObj33)[i]))
                }


                // 专利权人&关键技术chart
                let chart4 = Highcharts.chart('avi', {
                    chart: {
                        type: 'bubble',
                        plotBorderWidth: 1,
                        zoomType: 'xy'
                    },
                    title: {
                        text: '专利权人&关键技术'
                    },
                    xAxis: {
                        title: {
                            text: "关键技术"
                        },
                        gridLineWidth: 1,
                        labels: {
                            rotation: -30,
                            formatter: function () {
                                return ipcObj222[this.value];
                            }
                        },
                        tickPositions: xAxisList2
                    },
                    yAxis: {
                        title: {
                            text: "专利权人"
                        },
                        labels: {
                            rotation: -20,
                            formatter: function () {
                                return applicant222[this.value].substring(0,10);
                            }
                        },
                        startOnTick: false,
                        endOnTick: false,
                        tickPositions: yAxisList4
                    },
                    series: [{
                        name:'专利权人&关键技术',
                        data: aviAllList,
                        marker: {
                            fillColor: {
                                radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                                stops: [
                                    [0, 'rgba(255,255,255,0.5)'],
                                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.5).get('rgba')]
                                ]
                            }
                        }
                    },]
                }, function () {
                    Highcharts.addEvent($('#avi').highcharts(), 'render', function () {
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
                            $("#aviModal .modal-title").html(this.title.textStr);
                            $("#aviModal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });

                // 关键技术VS申请年chart
                let chart5 = Highcharts.chart('kvy', {
                    chart: {
                        type: 'bubble',
                        plotBorderWidth: 1,
                        zoomType: 'xy'
                    },
                    title: {
                        text: '关键技术&申请年'
                    },
                    xAxis: {
                        title: {
                            text: "申请年"
                        },
                        gridLineWidth: 1
                    },
                    yAxis: {
                        title: {
                            text: "关键技术"
                        },
                        labels: {
                            formatter: function () {
                                return ipcObj33[this.value];
                            }
                        },
                        startOnTick: false,
                        endOnTick: false,
                        tickPositions: yAxisList4
                    },
                    series: [{
                        name:'关键技术&申请年',
                        data: ivyAllList,
                        marker: {
                            fillColor: {
                                radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                                stops: [
                                    [0, 'rgba(255,255,255,0.5)'],
                                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.5).get('rgba')]
                                ]
                            }
                        }
                    },]
                }, function () {
                    Highcharts.addEvent($('#kvy').highcharts(), 'render', function () {
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
                            $("#kvyModal .modal-title").html(this.title.textStr);
                            $("#kvyModal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });


                // 刷新数据
                $("#ivy").highcharts().reflow();
                $("#ivy").highcharts().hideLoading();

                $("#avi").highcharts().reflow();
                $("#avi").highcharts().hideLoading();
            });
    };

    $scope.getPatent();

});