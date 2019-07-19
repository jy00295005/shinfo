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
    public function show_unv_output($update_time='2019-06-20',$uni = 'all',$cate = 'all')
    { 
        $uni_paper_count = DB::table('paper_output')
                            ->select(DB::raw('dis_uni_name,count(dis_uni_name) as uni_paper_count'))
                            ->where('updateTime',$update_time)
                            ->groupBy('dis_uni_name');

        $count = DB::table('paper_output')->where('updateTime',$update_time);

        if($uni != 'all'){
            $uni_li = explode(',',$uni);
            $uni_paper_count->whereIn('dis_uni_name', $uni_li);
        }
        if($cate != 'all'){
            $cate_li = explode(',',$cate);
            $uni_paper_count->whereIn('dicipline', $cate_li);
            $count->whereIn('dicipline', $cate_li);
        }

        $uni_paper_count = $uni_paper_count->get();
        $count = $count->count();

        foreach ($uni_paper_count as $key => $value) {
            $value->{"precent"} = ($value->uni_paper_count/$count)*100;
        }

        return $uni_paper_count;

    }


    public function show_inst_paper_trend($update_time='2019-06-20',$uni = 'all',$cate = 'all')
    { 
        $uni_paper_count = DB::table('paper_output')
                            ->select(DB::raw('dis_uni_name,pubYear,count(pubYear) as uni_year_count'))
                            ->where('updateTime',$update_time)
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

        $return = [];
        foreach ($uni_group_li as $key => $value) {
            $uni_name = $value->dis_uni_name;
            foreach ($uni_paper_count as $db_data) {
                if ($db_data->dis_uni_name == $uni_name && strlen($db_data->pubYear) == 4){
                    $return[$uni_name][$db_data->pubYear] = $db_data->uni_year_count;
                }
            }
        }
        
        return $return;

    }

    public function show_high_quality_paper($type = 'Q1',$update_time='2019-06-20',$uni = 'all',$cate = 'all'){
        $data = DB::table('uni_hq_stat');

        switch ($type) {
            case 'Q1':
                $ind = "Q1论文数量";
                
            
            case 'HQ':
                $ind = "高被引论文数";
                break;

            case 'HOT':
                $ind = "热点论文数";
                break;

            case 'CNS':
                $ind = "CNS论文数";
                break;

            default:
                return ['error'=>'Wrong type value'];
                break;
        }
        $data->select(DB::raw("dis_uni_name, MAX(CASE WHEN indicator = 'SCI论文总数' THEN paper_count END) as 'SCI论文总数', MAX(CASE WHEN indicator = '".$ind."' THEN paper_count END) as '".$ind."'"))
            ->where('updateTime',$update_time)
            ->where('dicipline',$cate);

        if($uni != 'all'){
            $uni_li = explode(',',$uni);
            $data->whereIn('dis_uni_name', $uni_li);
        }
        $data->groupBy('dis_uni_name');
        return $data->get();

    }
}