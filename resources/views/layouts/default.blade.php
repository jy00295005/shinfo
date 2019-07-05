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

        <div class="col float-left pt-4 side-customize pr-0">
            @include('includes.sidebar')
        </div>

        <div class="col-10">
            @yield('content')
        </div>

    </div>

</div>
<script src="{{URL::asset('js/getdata.js')}}"></script>
</body>
</html>