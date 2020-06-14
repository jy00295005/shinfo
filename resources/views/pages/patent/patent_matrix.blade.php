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
            <!-- 技术市场&活跃期 -->
            @include("includes.chart", ["id"=>"cvy", "modal"=>"cvy"])
            <!-- 专利权人&活跃期 -->
            @include("includes.chart", ["id"=>"avs", "modal"=>"avs"])
            <!-- 技术发展趋势 -->
            @include("includes.chart", ["id"=>"ivy", "modal"=>"ivy"])
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <!-- 技术市场&技术分布 -->
            @include("includes.chart", ["id"=>"cvi", "modal"=>"cvi"])
            <!-- 专利权人&技术分布 -->
            @include("includes.chart", ["id"=>"avi", "modal"=>"avi"])
        </div>
    </div>

    <script src="{{URL::asset('js/global/operation.js')}}"></script>
    <script src="{{URL::asset('js/patent/page_patent_matrix.js')}}"></script>
@stop