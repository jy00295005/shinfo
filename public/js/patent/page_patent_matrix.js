changeNavbarLink(3);
changeSidebarLink(2);

let app = angular.module('shinfo', []);
app.controller('controller', function($scope, $http) {

    // 获得选项
    let optionsUrl="/shinfo/public/api/output/get_options";

    $http.get(optionsUrl)
        .success(function (response) {
            $scope.cates=response["patent_cate"];
        });

    let cate="Fog Computing";
    let patentUrl="/shinfo/public/api/output/patent_mix/"+cate;

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

        patentUrl="/shinfo/public/api/output/patent_mix/"+cate;

        // 显示加载动画
        $("#cvy").highcharts().showLoading();
        $("#avs").highcharts().showLoading();
        $("#ivy").highcharts().showLoading();
        $("#cvi").highcharts().showLoading();
        $("#avi").highcharts().showLoading();

        // 刷新图表
        $scope.getPatent();
    };

    $scope.getPatent=function(){
        $http.get(patentUrl)
            .success(function (response) {
                // 技术市场&活跃期data
                let cvy=response["countriesVSyear"];
                let cvyAllList=[];
                let countryObj={};
                let countryObj2={};
                let countryNum=0;
                let yAxisList=[];

                for(let i=0;i<cvy.length;i++){
                    let cvyList=[];
                    cvyList.push(cvy[i]["app_year"]);
                    if(!countryObj.hasOwnProperty(cvy[i]["app_country"])){
                        countryNum++;
                        countryObj[cvy[i]["app_country"]]=countryNum;
                        countryObj2[countryNum]=cvy[i]["app_country"];
                    }
                    cvyList.push(countryObj[cvy[i]["app_country"]]);
                    cvyList.push(cvy[i]["count"]);
                    cvyAllList.push(cvyList)
                }

                for(let i in Object.keys(countryObj2)){
                    yAxisList.push(parseInt(Object.keys(countryObj2)[i]))
                }

                // 技术市场&技术分布data
                let cvi=response["countriesVSipc"];
                let cviAllList=[];
                let countryObj22={};
                let countryObj222={};
                let countryNum2=0;
                let yAxisList2=[];

                let ipcObj={};
                let ipcObj2={};
                let ipcNum=0;
                let xAxisList=[];

                for(let i=0;i<cvi.length;i++){
                    let cviList=[];
                    if(!ipcObj.hasOwnProperty(cvi[i]["IPC"])){
                        ipcNum++;
                        ipcObj[cvi[i]["IPC"]]=ipcNum;
                        ipcObj2[ipcNum]=cvi[i]["IPC"];
                    }
                    cviList.push(ipcObj[cvi[i]["IPC"]]);

                    if(!countryObj22.hasOwnProperty(cvi[i]["app_country"])){
                        countryNum2++;
                        countryObj22[cvi[i]["app_country"]]=countryNum2;
                        countryObj222[countryNum2]=cvi[i]["app_country"];
                    }
                    cviList.push(countryObj22[cvi[i]["app_country"]]);

                    cviList.push(cvi[i]["count"]);
                    cviAllList.push(cviList)
                }

                for(let i in Object.keys(countryObj222)){
                    yAxisList2.push(parseInt(Object.keys(countryObj222)[i]))
                }
                for(let i in Object.keys(ipcObj2)){
                    xAxisList.push(parseInt(Object.keys(ipcObj2)[i]))
                }

                // 专利权人&活跃期data
                let avs=response["applicantVSyear"];
                let avsAllList=[];
                let applicantObj={};
                let applicantObj2={};
                let applicantNum=0;
                let yAxisList3=[];

                for(let i=0;i<avs.length;i++){
                    let avsList=[];
                    avsList.push(avs[i]["app_year"]);
                    if(!applicantObj.hasOwnProperty(avs[i]["applicant"])){
                        applicantNum++;
                        applicantObj[avs[i]["applicant"]]=applicantNum;
                        applicantObj2[applicantNum]=avs[i]["applicant"];
                    }
                    avsList.push(applicantObj[avs[i]["applicant"]]);
                    avsList.push(avs[i]["count"]);
                    avsAllList.push(avsList)
                }

                for(let i in Object.keys(applicantObj2)){
                    yAxisList3.push(parseInt(Object.keys(applicantObj2)[i]))
                }

                // 专利权人&技术分布data
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
                    if(!ipcObj22.hasOwnProperty(avi[i]["IPC"])){
                        ipcNum2++;
                        ipcObj22[avi[i]["IPC"]]=ipcNum2;
                        ipcObj222[ipcNum2]=avi[i]["IPC"];
                    }
                    aviList.push(ipcObj22[avi[i]["IPC"]]);

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

                // 技术发展趋势data
                let ivy=response["ipcVSyear"];
                let ivyAllList=[];
                let ipcObj3={};
                let ipcObj33={};
                let ipcNum3=0;
                let yAxisList5=[];

                for(let i=0;i<ivy.length;i++){
                    let ivyList=[];
                    ivyList.push(ivy[i]["app_year"]);
                    if(!ipcObj3.hasOwnProperty(ivy[i]["IPC"])){
                        ipcNum3++;
                        ipcObj3[ivy[i]["IPC"]]=ipcNum3;
                        ipcObj33[ipcNum3]=ivy[i]["IPC"];
                    }
                    ivyList.push(ipcObj3[ivy[i]["IPC"]]);
                    ivyList.push(ivy[i]["count"]);
                    ivyAllList.push(ivyList)
                }

                for(let i in Object.keys(ipcObj33)){
                    yAxisList5.push(parseInt(Object.keys(ipcObj33)[i]))
                }



                // 技术市场&活跃期chart
                let chart1 = Highcharts.chart('cvy', {
                    chart: {
                        type: 'bubble',
                        plotBorderWidth: 1,
                        zoomType: 'xy'
                    },
                    title: {
                        text: '技术市场&活跃期'
                    },
                    xAxis: {
                        title: {
                            text: "申请年"
                        },
                        gridLineWidth: 1
                    },
                    yAxis: {
                        title: {
                            text: "申请国"
                        },
                        labels: {
                            formatter: function () {
                                return countryObj2[this.value];
                            }
                        },
                        startOnTick: false,
                        endOnTick: false,
                        tickPositions: yAxisList
                    },
                    series: [{
                        name:'技术市场&活跃期',
                        data: cvyAllList,
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
                    Highcharts.addEvent($('#cvy').highcharts(), 'render', function () {
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
                            $("#cvyModal .modal-title").html(this.title.textStr);
                            $("#cvyModal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });

                // 技术市场&技术分布chart
                let chart2 = Highcharts.chart('cvi', {
                    chart: {
                        type: 'bubble',
                        plotBorderWidth: 1,
                        zoomType: 'xy'
                    },
                    title: {
                        text: '技术市场&技术分布'
                    },
                    xAxis: {
                        title: {
                            text: "IPC技术"
                        },
                        gridLineWidth: 1,
                        labels: {
                            rotation: -30,
                            formatter: function () {
                                return ipcObj2[this.value];
                            }
                        },
                        tickPositions: xAxisList
                    },
                    yAxis: {
                        title: {
                            text: "申请国"
                        },
                        labels: {
                            formatter: function () {
                                return countryObj222[this.value];
                            }
                        },
                        startOnTick: false,
                        endOnTick: false,
                        tickPositions: yAxisList2
                    },
                    series: [{
                        name:'技术市场&技术分布',
                        data: cviAllList,
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
                    Highcharts.addEvent($('#cvi').highcharts(), 'render', function () {
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
                            $("#cviModal .modal-title").html(this.title.textStr);
                            $("#cviModal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });

                //专利权人&活跃期chart
                let chart3 = Highcharts.chart('avs', {
                    chart: {
                        type: 'bubble',
                        plotBorderWidth: 1,
                        zoomType: 'xy'
                    },
                    title: {
                        text: '专利权人&活跃期'
                    },
                    xAxis: {
                        title: {
                            text: "申请年"
                        },
                        gridLineWidth: 1
                    },
                    yAxis: {
                        title: {
                            text: "专利权人"
                        },
                        labels: {
                            rotation: -20,
                            formatter: function () {
                                return applicantObj2[this.value].substring(0,10);
                            }
                        },
                        startOnTick: false,
                        endOnTick: false,
                        tickPositions: yAxisList3
                    },
                    series: [{
                        name:'专利权人&活跃期',
                        data: avsAllList,
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
                    Highcharts.addEvent($('#avs').highcharts(), 'render', function () {
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
                            $("#avsModal .modal-title").html(this.title.textStr);
                            $("#avsModal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });

                // 专利权人&技术分布chart
                let chart4 = Highcharts.chart('avi', {
                    chart: {
                        type: 'bubble',
                        plotBorderWidth: 1,
                        zoomType: 'xy'
                    },
                    title: {
                        text: '专利权人&技术分布'
                    },
                    xAxis: {
                        title: {
                            text: "IPC技术"
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
                        name:'专利权人&技术分布',
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

                // 技术发展趋势chart
                let chart5 = Highcharts.chart('ivy', {
                    chart: {
                        type: 'bubble',
                        plotBorderWidth: 1,
                        zoomType: 'xy'
                    },
                    title: {
                        text: '技术发展趋势'
                    },
                    xAxis: {
                        title: {
                            text: "申请年"
                        },
                        gridLineWidth: 1
                    },
                    yAxis: {
                        title: {
                            text: "IPC技术"
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
                        name:'技术发展趋势',
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
                    Highcharts.addEvent($('#ivy').highcharts(), 'render', function () {
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
                            $("#ivyModal .modal-title").html(this.title.textStr);
                            $("#ivyModal .modal-body").html(table.outerHTML);

                            if (table.parentNode) {
                                table.parentNode.removeChild(table);
                            }
                            delete this.dataTableDiv;
                        }
                    });
                });


                // 刷新数据
                $("#cvy").highcharts().reflow();
                $("#cvy").highcharts().hideLoading();

                $("#cvi").highcharts().reflow();
                $("#cvi").highcharts().hideLoading();

                $("#avs").highcharts().reflow();
                $("#avs").highcharts().hideLoading();

                $("#ivy").highcharts().reflow();
                $("#ivy").highcharts().hideLoading();

                $("#avi").highcharts().reflow();
                $("#avi").highcharts().hideLoading();
            });
    };

    $scope.getPatent();

});