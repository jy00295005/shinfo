var app = angular.module('shinfo', []);

app.controller('controller', function($scope, $http) {

    var updateDate="2019-06-20";
    var university=localStorage.getItem("uni");
    var dicipline=localStorage.getItem("cate");
    var type=localStorage.getItem("type");
    var typee=type;

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

    $("#jumpPage").attr("placeholder","1");

    var limit=30;
    var offset=0;
    var pageNum=1;
    var url="http://127.0.0.1/shinfo/public/api/output/lists/"+type+"/"+updateDate+"/"+university+"/"+dicipline+"/all/"+limit+"/"+offset;
    console.log(url);
    $scope.getList=function(){
        $http.get(url)
            .success(function (response) {
                // console.log(response);
                $scope.list=[];
                $scope.count=response.count;
                $("#typeTitle")[0].innerHTML=typee+"  机构: "+university+"  共"+$scope.count+"条";
                for(var i=0;i<response.list.length;i++){
                    $scope.list.push(response.list[i]);
                }
                $scope.page=Math.ceil($scope.count/limit);
                console.log("共 "+$scope.page+"页");
            });
    }
    $scope.getList();

     $scope.pageTurning=function(e){
         // var lastPage=parseInt($("#lastPage")[0].innerHTML);
         if(e=="next"){
             offset+=limit;
             pageNum++;
         }
         else if(e=="pre"){
             offset-=limit;
             pageNum--;
             // $("#lastPage").parent().removeClass("active");
         }
         // else if(e=="end"){
         //     offset=limit*(lastPage-1);
         //     pageNum=lastPage;
         // }else{
         //     offset=limit*(e-1);
         //     pageNum=e;
         // }
         url="http://127.0.0.1/shinfo/public/api/output/lists/"+type+"/"+updateDate+"/"+university+"/"+dicipline+"/all/"+limit+"/"+offset;
         console.log(url);
         $scope.getList();
         console.log("页码："+pageNum);
         $("#jumpPage").val(pageNum);
         // $scope.changePageList();
    }

    $scope.changePageList=function(){
         if(pageNum==1){
             $("#prePage").addClass("disabled");
         }else{
             $("#prePage").removeClass("disabled");
         }
         if(pageNum==parseInt($("#lastPage")[0].innerHTML)){
             $("#nextPage").addClass("disabled");
             $("#lastPage").parent().addClass("active");
         }else{
             $("#nextPage").removeClass("disabled");
         }

         var pId="#p"+pageNum;
         if($(pId)[0]==undefined){
            var f=$("#p li").eq(0).children()[0].innerHTML;
            if(pageNum==parseInt($("#lastPage")[0].innerHTML)){
                var f4=parseInt(pageNum)-4;
                var f5=parseInt(pageNum)-3;
                var f6=parseInt(pageNum)-2;
                var f7=parseInt(pageNum)-1;
                $("#p")[0].innerHTML="<li class=\"page-item\" id=\"p"+f4+"\"><a class=\"page-link\" href=\"#\" ng-click=\"pageTurning("+f4+")\">"+f4+"</a></li>\n" +
                    "                        <li class=\"page-item\" id=\"p"+f5+"\"><a class=\"page-link\" href=\"#\" ng-click=\"pageTurning("+f5+")\">"+f5+"</a></li>\n" +
                    "                        <li class=\"page-item\" id=\"p"+f6+"\"><a class=\"page-link\" href=\"#\" ng-click=\"pageTurning("+f6+")\">"+f6+"</a></li>\n" +
                    "                        <li class=\"page-item\" id=\"p"+f7+"\"><a class=\"page-link\" href=\"#\" ng-click=\"pageTurning("+f7+")\">"+f7+"</a></li>";
            }
            else if(parseInt(pageNum)>parseInt(f)){
                var f4=parseInt(f)+4;
                var f5=parseInt(f)+5;
                var f6=parseInt(f)+6;
                var f7=parseInt(f)+7;
                $("#p")[0].innerHTML="<li class=\"page-item active\" id=\"p"+f4+"\"><a class=\"page-link\" href=\"#\" ng-click=\"pageTurning("+f4+")\">"+f4+"</a></li>\n" +
                    "                        <li class=\"page-item\" id=\"p"+f5+"\"><a class=\"page-link\" href=\"#\" ng-click=\"pageTurning("+f5+")\">"+f5+"</a></li>\n" +
                    "                        <li class=\"page-item\" id=\"p"+f6+"\"><a class=\"page-link\" href=\"#\" ng-click=\"pageTurning("+f6+")\">"+f6+"</a></li>\n" +
                    "                        <li class=\"page-item\" id=\"p"+f7+"\"><a class=\"page-link\" href=\"#\" ng-click=\"pageTurning("+f7+")\">"+f7+"</a></li>";
            }else{
                var f=$("#p li").eq(3).children()[0].innerHTML;
                var f4=parseInt(f)-7;
                var f5=parseInt(f)-6;
                var f6=parseInt(f)-5;
                var f7=parseInt(f)-4;
                $("#p")[0].innerHTML="<li class=\"page-item\" id=\"p"+f4+"\"><a class=\"page-link\" href=\"#\" ng-click=\"pageTurning("+f4+")\">"+f4+"</a></li>\n" +
                    "                        <li class=\"page-item\" id=\"p"+f5+"\"><a class=\"page-link\" href=\"#\" ng-click=\"pageTurning("+f5+")\">"+f5+"</a></li>\n" +
                    "                        <li class=\"page-item\" id=\"p"+f6+"\"><a class=\"page-link\" href=\"#\" ng-click=\"pageTurning("+f6+")\">"+f6+"</a></li>\n" +
                    "                        <li class=\"page-item active\" id=\"p"+f7+"\"><a class=\"page-link\" href=\"#\" ng-click=\"pageTurning("+f7+")\">"+f7+"</a></li>";
            }
         }else{
             $(pId).siblings().removeClass("active");
             $(pId).addClass("active");
         }

    }
    $scope.jumpPage=function () {
        pageNum=$("#jumpPage").val();
        offset=limit*(pageNum-1);
        url="http://127.0.0.1/shinfo/public/api/output/lists/"+type+"/"+updateDate+"/"+university+"/"+dicipline+"/all/"+limit+"/"+offset;
        $scope.getList();
    }

});