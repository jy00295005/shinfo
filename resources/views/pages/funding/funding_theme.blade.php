@extends("layouts.funding")
@section("content")

    <script>
        $("#side_link").children().each(function () {
            $(this).removeClass("active");
            $(this).find("a").removeClass("btn-primary");
            $(this).find("div").addClass("collapse");
        });
        $("#side_link>li:nth-child(4)>a").addClass("btn-primary text-white");
    </script>

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
            <!-- funding year -->
            @include("includes.chart", ["id"=>"fund-year", "modal"=>"fundYear"])
            <!-- funding country -->
            @include("includes.chart", ["id"=>"fund-country", "modal"=>"fundCountry"])
            <!-- research org -->
            @include("includes.chart_num", ["id"=>"research-org", "modal"=>"researchOrg"])
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <!-- funding cate -->
            @include("includes.chart", ["id"=>"fund-cate", "modal"=>"fundCate"])
            <!-- funding funderGroup -->
            @include("includes.chart", ["id"=>"fund-group", "modal"=>"fundGroup"])
            <!-- funding_researcher -->
            @include("includes.chart_num", ["id"=>"fund-researcher", "modal"=>"fundResearcher"])
        </div>
    </div>

    <script src="{{URL::asset('js/global/operation.js')}}"></script>
    <script src="{{URL::asset('js/funding/page_funding_theme.js')}}"></script>
@stop