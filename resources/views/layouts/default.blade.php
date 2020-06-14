<!DOCTYPE html>
<html lang="en">
<head>
    @include("includes.head")
</head>
<body ng-app="shinfo" ng-controller="controller">

<div class="container-fluid bg-white px-0">
    @include("includes.header")

    <div class="row col-12 px-0 mx-0">
        <div class="col-lg-2 col-xl-2 float-left pt-4 side-customize px-0">
            @include('sidebar.sidebar')
        </div>

        <div class="col-lg-10 col-xl-10">
            @yield('content')
        </div>
    </div>
</div>

</body>
</html>