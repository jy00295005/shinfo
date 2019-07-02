var app = angular.module('shinfo', []);

var noppUrl="http://127.0.0.1/shinfo/public/api/output/inst_paper_count";
var noppList;

var toppUrl="http://127.0.0.1/shinfo/public/api/output/inst_paper_trend";
var toppList;

var influenceUrl="http://127.0.0.1/shinfo/public/api/output/inst_paper_impact";
var influenceList=new Array();

var icUrl="http://127.0.0.1/shinfo/public/api/output/inst_paper_co_author";
var icList;

var collegeTotal=new Array();
var collegeQ1=new Array();
var collegePercentage=new Array();

var collegeTopp1=new Array();
var collegeTopp2=new Array();
var collegeTopp3=new Array();

var collegeIc=new Array();

app.controller('controller', function($scope, $http) {

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
            for (var i = 0; i < 5; i++){
                console.log(collegeTotal[i]+"ok");
            }
        });

    $http.get(toppUrl)
        .success(function (response) {
            toppList = response;
            var year=2010;
            for (var i=0;i<6;i++){
                collegeTopp1[i]=toppList.college1.total[year];
                collegeTopp2[i]=toppList.college2.total[year];
                collegeTopp3[i]=toppList.college3.total[year];
                year++;
            }
            for (var i=0;i<6;i++){
                console.log(collegeTopp1[i]);
            }
            for (var i=0;i<6;i++){
                console.log(collegeTopp2[i]);
            }
            for (var i=0;i<6;i++){
                console.log(collegeTopp3[i]);
            }
        });

    $http.get(influenceUrl)
        .success(function (response) {
            influenceList = response;
            console.log(influenceList);
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
        });
});