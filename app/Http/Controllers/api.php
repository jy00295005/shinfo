<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

use DB;



class Api extends Controller
{

    /**
     * Show the profile for the given user.
     *
     * @param  int  $id
     * @return Response
     */
    public function show_unv_output($type='paper',$update_time='2019-06-20',$uni = 'all',$cate = 'all')
    { 
        $uni_paper_count = DB::table('paper_output');

        switch ($type) {
            case 'paper':
                $uni_paper_count->select(DB::raw('dis_uni_name,count(dis_uni_name) as uni_paper_count'));
                break;

            case 'citation':
                $uni_paper_count->select(DB::raw('dis_uni_name,CAST(sum(citation) as UNSIGNED) as uni_paper_count'));
                break;
            
            default:
                return ['error'=>'Wrong type value'];
                break;
        }

        $uni_paper_count->where('updateTime',$update_time)
                        ->groupBy('dis_uni_name');

        // $count = DB::table('paper_output')->where('updateTime',$update_time);

        if($uni != 'all'){
            $uni_li = explode(',',$uni);
            $uni_paper_count->whereIn('dis_uni_name', $uni_li);
        }
        if($cate != 'all'){
            $cate_li = explode(',',$cate);
            $uni_paper_count->whereIn('dicipline', $cate_li);
            // $count->whereIn('dicipline', $cate_li);
        }

        $uni_paper_count = $uni_paper_count->get();
        // $count = $count->count();



        // foreach ($uni_paper_count as $key => $value) {
        //     $value->{"precent"} = ($value->uni_paper_count/$count)*100;
        // }

        return $uni_paper_count;

    }


    public function show_inst_paper_trend($type='paper',$update_time='2019-06-20',$uni = 'all',$cate = 'all')
    {   
        $uni_paper_count = DB::table('paper_output');
        switch ($type) {
            case 'paper':
                $uni_paper_count->select(
                    DB::raw('dis_uni_name,pubYear,count(pubYear) as uni_year_count')
                );
                break;

            case 'citation':
                $uni_paper_count->select(
                    DB::raw('dis_uni_name,pubYear,count(pubYear) as uni_year_count,sum(citation) as uni_year_citation')
                );
                break;
            
            default:
                return ['error'=>'Wrong type value'];
                break;
        }

        $uni_paper_count->where('updateTime',$update_time)
                        ->whereNotNull('pubYear')
                        ->groupBy('dis_uni_name','pubYear');


        $uni_group_li = DB::table('paper_output')
                    ->select(DB::raw('dis_uni_name'))
                    ->where('updateTime',$update_time)
                    ->groupBy('dis_uni_name');

        if($uni != 'all'){
            $uni_li = explode(',',$uni);
            $uni_paper_count->whereIn('dis_uni_name', $uni_li);
        }
        
        if($cate != 'all'){
            $cate_li = explode(',',$cate);
            $uni_paper_count->whereIn('dicipline', $cate_li);
            $uni_group_li->whereIn('dicipline', $cate_li);
        }

        $uni_paper_count = $uni_paper_count->get();
        $uni_group_li = $uni_group_li->get();



        switch ($type) {
            case 'paper':
                $return = [];
                foreach ($uni_group_li as $key => $value) {
                    $uni_name = $value->dis_uni_name;
                    foreach ($uni_paper_count as $db_data) {
                        if ($db_data->dis_uni_name == $uni_name && strlen($db_data->pubYear) == 4){
                            $return[$uni_name][$db_data->pubYear] = $db_data->uni_year_count;
                        }
                    }
                }
                break;
            case 'citation':
                foreach ($uni_group_li as $key => $value) {
                    $uni_name = $value->dis_uni_name;
                    foreach ($uni_paper_count as $db_data) {
                        if ($db_data->dis_uni_name == $uni_name && strlen($db_data->pubYear) == 4){
                            $return[$uni_name][$db_data->pubYear]['paper_count'] = floatval($db_data->uni_year_count);
                            $return[$uni_name][$db_data->pubYear]['paper_citaiton'] = floatval($db_data->uni_year_citation);
                            $return[$uni_name][$db_data->pubYear]['paper_ave_citation'] = floatval($db_data->uni_year_count/$db_data->uni_year_citation);
                        }
                    }
                }
                
                
                break;
            
            default:
                return ['error'=>'Wrong type value'];
                break;
        }
        
        return $return;
    }

