<div class="collapse mx-1 col-11 mb-2" id="filter_body">
    <div class="row">

        <div class="mx-1 col-4" id="time" style="display: none">
            <div class="card card-body">
                <div id="timeslider"></div>
            </div>
        </div>

        <div class="mx-1 col-3" id="jigou">
            <div class="card card-body">

                <div class="row mx-1">
                    <span>机构选择</span>&nbsp;&nbsp;
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="all1" onclick="checkAll('#all1')">
                        <label class="form-check-label" for="all1">全选</label>
                    </div>
                </div>

                <div class="dropdown-divider"></div>
                <div class="checkboxs">
                    <div ng-repeat="x in universityName" class="form-check">
                        <input class="form-check-input" type="checkbox" value=@{{x}}>
                        <label class="form-check-label">@{{x}}</label>
                    </div>
                </div>

            </div>
        </div>

        <div class="mx-1 col-3" id="lingyu">
            <div class="card card-body">

                <div class="row mx-1">
                    <span>研究领域</span>&nbsp;&nbsp;
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="all2" onclick="checkAll('#all2')">
                        <label class="form-check-label" for="all2">全选</label>
                    </div>
                </div>

                <div class="dropdown-divider"></div>
                <div class="checkboxs">
                    <div ng-repeat="x in dicipline" class="form-check">
                        <input class="form-check-input" type="checkbox" value=@{{x}}>
                        <label class="form-check-label">@{{x}}</label>
                    </div>
                </div>

            </div>
        </div>

    </div>
</div>