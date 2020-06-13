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
            <!-- 技术市场&活跃期 -->
            <div>
                <div class="row mx-0 justify-content-between">
                    <div></div>
                    <div class="btn-group-sm mr-5">
                        <button class="btn btn-outline-primary" onclick="zoomChart('cvy')">放大</button>
                        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#cvyModal">显示数据表格</button>
                    </div>
                </div>
                <div id="cvy" class="mx-5 mb-5 c">
                    <div class="loading-container">
                        <div class="loading"></div>
                    </div>
                </div>
            </div>
            <!-- 专利权人&活跃期 -->
            <div>
                <div class="row mx-0 justify-content-between">
                    <div></div>
                    <div class="btn-group-sm mr-5">
                        <button class="btn btn-outline-primary" onclick="zoomChart('avs')">放大</button>
                        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#avsModal">显示数据表格</button>
                    </div>
                </div>
                <div id="avs" class="mx-5 mb-5 c">
                    <div class="loading-container">
                        <div class="loading"></div>
                    </div>
                </div>
            </div>
            <!-- 技术发展趋势 -->
            <div>
                <div class="row mx-0 justify-content-between">
                    <div></div>
                    <div class="btn-group-sm mr-5">
                        <button class="btn btn-outline-primary" onclick="zoomChart('ivy')">放大</button>
                        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#ivyModal">显示数据表格</button>
                    </div>
                </div>
                <div id="ivy" class="mx-5 mb-5 c">
                    <div class="loading-container">
                        <div class="loading"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <!-- 技术市场&技术分布 -->
            <div>
                <div class="row mx-0 justify-content-between">
                    <div></div>
                    <div class="btn-group-sm mr-5">
                        <button class="btn btn-outline-primary" onclick="zoomChart('cvi')">放大</button>
                        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#cviModal">显示数据表格</button>
                    </div>
                </div>
                <div id="cvi" class="mx-5 mb-5 c">
                    <div class="loading-container">
                        <div class="loading"></div>
                    </div>
                </div>
            </div>
            <!-- 专利权人&技术分布 -->
            <div>
                <div class="row mx-0 justify-content-between">
                    <div></div>
                    <div class="btn-group-sm mr-5">
                        <button class="btn btn-outline-primary" onclick="zoomChart('avi')">放大</button>
                        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#aviModal">显示数据表格</button>
                    </div>
                </div>
                <div id="avi" class="mx-5 mb-5 c">
                    <div class="loading-container">
                        <div class="loading"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 弹框 -->
        <div class="modal fade" id="cvyModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
        <div class="modal fade" id="avsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
        <div class="modal fade" id="ivyModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
        <div class="modal fade" id="cviModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
        <div class="modal fade" id="aviModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
    <script src="{{URL::asset('js/patent/page_patent_matrix.js')}}"></script>
@stop