@extends("layouts.default")
@section("content")
    <div class="row col-12 justify-content-between">
        <div class="form-group mt-3 col-3 col-sm-3 col-md-3 col-lg-2 col-xl-2 row">
            <strong>时间选择</strong>
            <select class="form-control" id="updateDate">
                <option ng-repeat="x in timeRange" value=@{{x}}>@{{x}}</option>
            </select>
        </div>

        <div class="form-group mt-3 col-3 col-sm-3 col-md-3 col-lg-2 col-xl-2 row">
            <strong>机构选择</strong>
            <select class="form-control" id="institution1">
                <option ng-repeat="x in universityName" value=@{{x}}>@{{x}}</option>
            </select>
        </div>

        <div class="form-group mt-3 col-4 col-sm-4 col-md-4 col-lg-3 col-xl-3 row">
            <strong>指标</strong>
            <select class="form-control" id="high_quality_paper">
                <option value="Q1">Q1文章数量</option>
                <option value="HQ">高被引论文数量</option>
                <option value="HOT">热点论文数量</option>
                <option value="CNS">CNS论文数量</option>
                <option value="H">H指数</option>
                <option value="CNCI">CNCI</option>
                <option value="COAU">国际合作数量</option>
                <option value="RF">对Research Front的贡献度</option>
            </select>
        </div>

        <div class="form-group mt-3 col-3 col-sm-3 col-md-3 col-lg-2 col-xl-2 row">
            <strong>机构选择</strong>
            <select class="form-control" id="institution2">
                <option ng-repeat="x in universityName" value=@{{x}}>@{{x}}</option>
            </select>
        </div>
    </div>

    <div class="form-check col-3">
        <input class="form-check-input" type="checkbox" value="" id="scale">
        <label class="form-check-label" for="scale">统一比例尺</label>
    </div>


    <div class="row mt-2">
        <div class="col-12">
            <div class="card card-body mr-2 p-0">
                <div class="ddbar col-12">
                    <div class="row">
                        <div class="element col-4 pl-0"></div>
                        <div class="col-3 mt-3">
                            <div class="mt-5 text-center rounded border mc-item" ng-repeat="x in dicipline">@{{x}}</div>
                        </div>
                        <div class="element col-4 pr-0"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="{{URL::asset('js/global/operation.js')}}"></script>
    <script src="{{URL::asset('js/research/page_multiple_comparison.js')}}"></script>
@stop