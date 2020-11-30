<div class="collapse mx-1 col-11 mb-2" id="filter_body">
    <div class="row">

        <div class="mx-1 col-12 col-sm-5 col-md-5 col-lg-3 col-xl-3 mt-2" id="time">
            <div class="card card-body">

                <div class="row mx-1">
                    <span><strong>时间选择</strong></span>&nbsp;&nbsp;
                </div>

                <div class="dropdown-divider"></div>
                <div class="checkboxs">
                    <div ng-repeat="x in timeRange" class="form-check timeRange">
                        <input class="form-check-input" type="radio" value=@{{x}} id="y@{{x}}" ng-click="selectYear()">
                        <label class="form-check-label">@{{x}}</label>
                    </div>
                </div>

            </div>
        </div>

        <div class="mx-1 col-12 col-sm-5 col-md-5 col-lg-3 col-xl-3 mt-2" id="jigou">
            <div class="card card-body">

                <div class="row mx-1">
                    <span><strong>机构选择</strong></span>&nbsp;&nbsp;
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

        <div class="mx-1 col-12 col-sm-5 col-md-5 col-lg-3 col-xl-3 mt-2" id="lingyu">
            <div class="card card-body">

                <div class="row mx-1">
                    <span><strong>研究领域</strong></span>&nbsp;&nbsp;
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