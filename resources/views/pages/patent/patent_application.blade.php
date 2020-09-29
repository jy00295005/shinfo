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
            <!-- 专利申请及公开趋势 -->
            @include("includes.chart", ["id"=>"apply-public", "modal"=>"applyPublic"])
            <!-- 专利权人分布 -->
            @include("includes.chart", ["id"=>"patentees", "modal"=>"patentees"])
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <!-- 申请国家/地区 -->
            @include("includes.chart", ["id"=>"country-area", "modal"=>"countryArea"])
            <!-- IPC技术构成 -->
            @include("includes.chart", ["id"=>"ipc-tech", "modal"=>"ipcTech"])
        </div>
    </div>

    <script src="{{URL::asset('js/global/operation.js')}}"></script>
    <script src="{{URL::asset('js/patent/page_patent_application.js')}}"></script>
@stop