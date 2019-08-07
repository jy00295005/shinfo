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

    <div class="btn-toolbar my-4">
        @include("includes.filter")
    </div>

    <div class="row ml-1">
        @include("includes.filter_body")
    </div>

    <div class="row mt-2">
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <div>
                <div class="row mx-0 justify-content-between">
                    <div></div>
                    <div class="btn-group-sm mr-5">
                        <button class="btn btn-outline-primary" onclick="zoomChart('q1')">放大</button>
                        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#q1Modal">显示数据表格</button>
                    </div>
                </div>
                <div id="q1" class="mx-5 mb-5 c">
                    <div class="loading-container">
                        <div class="loading"></div>
                    </div>
                </div>
            </div>
            <div>
                <div class="row mx-0 justify-content-between">
                    <div></div>
                    <div class="btn-group-sm mr-5">
                        <button class="btn btn-outline-primary" onclick="zoomChart('hot')">放大</button>
                        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#hotModal">显示数据表格</button>
                    </div>
                </div>
                <div id="hot" class="mx-5 mb-5 c">
                    <div class="loading-container">
                        <div class="loading"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <div>
                <div class="row mx-0 justify-content-between">
                    <div></div>
                    <div class="btn-group-sm mr-5">
                        <button class="btn btn-outline-primary" onclick="zoomChart('hq')">放大</button>
                        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#hqModal">显示数据表格</button>
                    </div>
                </div>
                <div id="hq" class="mx-5 mb-5 c">
                    <div class="loading-container">
                        <div class="loading"></div>
                    </div>
                </div>
            </div>
            <div>
                <div class="row mx-0 justify-content-between">
                    <div></div>
                    <div class="btn-group-sm mr-5">
                        <button class="btn btn-outline-primary" onclick="zoomChart('cns')">放大</button>
                        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#cnsModal">显示数据表格</button>
                    </div>
                </div>
                <div id="cns" class="mx-5 mb-5 c">
                    <div class="loading-container">
                        <div class="loading"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{URL::asset('js/operation.js')}}"></script>
    <script src="{{URL::asset('js/page_subject_analyzing.js')}}"></script>
@stop
