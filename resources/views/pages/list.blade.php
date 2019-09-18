@extends("layouts.default")
@section("content")
    <div class="row mt-2">
        <div class="col-10 m-auto pt-2">
            <h4 id="typeTitle"></h4>
            <div class="list-group mt-1">
                <div class="list-group-item list-group-item-action flex-column align-items-start" ng-repeat="x in list">
                    <div class="d-flex justify-content-between align-items-center">
                        <p>@{{x.paperTitle}}</p>
                        <span class="badge badge-primary badge-pill">@{{x.citation}}</span>
                    </div>
                    <small><strong>机构：</strong>@{{x.dis_uni_name}} &nbsp;<strong>出版年份：</strong>@{{x.pubYear}} &nbsp;<strong>ID:</strong> @{{x.paperID}}</small>
                </div>
            </div>
        </div>
    </div>
    <script src="{{URL::asset('js/page_list.js')}}"></script>
@stop