    public function show_high_quality_paper($type = 'Q1',$update_time='2019-06-20',$uni = 'all',$cate = 'all'){
        switch ($type) {
            case 'Q1':
                $ind = "Q1论文数量";
                break;

            case 'HQ':
                $ind = "高被引论文数";
                break;

            case 'HOT':
                $ind = "热点论文数";
                break;

            case 'CNS':
                $ind = "CNS论文数";
                break;

            case 'H':
                $ind = "h指数";
                break;

            case 'COAU':
                $ind = "国际合作论文数";
                break;

            case 'CNCI':
                $ind = "CNCI";
                break;


            case 'RF':
                $ind = "进入RF的论文";
                break;

            default:
                return ['error'=>'Wrong type value'];
                break;
        }

        $cate_li = explode(',',$cate);

        function local_sql_builder($table_,$ind_,$update_time_,$cate_,$uni_)
        {
            $data = DB::table($table_);
            $data->select(DB::raw("dis_uni_name, MAX(CASE WHEN indicator = 'SCI论文总数' THEN paper_count END) as 'SCI论文总数', MAX(CASE WHEN indicator = '".$ind_."' THEN paper_count END) as '".$ind_."',dicipline"))
                ->where('updateTime',$update_time_)
                ->where('dicipline',$cate_);

            if($uni_ != 'all'){
                $uni_li_ = explode(',',$uni_);
                $data->whereIn('dis_uni_name', $uni_li_);
            }
            $data->groupBy('dis_uni_name');
            return $data->get();
        }

        if (count($cate_li)>1) {
            $return = [];
            foreach ($cate_li as $key => $cate_val) {
                $mysql_return = local_sql_builder('uni_hq_stat',$ind,$update_time,$cate_val,$uni);
                $return = array_merge($return,$mysql_return);
            }
        } else{
            $return = local_sql_builder('uni_hq_stat',$ind,$update_time,$cate,$uni);
        }

        $add_return = [];
        foreach ($return as $k => $v) {
            if (array_key_exists($v->dis_uni_name, $add_return)) {

                $add_return[$v->dis_uni_name][] = $v;
            }else{
                $add_return[$v->dis_uni_name] = [$v];
            }
        }
        return $add_return;
    }

    public function lists($type = 'paper',$update_time='2019-06-20',$uni = '上科大',$cate = 'all', $year = 'all',$limit = null,$offset = null, $sort = 'pubYear',$kw = null){
        
        $data = DB::table('paper_output')
                ->select('paperID','dis_uni_name','paperTitle','pubYear','citation')
                ->where('updateTime',$update_time)
                ->where('dis_uni_name', $uni);


        
        if ($cate != 'all') {
            $data->where('dicipline',$cate);
        }

        if ($year != 'all') {
            $data->where('pubYear',$year);
        }

        if ($type == 'Q1') {
            $data->where('isQ1',1);
        }

        if ($type == 'HQ') {
            $data->where('isHCP',1);
        }

        if ($type == 'HOT') {
            $data->where('isHot',1);
        }

        if ($type == 'CNS') {
            $data->where('isCNS',1);
        }
        $count = $data->count();
        // var_dump($count);

        if ($limit) {
            $data->limit($limit);
        }

        if ($offset) {
            $data->offset($offset);
        }
        // var_dump($count);
        
        $return_data = $data
                        ->orderBy($sort, 'desc')
                        ->get();

        return [
                    'count' => $count,
                    'list' => $return_data
                ];
    }

    public function paper_kw_lists($update_time='2019-06-20',$uni = '上科大',$cate = 'all',$kw=null,$limit = null,$offset = null, $sort = 'pubYear')
    {
        $data = DB::table('paper_output')
                ->select('paperID','dis_uni_name','paperTitle','pubYear','citation')
                ->where('updateTime',$update_time)
                ->where('dis_uni_name', $uni)
                ->where('dicipline', $cate)
                ->where('authorKWs','like', '%'.$kw.'%');

        $count = $data->count();
        // var_dump($count);

        if ($limit) {
            $data->limit($limit);
        }

        if ($offset) {
            $data->offset($offset);
        }
        // var_dump($count);
        
        $return_data = $data
                        ->orderBy($sort, 'desc')
                        ->get();

        return [
                    'count' => $count,
                    'list' => $return_data
                ];

    }

   

