@extends("layouts.funding")
@section("content")

    <script>
        $("#side_link").children().each(function () {
            $(this).removeClass("active");
            $(this).find("a").removeClass("btn-primary");
            $(this).find("div").addClass("collapse");
        });
        $("#side_link>li:nth-child(2) a").addClass("btn-primary text-white");
    </script>

    <!-- filter -->
    <div class="my-4">
        @include("filter.filter_funding")
    </div>

    <div class="row ml-1">
        @include("filter.filter_funding_body")
    </div>

    <!-- graph -->
    <div class="row mt-2">
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <!-- NIH -->
            <div>
                <div class="row mx-0 justify-content-between">
                    <div></div>
                    <div class="btn-group-sm mr-5">
                        <button class="btn btn-outline-primary" onclick="zoomChart('group-NIH')">放大</button>
                        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#groupNIHModal">显示数据表格</button>
                    </div>
                </div>
                <div id="group-NIH" class="mx-5 mb-5 c">
                    <div class="loading-container">
                        <div class="loading"></div>
                    </div>
                </div>
            </div>
            <!-- DOE -->
            <div>
                <div class="row mx-0 justify-content-between">
                    <div></div>
                    <div class="btn-group-sm mr-5">
                        <button class="btn btn-outline-primary" onclick="zoomChart('group-DOE')">放大</button>
                        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#groupDOEModal">显示数据表格</button>
                    </div>
                </div>
                <div id="group-DOE" class="mx-5 mb-5 c">
                    <div class="loading-container">
                        <div class="loading"></div>
                    </div>
                </div>
            </div>
            <!-- EC-ERC -->
            <div>
                <div class="row mx-0 justify-content-between">
                    <div></div>
                    <div class="btn-group-sm mr-5">
                        <button class="btn btn-outline-primary" onclick="zoomChart('group-ECERC')">放大</button>
                        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#groupECERCModal">显示数据表格</button>
                    </div>
                </div>
                <div id="group-ECERC" class="mx-5 mb-5 c">
                    <div class="loading-container">
                        <div class="loading"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <!-- DOD -->
            <div>
                <div class="row mx-0 justify-content-between">
                    <div></div>
                    <div class="btn-group-sm mr-5">
                        <button class="btn btn-outline-primary" onclick="zoomChart('group-DOD')">放大</button>
                        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#groupDODModal">显示数据表格</button>
                    </div>
                </div>
                <div id="group-DOD" class="mx-5 mb-5 c">
                    <div class="loading-container">
                        <div class="loading"></div>
                    </div>
                </div>
            </div>
            <!-- UKRI -->
            <div>
                <div class="row mx-0 justify-content-between">
                    <div></div>
                    <div class="btn-group-sm mr-5">
                        <button class="btn btn-outline-primary" onclick="zoomChart('group-UKRI')">放大</button>
                        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#groupUKRIModal">显示数据表格</button>
                    </div>
                </div>
                <div id="group-UKRI" class="mx-5 mb-5 c">
                    <div class="loading-container">
                        <div class="loading"></div>
                    </div>
                </div>
            </div>
            <!-- NASA -->
            <div>
                <div class="row mx-0 justify-content-between">
                    <div></div>
                    <div class="btn-group-sm mr-5">
                        <button class="btn btn-outline-primary" onclick="zoomChart('group-NASA')">放大</button>
                        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#groupNASAModal">显示数据表格</button>
                    </div>
                </div>
                <div id="group-NASA" class="mx-5 mb-5 c">
                    <div class="loading-container">
                        <div class="loading"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 弹框 -->
        <div class="modal fade" id="groupNIHModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle"></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body"></div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="groupDOEModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content" style="width: 1000px;">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle"></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body"></div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="groupECERCModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle"></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body"></div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="groupUKRIModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle"></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body"></div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="groupDODModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle"></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body"></div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="groupNASAModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle"></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body"></div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="{{URL::asset('js/funding/page_funding_group.js')}}"></script>
@stop