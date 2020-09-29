<div>
    <div class="row mx-0 justify-content-between">
        <div></div>
        <div class="btn-group-sm mr-5">
            <button class="btn btn-outline-primary" onclick="zoomChart('{{$id}}')">放大</button>
            <button class="btn btn-outline-primary" data-toggle="modal" data-target="#{{$modal}}Modal">显示数据表格</button>
        </div>
    </div>
    <div id="{{$id}}" class="mx-5 mb-5 c">
        <div class="loading-container">
            <div class="loading"></div>
        </div>
    </div>
</div>

<!-- 弹框 -->
<div class="modal fade" id="{{$modal}}Modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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