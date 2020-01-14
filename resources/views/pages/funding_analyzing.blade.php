@extends("layouts.funding")
@section("content")

    <script>
        $("#side_link").children().each(function () {
            $(this).removeClass("active");
            $(this).find("a").removeClass("btn-primary");
            $(this).find("div").addClass("collapse");
        });
        $("#side_link>li:nth-child(3) a").addClass("btn-primary text-white");
    </script>

    <!-- change nav bar text color -->
    <script>
        $(".nav-top").children().each(function () {
            $(this).removeClass("active");
            $(this).find("a").css("color","#cccccc");
        });
        $(".nav-top>li:nth-child(2) a").css("color","#ffffff");
    </script>

    <script src="{{URL::asset('js/d3.v4.min.js')}}"></script>

    <div class="row col-12">
        <div class="form-group mt-3 ml-4 col-3 col-sm-3 col-md-3 col-lg-2 col-xl-2 row">
            <strong>机构选择</strong>
            <select class="form-control" id="org">
                <option ng-repeat="x in orgName" value=@{{x}}>@{{x}}</option>
            </select>
        </div>

        <div class="form-group mt-3 ml-2 col-3 col-sm-3 col-md-3 col-lg-2 col-xl-2 row">
            <strong>领域选择</strong>
            <select class="form-control" id="field">
                <option value="Physical Science & Technology">Physical Science & Technology</option>
            </select>
        </div>
    </div>

    <div class="row mt-2">
        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div>
                <svg id="coo" class="mx-4 mb-5 c col-11" height="1000"></svg>
            </div>
        </div>
    </div>
    <script src="{{URL::asset('js/page_funding_analyzing.js')}}"></script>
@stop
