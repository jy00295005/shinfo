@extends("layouts.default")
@section("content")
    <div class="my-4">
        @include("filter.filter")
    </div>

    <div class="row ml-1">
        @include("filter.filter_body")
    </div>

    <div class="row mt-2">
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <div>
                <div class="row mx-0 justify-content-between">
                    <div></div>
                    <div class="btn-group-sm mr-5">
                        <button class="btn btn-outline-primary" onclick="zoomChart('nopp')">放大</button>
                        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#noppModal">显示数据表格</button>
                    </div>
                </div>
                <div id="nopp" class="mx-5 mb-5 c">
                    <div class="loading-container">
                        <div class="loading"></div>
                    </div>
                </div>
            </div>
            <div>
                <div class="row mx-0 justify-content-between">
                    <div></div>
                    <div class="btn-group-sm mr-5">
                        <button class="btn btn-outline-primary" onclick="zoomChart('q1')">放大</button>
                        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#q1Modal">显示数据表格</button>
                    </div>
                </div>
                <div id="q1" class="mx-5 mb-5 c">
                    <div class="loading-container">
                        <div class="loading"></div>
                    </div>
                </div>
            </div>
            <div>
                <div class="row mx-0 justify-content-between">
                    <div></div>
                    <div class="btn-group-sm mr-5">
                        <button class="btn btn-outline-primary" onclick="zoomChart('hot')">放大</button>
                        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#hotModal">显示数据表格</button>
                    </div>
                </div>
                <div id="hot" class="mx-5 mb-5 c">
                    <div class="loading-container">
                        <div class="loading"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <div>
                <div class="row mx-0 justify-content-between">
                    <div></div>
                    <div class="btn-group-sm mr-5">
                        <button class="btn btn-outline-primary" onclick="zoomChart('topp')">放大</button>
                        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#toppModal">显示数据表格</button>
                    </div>
                </div>
                <div id="topp" class="mx-5 mb-5 c">
                    <div class="loading-container">
                        <div class="loading"></div>
                    </div>
                </div>
            </div>
            <div>
                <div class="row mx-0 justify-content-between">
                    <div></div>
                    <div class="btn-group-sm mr-5">
                        <button class="btn btn-outline-primary" onclick="zoomChart('hq')">放大</button>
                        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#hqModal">显示数据表格</button>
                    </div>
                </div>
                <div id="hq" class="mx-5 mb-5 c">
                    <div class="loading-container">
                        <div class="loading"></div>
                    </div>
                </div>
            </div>
            <div>
                <div class="row mx-0 justify-content-between">
                    <div></div>
                    <div class="btn-group-sm mr-5">
                        <button class="btn btn-outline-primary" onclick="zoomChart('cns')">放大</button>
                        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#cnsModal">显示数据表格</button>
                    </div>
                </div>
                <div id="cns" class="mx-5 mb-5 c">
                    <div class="loading-container">
                        <div class="loading"></div>
                    </div>
                </div>
            </div>
        </div>

        <!--  弹框-->
        <div class="modal fade" id="noppModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
        <div class="modal fade" id="toppModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
        <div class="modal fade" id="q1Modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
        <div class="modal fade" id="hqModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
        <div class="modal fade" id="hotModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
        <div class="modal fade" id="cnsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
    <script src="{{URL::asset('js/global/operation.js')}}"></script>
    <script src="{{URL::asset('js/research/page_output.js')}}"></script>
@stop
