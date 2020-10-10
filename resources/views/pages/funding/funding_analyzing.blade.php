@extends("layouts.funding")
@section("content")
    <script src="{{URL::asset('js/d3.v4.min.js')}}"></script>

    <div class="row col-12">
        <div class="form-group mt-3 col-3 col-sm-3 col-md-3 col-lg-2 col-xl-2 row">
            <strong>机构选择</strong>
            <select class="form-control" id="org">
                <option ng-repeat="x in orgName" value=@{{x}}>@{{x}}</option>
            </select>
        </div>

        <div class="form-group mt-3 ml-2 col-3 col-sm-3 col-md-3 col-lg-2 col-xl-2 row">
            <strong>领域选择</strong>
            <select class="form-control" id="field">
                <option value="Physical Science & Technology">Physical Science & Technology</option>
            </select>
        </div>
    </div>

    <div class="row mt-1 ml-1 mr-1" id="cooo">
        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="col-12">
                <div class="btn-group btn-group-sm" role="group">
                    <button type="button" class="btn btn-primary" ng-click="weight(0)">Weight</button>
                    <button type="button" class="btn btn-outline-primary" ng-click="weight(0)">默认</button>
                    <button type="button" class="btn btn-outline-primary" ng-click="weight(1)">1</button>
                    <button type="button" class="btn btn-outline-primary" ng-click="weight(2)">2</button>
                    <button type="button" class="btn btn-outline-primary" ng-click="weight(3)">3</button>
                    <button type="button" class="btn btn-outline-primary" ng-click="weight(4)">4</button>
                    <button type="button" class="btn btn-outline-primary" ng-click="weight(5)">5</button>
                </div>
                <div class="btn-group float-right">
                    <button type="button" class="btn btn-sm btn-outline-secondary" ng-click="zoomUp()">放大</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary" ng-click="zoomDown()">缩小</button>
                </div>
            </div>

            <div>
                <svg id="coo" class="mb-5 c col-11" height="1000"></svg>
            </div>
        </div>
    </div>

    <script src="{{URL::asset('js/global/operation.js')}}"></script>
    <script src="{{URL::asset('js/funding/page_funding_analyzing.js')}}"></script>
@stop
