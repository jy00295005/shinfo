<!-- change nav bar text color -->
<script>
    $(".nav-top").children().each(function () {
        $(this).removeClass("active");
        $(this).find("a").css("color","#cccccc");
    });
    $(".nav-top>li:nth-child(3) a").css("color","#ffffff");
</script>

<div class="btn-group btn-customize mx-2">
    <button type="button" class="btn btn-primary" data-toggle="collapse" data-target="#filter_body" role="button" aria-expanded="false" aria-controls="collapseExample">筛选 &rsaquo;</button>
    <button class="btn btn-success" ng-click="updateFilter()">确定</button>
</div>

<div class="row mx-2 info-display">
    <p class="mx-1 my-1"><strong>领域: </strong><span></span></p>
</div>
