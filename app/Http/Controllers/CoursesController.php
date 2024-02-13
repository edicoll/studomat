<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Deadline;
use App\Models\Grade;


class CoursesController extends Controller
{
    public function addCourse(Request $request){
        $income = $request->validate([
            'name' => 'required'
        ]);

        Course::create($income);
        
        return redirect('/home');
        
    }

    public function deleteCourse(Request $request){
       
        $deadline = Deadline::where('course_id', $request->id)->get();
        foreach ($deadline as $d) {
            $d->delete();
        }

        $grade = Grade::where('course_id', $request->id)->get();
        foreach($grade as $g){
            $g->delete();
        }
        
        $course = Course::find($request->id);
        $course->delete();
       
      
        return redirect('/home');
    }
}
