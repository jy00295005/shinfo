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

    <div class="btn-toolbar my-4">
        @include("includes.filter")
    </div>

    <div class="row ml-1">
        @include("includes.filter_body")
    </div>

    <div class="row mt-2">
        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div>
                <svg id="coo" class="mx-5 mb-5 c col-11" height="1000">
{{--                    <div class="loading-container">--}}
{{--                        <div class="loading"></div>--}}
{{--                    </div>--}}
                </svg>
            </div>
        </div>
    </div>
    <script src="{{URL::asset('js/operation.js')}}"></script>
    <script src="{{URL::asset('js/page_subject_analyzing.js')}}"></script>
@stop
