<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Grade;
use App\Models\Course;
use App\Models\User;

class GradeController extends Controller
{
    public function createGrade(Request $request){
        $course_name = Course::find($request->course_id)->name;
        $user_name = User::find($request->user_id)->name;
        
        $income = $request->validate([
            'course_id' =>'required',
            'user_id' => 'required',
            'grade' =>'required'
       ]); 

       $income['course_name'] = $course_name;
       $income['user_name'] = $user_name;
       Grade::create($income);
       return redirect('/home');
    }

    public function deleteGrade(Request $request){
        
        $grade = Grade::find($request->id);
        $grade->delete();
        return redirect('/home');
        
    }
}
