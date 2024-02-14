<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Deadline;
use App\Models\Trie;

class TrieController extends Controller
{
    //
    public function createTrie(Request $request){
        
        $user_id = Auth()->user()->id;
        $user_name = Auth()->user()->name;
        $deadline_date = Deadline::find($request->deadline_id)->date;

        $income = $request->validate([
            'deadline_id' => 'required',
            'course_name' => 'required'
        ]);

        $income['user_id'] = $user_id;
        $income['user_name'] = $user_name;
        $income['deadline_date'] = $deadline_date;

        Trie::create($income);
        return redirect('/ispiti');


    }
}