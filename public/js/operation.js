function zoomChart(c){ // 放大图表
    var element="#"+c;
    $(".c").parent().each(function () {
        $(this).addClass("display-none");
    });
    $(element).parent().removeClass("display-none");
    $(element).addClass("zoom");
    $(element).prepend("<button class='btn-sm btn-danger closeB' style='position: relative; float: right' onclick='closeF()'>关闭</button>");
    $(element).highcharts().reflow();
}

function closeF(){ // 关闭浮层
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

var ischecked1=true;
var ischecked2=true;
function checkAll(e){ // 全选
    var element=$(e);
    if (e=="#all1"){
        element.checked=ischecked1;
    } else{
        element.checked=ischecked2;
    }

    if (element.checked){
        element.parent().parent().parent().find("input").each(function () {
            $(this).attr("checked", true);
        });
        if (e=="#all1"){
            ischecked1=false;
        } else{
            ischecked2=false;
        }
    } else{
        element.parent().parent().parent().find("input").each(function () {
            $(this).attr("checked", false);
        });
        if (e=="#all1"){
            ischecked1=true;
        } else{
            ischecked2=true;
        }
    }
}