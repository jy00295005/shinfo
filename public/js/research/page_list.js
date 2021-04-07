var app = angular.module('shinfo', []);

app.controller('controller', function($scope, $http) {

    let updateDate="2019-06-20";
    if(localStorage.getItem("research_updateDate") != null){
        updateDate = localStorage.getItem("research_updateDate");
    }

    var university=localStorage.getItem("uni");
    var dicipline=localStorage.getItem("cate");

    var type="";
    var typee="";
    var url="";
    var keyWord="";

    var limit=30;
    var offset=0;
    var pageNum=1;
    var sort="citation";
    var year="all";

    var isForceDirectedGraph=localStorage.getItem("ifdg");

    if(isForceDirectedGraph=="true"){
        keyWord=localStorage.getItem("keyWord");
        url="/shinfo/public/api/output/paper_kw_lists/"+updateDate+"/"+university+"/"+dicipline+"/"+keyWord+"/"+limit+"/"+offset+"/"+sort;
    }else{
        type=localStorage.getItem("type");
        typee=type;

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
            case "发文总量":
                type="inst_paper_count";
                break
            case "年发文趋势":
                type="inst_paper_trend";
                year=localStorage.getItem("year");
                break
        }

        url="/shinfo/public/api/output/lists/"+type+"/"+updateDate+"/"+university+"/"+dicipline+"/"+year+"/"+limit+"/"+offset+"/"+sort;
        console.log(url)
    }

    $("#jumpPage").attr("placeholder","1");

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
                $("#loaded").css("display","block");
                $(".loading-container").css("display","none");
            });
    }
    $scope.getList();

    $scope.pageTurning=function(e){
         if(e=="next"){
             offset+=limit;
             pageNum++;
         }else if(e=="pre"){
             offset-=limit;
             pageNum--;
         }

         if(isForceDirectedGraph=="true"){
             url="/shinfo/public/api/output/paper_kw_lists/"+updateDate+"/"+university+"/"+dicipline+"/"+keyWord+"/"+limit+"/"+offset+"/"+sort;
         }else{
             url="/shinfo/public/api/output/lists/"+type+"/"+updateDate+"/"+university+"/"+dicipline+"/"+year+"/"+limit+"/"+offset+"/"+sort;
         }

         console.log(url);
         $("#loaded").css("display","none");
         $(".loading-container").css("display","flex");
         $scope.getList();
         console.log("页码："+pageNum);
         $("#jumpPage").val(pageNum);
         $scope.changePageList();
    }

    $scope.changePageList=function(){
         if(pageNum==1){
             $("#prePage").addClass("disabled");
         }else{
             $("#prePage").removeClass("disabled");
         }

         if(pageNum==$scope.page){
             $("#nextPage").addClass("disabled");
             $("#lastPage").parent().addClass("active");
         }else{
             $("#nextPage").removeClass("disabled");
         }
    }

    $scope.jumpPage=function () {
        pageNum=$("#jumpPage").val();
        offset=limit*(pageNum-1);

        if(isForceDirectedGraph=="true"){
            url="/shinfo/public/api/output/paper_kw_lists/"+updateDate+"/"+university+"/"+dicipline+"/"+keyWord+"/"+limit+"/"+offset+"/"+sort;
        }else{
            url="/shinfo/public/api/output/lists/"+type+"/"+updateDate+"/"+university+"/"+dicipline+"/"+year+"/"+limit+"/"+offset+"/"+sort;
        }

        $("#loaded").css("display","none");
        $(".loading-container").css("display","flex");

        $scope.getList();
        $scope.changePageList();
    }

    $scope.changeSort=function () {
        console.log(sort);
        if(sort=="citation"){
            console.log(1);
            sort="pubYear";
            $("#sortButton")[0].innerHTML="按被引用次数排序";
        }else if(sort=="pubYear"){
            console.log(2);
            sort="citation";
            $("#sortButton")[0].innerHTML="按出版年份排序";
        }

        if(isForceDirectedGraph=="true"){
            url="/shinfo/public/api/output/paper_kw_lists/"+updateDate+"/"+university+"/"+dicipline+"/"+keyWord+"/"+limit+"/"+offset+"/"+sort;
        }else{
            url="/shinfo/public/api/output/lists/"+type+"/"+updateDate+"/"+university+"/"+dicipline+"/"+year+"/"+limit+"/"+offset+"/"+sort;
        }

        $("#loaded").css("display","none");
        $(".loading-container").css("display","flex");

        $scope.getList();
    }

});