@extends("layouts.patent")
@section("content")
    <!-- filter -->
    <div class="my-4">
        @include("filter.filter_patent")
    </div>

    <div class="row ml-1">
        @include("filter.filter_patent_body")
    </div>

    <!-- graph -->
    <div class="row mt-2">
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <!-- 专利权人&关键技术 -->
            @include("includes.chart", ["id"=>"avi", "modal"=>"avi"])
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <!-- 关键技术VS申请年 -->
            @include("includes.chart", ["id"=>"kvy", "modal"=>"kvy"])
        </div>
    </div>

    <script src="{{URL::asset('js/global/operation.js')}}"></script>
    <script src="{{URL::asset('js/patent/page_patent_theme.js')}}"></script>
@stop