
<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

// research pages

Route::get('/welcome', function () {
    return view('welcome');
});

Route::get('/platform', function () {
    return view('pages.research.home');
});

Route::get('/platform/influence', function () {
    return view('pages.research.influence');
});

Route::get('/platform/multiple_comparison', function () {
    return view('pages.research.multiple_comparison');
});

Route::get('/platform/subject_analyzing', function () {
    return view('pages.research.subject_analyzing');
});


// funding pages

Route::get('/platform/research_projects', function () {
    return view('pages.funding.research_projects');
});

Route::get('/platform/funding_group', function () {
    return view('pages.funding.funding_group');
});

Route::get('/platform/funding_analyzing', function () {
    return view('pages.funding.funding_analyzing');
});

Route::get('/platform/funding_theme', function () {
    return view('pages.funding.funding_theme');
});


// patent pages

Route::get('/platform/patent_application', function () {
    return view('pages.patent.patent_application');
});

Route::get('/platform/patent_matrix', function () {
    return view('pages.patent.patent_matrix');
});

Route::get('/platform/patent_theme', function () {
    return view('pages.patent.patent_theme');
});


// other pages

Route::get('/platform/list', function () {
    return view('pages.list');
});

// Route::get('/api/output/', function () {
//     return array('title'=>'this is api bar');
// });

Route::get('/', function () {
    $data = DB::table('uni_hq_stat')->take(5)->get();
    var_dump($data);
    // return view('welcome');
});



