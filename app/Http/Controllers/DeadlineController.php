<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Deadline;
use App\Models\Course;
use App\Models\Trie;



class DeadlineController extends Controller
{
    public function createDeadline(Request $request){
        
        $course_name = Course::find($request->course_id)->name;
    
            
       $income = $request->validate([
            'course_id' =>'required',
            'date' => 'required'
       ]); 
       
       $income['course_name'] = $course_name;
        Deadline::create($income);
        return redirect('/rokovi');
        
    }
    public function deleteDeadline(Request $request){
        
        $deadline = Deadline::find($request->id);

        $Trie = Trie::where('deadline_id', $deadline->id)->get();
        foreach($Trie as $t){
            $t->delete();
        }

        
        $deadline->delete();
        return redirect('/rokovi');
        
    }
}
