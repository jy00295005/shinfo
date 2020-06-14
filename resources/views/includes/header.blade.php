<header class="mb-5 pb-1">
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top justify-content-between bg-dark py-2 shadow-sm">
        <!-- nav title -->
        <div>
            <img src="{{URL::asset('img/logo_white.png')}}" class="img-responsive mb-1" width="35" height="35">
            <h5 class="navbar-text mx-2 my-0 pr-3 title-customize text-center">集成分析服务平台</h5>
        </div>
        <!-- nav collapse button -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <!-- links -->
            <nav class="navbar-nav m-auto nav-links">
                <a href="{{URL('platform')}}" class="nav-link" style="color: #ffffff">科研对标</a>
                <a href="{{URL('platform/research_projects')}}" class="nav-link" style="color: #cccccc">项目基金</a>
                <a href="{{URL('platform/patent_application')}}" class="nav-link" style="color: #cccccc">技术专利</a>
                <a href="#" class="nav-link" style="color: #cccccc">战略政策</a>
            </nav>
            <!-- login & register links -->
            <nav class="navbar-nav ml-auto">
                <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-light">登陆</button>
                    <button type="button" class="btn btn-sm btn-outline-light">注册</button>
                </div>
            </nav>
        </div>
    </nav>
</header>