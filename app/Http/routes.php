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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/paper', function () {
    return view('paper');
});

Route::get('/paper/research_subs', function () {
    return view('research_subs');
});

Route::get('/paper/compare', function () {
    return view('compare');
});

Route::get('/test', function () {
    return view('pages.home');
});

Route::get('/test/influence', function () {
    return view('pages.influence');
});

Route::get('/test/theme/cs', function () {
    return view('pages.theme_cs');
});

Route::get('/test/multiple_comparison', function () {
    return view('pages.multiple_comparison');
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
Route::group(['as' => 'api::'], function () {
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

        return [
                'time_range'=>$time_range,
                'universityName'=>$universityName,
                'dicipline'=>$dicipline
                ];
    }]);


    Route::get('api/output/inst_paper_count/{type}/{update_time}/{uni}/{cate}', 'api@show_unv_output');

    Route::get('api/output/inst_paper_trend/{type}/{update_time}/{uni}/{cate}', 'api@show_inst_paper_trend');
    
    Route::get('api/output/high_quality_paper/{type}/{update_time}/{uni}/{cate}', 'api@show_high_quality_paper');

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