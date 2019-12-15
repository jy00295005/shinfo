<!DOCTYPE html>
<html lang="en">
<head>
    @include("includes.head")
</head>
<body ng-app="shinfo" ng-controller="controller">

<div class="container-fluid bg-white px-0">

    <nav class="navbar navbar-expand sticky-top justify-content-between py-2 navbar-customize">
        @include("includes.header")
    </nav>

    <div class="row">

        <div class="col-lg-2 col-xl-2 float-left pt-4 side-customize pr-0">
            @include('includes.sidebar_funding')
        </div>

        <div class="col-lg-10 col-xl-10">
            @yield('content')
        </div>

    </div>

</div>
</body>
</html>