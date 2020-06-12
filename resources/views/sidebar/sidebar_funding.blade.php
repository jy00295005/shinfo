<nav class="nav nav-fill flex-column" id="side_link">
    <li class="nav-item active col-12 p-0">
        <a href="{{URL('platform/research_projects')}}" class="nav-item btn btn-primary btn-block">科研项目情况</a>
    </li>

    <li class="nav-item col-12 p-0">
        <a href="{{URL('platform/funding_group')}}" class="nav-item btn btn-block">资助机构及强度</a>
    </li>

    <li class="nav-item col-12 p-0">
        <a class="nav-item btn btn-block" href="{{URL('platform/funding_analyzing')}}">资助主题分布</a>
    </li>

    <li class="nav-item col-12 p-0">
        <a class="nav-item btn btn-block" href="{{URL('platform/funding_theme')}}">各主题项目概况</a>
        <ul class="nav nav-fill flex-column">
            <li class="nav-item" ng-repeat="x in topics">
                <a href="#" class="nav-link topic" ng-click="chooseTopic(x)">@{{x}}</a>
            </li>
        </ul>
    </li>

    <li class="nav-item col-12 p-0">
        <a class="nav-item btn btn-block disabled" href="{{URL('platform')}}">多项对比</a>
    </li>
</nav>