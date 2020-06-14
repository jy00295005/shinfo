function zoomChart(c){ // 放大图表
    let element="#"+c;
    $(".c").parent().each(function () {
        $(this).addClass("display-none");
    });
    $(element).parent().removeClass("display-none");
    $(element).addClass("zoom");
    // $(element).prepend("<button class='btn-sm btn-danger close-button' style='position: relative; float: right' onclick='closeFloat()'>关闭</button>");
    $(element).prepend("<button class='btn-sm btn-danger close-button' style='position: relative; margin: 3px;' onclick='closeFloat()'>关闭</button>");
    $(element).highcharts().reflow();
}

function closeFloat(){ // 关闭浮层
    $(".c").parent().each(function () {
        $(this).removeClass("display-none");
    });
    $(".c").each(function () {
        $(this).removeClass("zoom");
    });
    $(".c").each(function () {
        $(this).highcharts().reflow();
    });
    $(".close-button").remove();
}

// 全选操作

let isChecked1=true;
let isChecked2=true;

function checkAll(e){
    let element=$(e);
    if (e=="#all1"){
        element.checked=isChecked1;
    } else{
        element.checked=isChecked2;
    }

    if (element.checked){
        element.parent().parent().parent().find("input").each(function () {
            // $(this).attr("checked", true);
            $(this)[0].checked=true;
        });
        if (e=="#all1"){
            isChecked1=false;
        } else{
            isChecked2=false;
        }
    } else{
        element.parent().parent().parent().find("input").each(function () {
            // $(this).attr("checked", false);
            $(this)[0].checked=false;
        });
        if (e=="#all1"){
            isChecked1=true;
        } else{
            isChecked2=true;
        }
    }
}

// 改变Sidebar链接颜色
function changeSidebarLink(position){
    $("#side_link").children().each(function () {
        $(this).removeClass("active");
        $(this).find("a").removeClass("btn-primary");
        $(this).find("div").addClass("collapse");
    });
    let query="#side_link>li:nth-child("+position+") a";
    $(query).addClass("btn-primary text-white");
}

// 改变Navbar链接颜色
function changeNavbarLink(position){
    $(".nav-links").children().each(function () {
        $(this).css("color","#cccccc");
    });
    let query=".nav-links>a:nth-child("+position+")";
    $(query).css("color","#ffffff");
}

// 隐藏筛选
try {
    $(".btn-customize button")[1].onclick = function () {
        $("#filter_body").collapse('hide');
    };
} catch (e) {
    console.error("未找到筛选功能");
}