@extends("layouts.funding")
@section("content")
    <!-- filter -->
    <div class="my-4">
        @include("filter.filter_funding")
    </div>

    <div class="row ml-1">
        @include("filter.filter_funding_body")
    </div>

    <!-- graph -->
    <div class="row mt-2">
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <!-- NIH -->
            @include("includes.chart_num", ["id"=>"group-NIH", "modal"=>"groupNIH"])
            <!-- DOE -->
            @include("includes.chart_num", ["id"=>"group-DOE", "modal"=>"groupDOE"])
            <!-- EC-ERC -->
            @include("includes.chart_num", ["id"=>"group-ECERC", "modal"=>"groupECERC"])
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <!-- DOD -->
            @include("includes.chart_num", ["id"=>"group-DOD", "modal"=>"groupDOD"])
            <!-- UKRI -->
            @include("includes.chart_num", ["id"=>"group-UKRI", "modal"=>"groupUKRI"])
            <!-- NASA -->
            @include("includes.chart_num", ["id"=>"group-NASA", "modal"=>"groupNASA"])
        </div>
    </div>

    <script src="{{URL::asset('js/global/operation.js')}}"></script>
    <script src="{{URL::asset('js/funding/page_funding_group.js')}}"></script>
@stop