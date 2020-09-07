@extends("layouts.default")
@section("content")
    <div class="my-4">
        @include("filter.filter")
    </div>

    <div class="row ml-1">
        @include("filter.filter_body")
    </div>

    <div class="row mt-2">
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            @include("includes.chart", ["id"=>"nopp", "modal"=>"nopp"])
            @include("includes.chart", ["id"=>"q1", "modal"=>"q1"])
            @include("includes.chart", ["id"=>"hq", "modal"=>"hq"])
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            @include("includes.chart", ["id"=>"topp", "modal"=>"topp"])
            @include("includes.chart", ["id"=>"hot", "modal"=>"hot"])
            @include("includes.chart", ["id"=>"cns", "modal"=>"cns"])
        </div>
    </div>
    <script src="{{URL::asset('js/global/operation.js')}}"></script>
    <script src="{{URL::asset('js/research/page_influence.js')}}"></script>
@stop
