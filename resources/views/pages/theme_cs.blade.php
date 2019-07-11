@extends("layouts.default")
@section("content")
    <div class="btn-toolbar my-4 justify-content-between">
        <div></div>
        <div class="btn-group col-6 float-right">
            <button type="button" class="btn btn-primary" data-toggle="collapse" data-target="#zhibiao" role="button" aria-expanded="false" aria-controls="collapseExample">指标选择 &rsaquo;</button>
            <button type="button" class="btn btn-primary" data-toggle="collapse" data-target="#time" role="button" aria-expanded="false" aria-controls="collapseExample">时间范围 &rsaquo;</button>
            <button type="button" class="btn btn-primary" data-toggle="collapse" data-target="#jigou" role="button" aria-expanded="false" aria-controls="collapseExample">机构选择 &rsaquo;</button>
            <button type="button" class="btn btn-primary" data-toggle="collapse" data-target="#lingyu" role="button" aria-expanded="false" aria-controls="collapseExample">研究领域 &rsaquo;</button>
            <button type="button" class="btn btn-primary" data-toggle="collapse" data-target="#guojia" role="button" aria-expanded="false" aria-controls="collapseExample">国家/地区 &rsaquo;</button>
            <button type="button" class="btn btn-primary" data-toggle="collapse" data-target="#duoxiangduibi" role="button" aria-expanded="false" aria-controls="collapseExample">多项对比 &rsaquo;</button>
        </div>
    </div>

    <div class="row ml-1">
        <div class="collapse mx-1" id="zhibiao">
            <div class="card card-body">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                    <label class="form-check-label" for="defaultCheck1">全选</label>
                </div>
                <ul>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck2">
                        <label class="form-check-label" for="defaultCheck2">Top10%论文比</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck3">
                        <label class="form-check-label" for="defaultCheck3">高被引论文比</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck4">
                        <label class="form-check-label" for="defaultCheck4">国际合作比</label>
                    </div>
                </ul>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck5">
                    <label class="form-check-label" for="defaultCheck5">影响力</label>
                </div>
                <ul>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck6">
                        <label class="form-check-label" for="defaultCheck6">引文影响力</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck7">
                        <label class="form-check-label" for="defaultCheck7">CNCI</label>
                    </div>
                </ul>
            </div>
        </div>
        <div class="collapse mx-1" id="time">
            <div class="card card-body">
                <div class="input-group input-group-sm mb-2 my-2">
                    <div class="input-group-prepend">
                        <span class="input-group-text">起始</span>
                    </div>
                    <input type="text" class="form-control">
                    <div class="input-group-prepend">
                        <span class="input-group-text">结束</span>
                    </div>
                    <input type="text" class="form-control">
                </div>
            </div>
        </div>
        <div class="collapse mx-1" id="jigou">
            <div class="card card-body">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck8">
                    <label class="form-check-label" for="defaultCheck8">牛津大学</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck9">
                    <label class="form-check-label" for="defaultCheck9">剑桥大学</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck10">
                    <label class="form-check-label" for="defaultCheck10">哈佛大学</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck11">
                    <label class="form-check-label" for="defaultCheck11">清华大学</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck12">
                    <label class="form-check-label" for="defaultCheck12">北京大学</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck13">
                    <label class="form-check-label" for="defaultCheck13">上海科技大学</label>
                </div>
            </div>
        </div>
        <div class="collapse mx-1" id="lingyu">
            <div class="card card-body">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck14">
                    <label class="form-check-label" for="defaultCheck14">Physics</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck15">
                    <label class="form-check-label" for="defaultCheck15">Chemistry</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck16">
                    <label class="form-check-label" for="defaultCheck16">Engineering</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck17">
                    <label class="form-check-label" for="defaultCheck17">Microbiology</label>
                </div>
            </div>
        </div>
        <div class="collapse mx-1" id="guojia">
            <div class="card card-body">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck18">
                    <label class="form-check-label" for="defaultCheck18">美国</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck19">
                    <label class="form-check-label" for="defaultCheck19">中国</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck20">
                    <label class="form-check-label" for="defaultCheck20">英国</label>
                </div>
            </div>
        </div>
        <div class="collapse col-11 mx-1" id="duoxiangduibi">
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

    <div class="row">
        <div class="col-12">
            <div id="otd" class="m-5"></div>
        </div>

        <div class="col-6">
            <div id="cit" class="m-5"></div>
        </div>

        <div class="col-6">
            <div id="sust" class="m-5"></div>
        </div>
    </div>
@stop
