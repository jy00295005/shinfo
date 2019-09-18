var app = angular.module('shinfo', []);

app.controller('controller', function($scope, $http) {

    var updateDate="2019-06-20";
    var university=localStorage.getItem("uni");
    var dicipline=localStorage.getItem("cate");
    var type=localStorage.getItem("type");
    var typee=type;

    $("#typeTitle")[0].innerHTML=typee;

    switch (type) {
        case "Q1文章数量":
            type="Q1";
            break
        case "高被引论文数量":
            type="HQ";
            break
        case "热点论文数量":
            type="HOT";
            break
        case "CNS论文数量":
            type="CNS";
            break
    }

    var url="http://127.0.0.1/shinfo/public/api/output/lists/"+type+"/"+updateDate+"/"+university+"/"+dicipline+"/all/10";
    $scope.getList=function(){
        $http.get(url)
            .success(function (response) {
                console.log(response);
                $scope.list=[];
                for(var i=0;i<response.list.length;i++){
                    $scope.list.push(response.list[i]);
                }
            });
    }
    $scope.getList();
});