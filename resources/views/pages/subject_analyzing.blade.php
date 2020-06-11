@extends("layouts.default")
@section("content")

    <script>
        $("#side_link").children().each(function () {
            $(this).removeClass("active");
            $(this).find("a").removeClass("btn-primary");
            $(this).find("div").addClass("collapse");
        });
        $("#side_link>li:nth-child(3) a").addClass("btn-primary text-white");
    </script>

    <script src="{{URL::asset('js/d3.v4.min.js')}}"></script>

    <div class="row col-12">
        <div class="form-group mt-3 col-3 col-sm-3 col-md-3 col-lg-2 col-xl-2 row">
            <strong>机构选择</strong>
            <select class="form-control" id="institution">
                <option ng-repeat="x in universityName" value=@{{x}}>@{{x}}</option>
            </select>
        </div>

        <div class="form-group mt-3 ml-2 col-3 col-sm-3 col-md-3 col-lg-2 col-xl-2 row">
            <strong>学科选择</strong>
            <select class="form-control" id="dicipline">
                <option ng-repeat="x in dicipline" value=@{{x}}>@{{x}}</option>
            </select>
        </div>
    </div>

    <div class="row mt-1 ml-1 mr-1" id="cooo">
        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="btn-group mb-2 mt-2">
                <button type="button" class="btn btn-sm btn-outline-secondary" ng-click="zoomUp()">放大</button>
                <button type="button" class="btn btn-sm btn-outline-secondary" ng-click="zoomDown()">缩小</button>
            </div>
            <div>
                <svg id="coo" class="mx-4 mb-5 c col-11" height="1000">
{{--                    <div class="loading-container">--}}
{{--                        <div class="loading"></div>--}}
{{--                    </div>--}}
                </svg>
            </div>
        </div>
    </div>
    <script src="{{URL::asset('js/page_subject_analyzing.js')}}"></script>
@stop
