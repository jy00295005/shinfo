@extends("layouts.default")
@section("content")
    <div class="row mt-2">
        <div class="col-10 m-auto pt-2">
            <div class="row justify-content-between">
                <h4 id="typeTitle" class="mt-2"></h4>
                <button type="button" class="btn btn-outline-secondary my-auto" id="sortButton" ng-click="changeSort()">按出版年份排序</button>
            </div>
            <div class="loading-container">
                <div class="loading"></div>
                <h5>&nbsp;正在加载中......</h5>
            </div>
            <div id="loaded">
                <div class="list-group mt-2">
                    <div class="list-group-item list-group-item-action flex-column align-items-start" ng-repeat="x in list">
                        <div class="d-flex justify-content-between align-items-center">
                            <p>@{{x.paperTitle}}</p>
                            <span class="badge badge-primary badge-pill">@{{x.citation}}</span>
                        </div>
                        <small><strong>机构：</strong>@{{x.dis_uni_name}} &nbsp;<strong>出版年份：</strong>@{{x.pubYear}} &nbsp;<strong>ID:</strong> @{{x.paperID}}</small>
                    </div>
                </div>

                <nav aria-label="Page navigation example" class="mt-3">
                    <ul class="pagination justify-content-center">
                        <li class="page-item disabled" id="prePage">
                            <a class="page-link" href="#" tabindex="-1" ng-click="pageTurning('pre')">上一页</a>
                        </li>
                        <li class="page-item" id="prePage">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" id="jumpPage" placeholder="">
                                <div class="input-group-append">
                                    <a href="#" class="page-link" id="jumpButton" ng-click="jumpPage()">跳转</a>
                                </div>
                            </div>
                        </li>
                        <li class="page-item" id="nextPage">
                            <a class="page-link" href="#" ng-click="pageTurning('next')">下一页</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
    <script src="{{URL::asset('js/research/page_list.js')}}"></script>
@stop