##api
##2020/10更新数据后重写论文元数据接口,
##默认返回数据中日期第一个的机构与领域的查询，增加日期查询后返回对应的数据
    Route::get('api/output/get_options/{version?}', ['as' => 'paper_options', function ($version=null) {
        $date_data = DB::table('uni_hq_stat')
                ->select('updateTime')
                ->groupBy('updateTime')
                ->orderBy('updateTime')
                ->get();
        $dates = [];
        foreach ($date_data as $key => $value) {
            $dates[] = $value->updateTime;
        }

        $default_date = $date_data[0]->updateTime;

        if ($version && in_array($version, $dates)) {
            $default_date =$version;
        }


        if ($default_date == '2019-06-20') {
            $universityName = [
            '上交大', '上科大', '中科大', '剑桥', '加州伯克利', '加州理工', 
            '北大', '南科大', '哈佛', '国科大', '复旦', '斯坦福', '清华', 
            '牛津', '苏黎世理工', '麻省理工'];

            $dicipline=[
                'Physics', 'Chemistry', 'Molecular Biology & Genetics', 'Biology & Biochemistry',
                'Neuroscience & Behavior', 'Engineering', 'Materials Science', 'Computer Science', 
                'Immunology','Microbiology'];
        }else{
            $uni_data = DB::table('uni_hq_stat')
                    ->select('dis_uni_name')
                    ->where('updateTime',$default_date)
                    ->where('dicipline','all')
                    ->groupBy('dis_uni_name')
                    ->get();
            $universityName = [];
            foreach ($uni_data as $key => $value) {
                $universityName[] = $value->dis_uni_name;
            }

            $feild_data = DB::table('uni_hq_stat')
                    ->select('dicipline')
                    ->where('updateTime',$default_date)
                    ->where('dicipline','!=',$default_date)
                    ->where('dicipline','!=','all')
                    ->groupBy('dicipline')
                    ->get();
            $dicipline = [];
            foreach ($feild_data as $key => $value) {
                $dicipline[] = $value->dicipline;
            }
        }
        return [
                    'time_range'=>$date_data,
                    'universityName'=>$universityName,
                    'dicipline'=>$dicipline,
                    'current_date'=>$default_date,              
                    'patent_cate'=> ['Fog Computing']            
                ];
    }]);



    Route::group(['as' => 'api::'], function () {
        Route::get('api/output/get_paper_options11', ['as' => 'paper_options11', function () {
            // use DB;
            $time_range = ["2018-12-31","2019-06-20"];
                // "2018-12-31"=>[2014, 2015, 2016, 2017, 2018],
                // "2019-06-20"=>[2015, 2016, 2017, 2018, 2019],
            // ];
            $universityName = [
                '上交大', '上科大', '中科大', '剑桥', '加州伯克利', '加州理工', 
                '北大', '南科大', '哈佛', '国科大', '复旦', '斯坦福', '清华', 
                '牛津', '苏黎世理工', '麻省理工'];

            $dicipline=[
                'Physics', 'Chemistry', 'Molecular Biology & Genetics', 'Biology & Biochemistry',
                'Neuroscience & Behavior', 'Engineering', 'Materials Science', 'Computer Science', 
                'Immunology','Microbiology'];

            $patent_cate = ['Fog Computing'];

            return [
                    'time_range'=>$time_range,
                    'universityName'=>$universityName,
                    'dicipline'=>$dicipline,
                    'patent_cate'=>$patent_cate                
                    ];
        }]);



    Route::get('api/output/get_options', ['as' => 'inst_paper_count', function () {
        // use DB;
        $time_range = ["2018-12-31","2019-06-20"];
            // "2018-12-31"=>[2014, 2015, 2016, 2017, 2018],
            // "2019-06-20"=>[2015, 2016, 2017, 2018, 2019],
        // ];
        $universityName = [
            '上交大', '上科大', '中科大', '剑桥', '加州伯克利', '加州理工', 
            '北大', '南科大', '哈佛', '国科大', '复旦', '斯坦福', '清华', 
            '牛津', '苏黎世理工', '麻省理工'];

        $dicipline=[
            'Physics', 'Chemistry', 'Molecular Biology & Genetics', 'Biology & Biochemistry',
            'Neuroscience & Behavior', 'Engineering', 'Materials Science', 'Computer Science', 
            'Immunology','Microbiology'];

        $patent_cate = ['Fog Computing'];

        return [
                'time_range'=>$time_range,
                'universityName'=>$universityName,
                'dicipline'=>$dicipline,
                'patent_cate'=>$patent_cate                
                ];
    }]);

    Route::get('api/output/inst_paper_count/{type}/{update_time}/{uni}/{cate}', 'api@show_unv_output');

    Route::get('api/output/inst_paper_trend/{type}/{update_time}/{uni}/{cate}', 'api@show_inst_paper_trend');
    
    
    Route::get('api/output/high_quality_paper/{type}/{update_time}/{uni}/{cate}', 'api@show_high_quality_paper');
    
    ##9月17日添加list接口
    // Route::get('api/output/lists/{type}/{update_time}/{uni}/{cate}', 'api@list');
    Route::get('api/output/lists/{type}/{update_time}/{uni}/{cate}/{year}/{limit?}/{offset?}/{sort?}', 'api@lists');
    Route::get('api/output/detail', 'api@detail');

    Route::get('api/output/kw_lists/{type}/{update_time}/{uni}/{cate}/{year}/kw/{limit?}/{offset?}/{sort?}', 'api@kw_lists');


    Route::get('api/output/paper_kw_lists/{update_time}/{uni}/{cate}/{kw}/{limit?}/{offset?}/{sort?}', 'api@paper_kw_lists');


    ##10月10日添加共现接口
    Route::get('api/cooccurrence/{type}/{update_time}/{uni}/{cate}', 'api@cooccurrence');



    ##项目筛选条件
    Route::get('api/output/funding_opt', ['as' => 'funding_opt', function () {
        $fields=[
            'Physical Science & Technology',
            'Life Science'
        ];

        $FunderGroup=[
            'EC-ERC','UKRI','NASA','NIH','NSF','DoE'
        ];

        $description=[
            'fields'=>'项目学科',
            'FunderGroup'=>'项目资助机构'
        ];

        return [
                'description'=>$description,
                'fields'=>$fields,
                'FunderGroup'=>$FunderGroup
                ];
    }]);


     ##
    Route::get('api/output/funding_group/{fields}', ['as' => 'funding_group', function ($field) {
        switch ($field) {
            case 'Physical Science & Technology':
                $return=[
                    'EC-ERC','UKRI','NASA','NIH','NSF','DoE'
                ];
                break;

            case 'Life Science':
                $return=[
                    'BBSRC','CORDIS','MRC','NIH','NSF','Wellcome Trust'
                ];
                break;
            
            default:
                $return = 'error';
                break;
        }

        return $return;       
    }]);

    ##项目分析~按照文档的要求返回6个结果
    Route::get('api/output/funding/{fields}/{topic?}', 'api@show_funding');


    ##项目资助机构
    Route::get('api/output/funding_group/{fields}/{FunderGroup}', 'api@show_funding_group');

    ##项目分析~主题分析，先返回在一个领域下有多少个top机构
    Route::get('api/output/get_funding_coo_top_orgs/{field}', 'api@show_funding_coo_top_orgs');
    
    ##项目分析~主题分析，按照机构和领域查询获得共现关系绘制图谱
    Route::get('api/output/funding_cooccurrence/{field}/{org}', 'api@show_funding_cooccurrence');

    Route::get('api/output/get_funding_topic_name/{field}', ['as' => 'funding_topics', function ($field) {
        switch ($field) {
            case 'Physical Science & Technology':
                $return =  [
                    'solar cells'=>'solar cell',
                    'quantum mechanics'=>'quantum mechani',
                    'higgs boson'=>'higgs boson',
                    'fine chemicals'=>'fine chemi',
                    'organic synthesis'=>'organic synthesis'
                ];
                break;
            
            default:
                $return = 'error';
                break;
        }

        return $return;
    }]);

    ###专利接口###
    Route::get('api/output/patent_yearly_trend/{cate}', 'api@patent_yearly_trend');
    Route::get('api/output/patent_mix/{cate}', 'api@patent_mix');
    Route::get('api/output/patent_topic/{cate}', 'api@patent_topic');

    // test
    // #机构被引次数统计
    // Route::get('api/output/inst_citation_count/{update_time}/{uni}/{cate}', 'api@show_unv_citaion');

	Route::get('api/output/inst_paper_impact', ['as' => 'inst_paper_impact', function () {
		return [
			[ 'x'=> 95, 'y'=> 95, 'z'=> 13.8, 'name'=> 'BE', 'country'=> 'Belgium' ],
			[ 'x'=> 86.5, 'y'=> 102.9, 'z'=> 14.7, 'name'=> 'DE', 'country'=> 'Germany' ],
			[ 'x'=> 80.8, 'y'=> 91.5, 'z'=> 15.8, 'name'=> 'FI', 'country'=> 'Finland' ],
			[ 'x'=> 80.4, 'y'=> 102.5, 'z'=> 12, 'name'=> 'NL', 'country'=> 'Netherlands' ],
			[ 'x'=> 80.3, 'y'=> 86.1, 'z'=> 11.8, 'name'=> 'SE', 'country'=> 'Sweden' ],
			[ 'x'=> 78.4, 'y'=> 70.1, 'z'=> 16.6, 'name'=> 'ES', 'country'=> 'Spain' ],
			[ 'x'=> 74.2, 'y'=> 68.5, 'z'=> 14.5, 'name'=> 'FR', 'country'=> 'France' ],
			[ 'x'=> 73.5, 'y'=> 83.1, 'z'=> 10, 'name'=> 'NO', 'country'=> 'Norway' ],
			[ 'x'=> 71, 'y'=> 93.2, 'z'=> 24.7, 'name'=> 'UK', 'country'=> 'United Kingdom' ],
			[ 'x'=> 69.2, 'y'=> 57.6, 'z'=> 10.4, 'name'=> 'IT', 'country'=> 'Italy' ],
			[ 'x'=> 68.6, 'y'=> 20, 'z'=> 16, 'name'=> 'RU', 'country'=> 'Russia' ],
			[ 'x'=> 65.5, 'y'=> 126.4, 'z'=> 35.3, 'name'=> 'US', 'country'=> 'United States' ],
			[ 'x'=> 65.4, 'y'=> 50.8, 'z'=> 28.5, 'name'=> 'HU', 'country'=> 'Hungary' ],
			[ 'x'=> 63.4, 'y'=> 51.8, 'z'=> 15.4, 'name'=> 'PT', 'country'=> 'Portugal' ],
			[ 'x'=> 64, 'y'=> 82.9, 'z'=> 31.3, 'name'=> 'NZ', 'country'=> 'New Zealand' ]
		];
	}]);

	Route::get('api/output/inst_paper_co_author', ['as' => 'inst_paper_co_author', function () {
		return [
			'Shanghai'=>24.2,
			'Beijing'=>20.8,
			'Karachi'=>14.9,
			'Shenzhen'=>13.7,
			'Guangzhou'=>13.1,
			'Istanbul'=>12.7,
			'Mumbai'=>12.4
		];
	}]);
});