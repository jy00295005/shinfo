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


// Route::get('/api/output/', function () {
//     return array('title'=>'this is api bar');
// });



##api
Route::group(['as' => 'api::'], function () {
    Route::get('api/output/inst_paper_count', ['as' => 'inst_paper_count', function () {
    	return [
    		'college1'=>[
    			'total' => 47, 'q1' => 27, 'percent' => 25 ],
    		'college2'=>[
    			'total' => 37, 'q1' => 27, 'percent' => 25 ],
    		'college3'=>[
    			'total' => 57, 'q1' => 27, 'percent' => 25 ],
    		'college4'=>[
    			'total' => 17, 'q1' => 27, 'percent' => 25 ],
    		'college5'=>[
    			'total' => 357, 'q1' => 27, 'percent' => 25 ],
    	];
    }]);

    Route::get('api/output/inst_paper_trend', ['as' => 'inst_paper_trend', function () {
    	return [
    		'college1' => [
    			'total'=>["2010" => 14, "2011" => 24, "2012" => 24, "2014" => 34, "2015" =>55]
    		],
    		'college2' => [
    			'total'=>["2010" => 34, "2012" => 34, "2013" => 44, "2014" => 64, "2015" =>75] 
    		],
    		'college3' => [
    			'total'=>["2010" => 64, "2011" => 24, "2012" => 24, "2013" => 34, "2014" => 45, "2015" =>53]
    		],
    	];
    }]);

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