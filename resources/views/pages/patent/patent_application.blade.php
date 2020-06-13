@extends("layouts.patent")
@section("content")
    <!-- filter -->
    <div class="my-4">
        @include("filter.filter_patent")
    </div>

    <div class="row ml-1">
        @include("filter.filter_patent_body")
    </div>

    <!-- graph -->
    <div class="row mt-2">
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <!-- 专利申请及公开趋势 -->
            <div>
                <div class="row mx-0 justify-content-between">
                    <div></div>
                    <div class="btn-group-sm mr-5">
                        <button class="btn btn-outline-primary" onclick="zoomChart('apply-public')">放大</button>
                        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#applyPublicModal">显示数据表格</button>
                    </div>
                </div>
                <div id="apply-public" class="mx-5 mb-5 c">
                    <div class="loading-container">
                        <div class="loading"></div>
                    </div>
                </div>
            </div>
            <!-- 专利权人分布 -->
            <div>
                <div class="row mx-0 justify-content-between">
                    <div></div>
                    <div class="btn-group-sm mr-5">
                        <button class="btn btn-outline-primary" onclick="zoomChart('patentees')">放大</button>
                        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#patenteesModal">显示数据表格</button>
                    </div>
                </div>
                <div id="patentees" class="mx-5 mb-5 c">
                    <div class="loading-container">
                        <div class="loading"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <!-- 申请国家/地区 -->
            <div>
                <div class="row mx-0 justify-content-between">
                    <div></div>
                    <div class="btn-group-sm mr-5">
                        <button class="btn btn-outline-primary" onclick="zoomChart('country-area')">放大</button>
                        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#countryAreaModal">显示数据表格</button>
                    </div>
                </div>
                <div id="country-area" class="mx-5 mb-5 c">
                    <div class="loading-container">
                        <div class="loading"></div>
                    </div>
                </div>
            </div>
            <!-- IPC技术构成 -->
            <div>
                <div class="row mx-0 justify-content-between">
                    <div></div>
                    <div class="btn-group-sm mr-5">
                        <button class="btn btn-outline-primary" onclick="zoomChart('ipc-tech')">放大</button>
                        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#ipcTechModal">显示数据表格</button>
                    </div>
                </div>
                <div id="ipc-tech" class="mx-5 mb-5 c">
                    <div class="loading-container">
                        <div class="loading"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 弹框 -->
        <div class="modal fade" id="applyPublicModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
        <div class="modal fade" id="patenteesModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
        <div class="modal fade" id="countryAreaModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
        <div class="modal fade" id="ipcTechModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
    <script src="{{URL::asset('js/patent/page_patent_application.js')}}"></script>
@stop