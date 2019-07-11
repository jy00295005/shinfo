 <ul class="nav nav-fill flex-column">

        <li class="nav-item active">
            <a href="{{URL('test')}}" class="nav-item btn btn-primary btn-block">科研产出</a>
        </li>

        <li class="nav-item">
            <button href="#" class="nav-item btn btn-block">科研影响力</button>
        </li>

        <li class="nav-item">
            <button class="nav-item btn btn-block dropdown-toggle" data-toggle="collapse" href="#subject" role="button" aria-expanded="false" aria-controls="collapseExample">
                学科领域分布
            </button>
            <div class="collapse" id="subject">
                <ul class="nav nav-fill flex-column">
                    <li class="nav-item active">
                        <a href="#" class="nav-link">Physics</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">Chemistry</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">Computer Science</a>
                    </li>
                </ul>
            </div>
        </li>

        <li class="nav-item">
            <button class="nav-item btn btn-block dropdown-toggle" data-toggle="collapse" href="#research" role="button" aria-expanded="false" aria-controls="collapseExample">
                研究主题分布
            </button>
            <div class="collapse" id="research">
                <ul class="nav nav-fill flex-column">
                    <li class="nav-item active">
                        <a href="{{URL('test/theme/cs')}}" class="nav-link">Physics</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">Chemistry</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">Computer Science</a>
                    </li>
                </ul>
            </div>
        </li>

    </ul>