    public function detail($id)
    {
        
    }

    public function cooccurrence($type = 'inst_coo',$update_time='2019-06-20',$uni = 'all',$cate = 'all')
    {
        $data = DB::table('cooccurrence')
                ->select('source','target','weight','updateTime')
                ->where('updateTime',$update_time)
                ->where('dis_uni_name', $uni)
                ->where('cate', $cate)
                ->get();

        $nodes = [];
        foreach ($data as $key => $value) {
            $nodes[] = $value->source;
            $nodes[] = $value->target;
            // var_dump($value);
        }
        $nodes_count_value = (array_count_values($nodes));

        $nodes_return = [];
        foreach ($nodes_count_value as $key => $value) {
            $nodes_return[] = ['id'=>$key,'size'=>floatval($value)];
        }

        // var_dump($nodes_return);

        return [
            'nodes'=>$nodes_return,
            'links'=>$data
        ];

        // return $nodes_count_value;
    }


    public function show_funding($field='Physical Science & Technology')
    {
        $funding_year = DB::table('funding')
                        ->select(DB::raw('StartYear,count(StartYear) as year_count'))
                        ->where('field',$field)
                        ->groupBy('StartYear')
                        ->get();

         $funding_cate = DB::table('funding')
                        ->select(DB::raw('cate,count(cate) as cate_count'))
                        ->where('field',$field)
                        ->where('cate','not like','%;%')
                        ->groupBy('cate')
                        ->orderBy('cate_count', 'desc')
                        ->limit(10)
                        ->get();

        $funding_country = DB::table('funding')
                        ->select(DB::raw('country,count(country) as country_count'))
                        ->where('field',$field)
                        ->where('country','not like','%;%')
                        ->groupBy('country')
                        ->orderBy('country_count', 'desc')
                        ->limit(10)
                        ->get();

        $funding_FunderGroup_display = DB::table('funding')
                        ->select(DB::raw('FunderGroup_display,count(FunderGroup_display) as FunderGroup_display_count'))
                        ->where('field',$field)
                        ->groupBy('FunderGroup_display')
                        ->orderBy('FunderGroup_display_count', 'desc')
                        ->limit(10)
                        ->get();
        return [
            'funding_year'=>$funding_year,
            'funding_cate'=>$funding_cate,
            'funding_country'=>$funding_country,
            'funding_FunderGroup_display'=>$funding_FunderGroup_display
        ];
    }

    public function show_funding_group($field='Physical Science & Technology',$FunderGroup='NSF')
    {
        $funding_org_year = DB::table('funding')
                        ->select(DB::raw('Org_stand,count(Org_stand) as org_count,SUM(FundingUSD) AS FundingUSD'))
                        ->where('field',$field)
                        ->where('FunderGroup_display',$FunderGroup)
                        ->where('Org_stand','not like','%;%')
                        ->groupBy('Org_stand')
                        ->orderBy('FundingUSD', 'desc')
                        ->limit(10)
                        ->get();



        $total_org = DB::table('funding')
                    ->select(DB::raw('count(*) as total_group_count'))
                    ->where('field',$field)
                    ->where('FunderGroup_display',$FunderGroup)
                    ->where('Org_stand','not like','%;%')
                    ->get();
        $total_org = $total_org[0]->total_group_count;


        $total_org_usd = DB::table('funding')
                    ->select(DB::raw('SUM(FundingUSD) as total_FundingUSD'))
                    ->where('field',$field)
                    ->where('FunderGroup_display',$FunderGroup)
                    ->where('Org_stand','not like','%;%')
                    ->get();

        $total_org_usd = $total_org_usd[0]->total_FundingUSD;


        foreach ($funding_org_year as $key => $value) {
            $org_count =  $value->org_count;
            $org_USD =  $value->FundingUSD;

            $funding_str = ($org_count*.05/$total_org+$org_USD*.05/$total_org_usd);
            $funding_org_year[$key]->funding_str = $funding_str;
        }
        

        return  $funding_org_year;
    }

}