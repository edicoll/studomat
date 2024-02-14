<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use App\Models\Course;
use App\Models\Deadline;
use App\Models\Grade;



class HomeController extends Controller
{
    public function index(){

        if(Auth::id()){
            $role = Auth()->user()->role;
            $courses = Course::all();
            $deadlines = Deadline::all(); 
            $grades = Grade::all();
            $users = User::where('role', 'student')->get();
           

            if($role == 'student'){
                return Inertia::render('Dashboard', ['courses' => $courses, 'grades' => $grades]);
            }else if($role == 'admin'){
                return Inertia::render('AdminDashboard',['courses' => $courses, 'deadlines' => $deadlines, 'grades' => $grades, 'users' => $users]);
            }else{
                return Redirect::to('/');
            }
        }
    }
    public function ispiti(){
        $courses = Course::all();
        $grades = Grade::all();
        $deadlines = Deadline::all(); 
        return Inertia::render('Dashboard_ispiti',['courses' => $courses, 'grades' => $grades, 'deadlines' => $deadlines]);
    }
    public function rokovi(){
        $courses = Course::all();
        $deadlines = Deadline::all();
        return Inertia::render('AdminRokovi',['courses' => $courses, 'deadlines' => $deadlines]);
    }
    public function ocijene(){
        $users = User::where('role', 'student')->get();
        $courses = Course::all();
        $grades = Grade::all();
        return Inertia::render('AdminOcijene',['courses' => $courses, 'grades' => $grades, 'users' => $users]);
    }
}
