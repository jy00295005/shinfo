@extends("layouts.default")
@section("content")

    <script>
        $("#side_link").children().each(function () {
            $(this).removeClass("active");
            $(this).find("a").removeClass("btn-primary");
            $(this).find("div").addClass("collapse");
        });
        $("#side_link>li:nth-child(5) a").addClass("btn-primary text-white");
    </script>

    <div class="btn-toolbar my-4 justify-content-between">
        @include("includes.filter")
    </div>

    <div class="row ml-1">
        @include("includes.filter_body")
    </div>

    <div class="row mt-2">
        <div class="col-11">
            <div class="card card-body">
                <div class="ddbar col-12">
                    <div class="row">
                        <div class="element col-4"></div>
                        <div class="col-4">
                            <div class="form-group mt-5">
                                <select class="form-control" id="formControlSelect1">
                                    <option>Operational Research and Cybernetics</option>
                                    <option>Applied mathematics</option>
                                    <option>Probability and Mathematical Statistics</option>
                                    <option>Computational Mathematics</option>
                                    <option>Fundamental Mathematics</option>
                                </select>
                            </div>
                            <div class="form-group mt-4">
                                <select class="form-control" id="formControlSelect2">
                                    <option>Operational Research and Cybernetics</option>
                                    <option>Applied mathematics</option>
                                    <option>Probability and Mathematical Statistics</option>
                                    <option>Computational Mathematics</option>
                                    <option>Fundamental Mathematics</option>
                                </select>
                            </div>
                            <div class="form-group mt-4">
                                <select class="form-control" id="formControlSelect3">
                                    <option>Operational Research and Cybernetics</option>
                                    <option>Applied mathematics</option>
                                    <option>Probability and Mathematical Statistics</option>
                                    <option>Computational Mathematics</option>
                                    <option>Fundamental Mathematics</option>
                                </select>
                            </div>
                            <div class="form-group mt-4">
                                <select class="form-control" id="formControlSelect4">
                                    <option>Operational Research and Cybernetics</option>
                                    <option>Applied mathematics</option>
                                    <option>Probability and Mathematical Statistics</option>
                                    <option>Computational Mathematics</option>
                                    <option>Fundamental Mathematics</option>
                                </select>
                            </div>
                            <div class="form-group mt-4">
                                <select class="form-control" id="formControlSelect5">
                                    <option>Operational Research and Cybernetics</option>
                                    <option>Applied mathematics</option>
                                    <option>Probability and Mathematical Statistics</option>
                                    <option>Computational Mathematics</option>
                                    <option>Fundamental Mathematics</option>
                                </select>
                            </div>
                        </div>
                        <div class="element col-4"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop