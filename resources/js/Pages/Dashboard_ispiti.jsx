import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Dashboard({ auth, courses, grades, deadlines }) {
 
   
    return (
        <div>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Dashboard" />

                <div className="bg-gray-200 min-h-screen">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <nav className="bg-white p-4 rounded-lg shadow-md">
                            <ul className="flex space-x-8">
                                <li>
                                <form action="/dashboard"
                                                method="GET">
                                    <button 
                                        className=" hover:text-gray-600 hover:scale-110 text-gray-900 font-semibold" >
                                        Ocijene
                                    </button>
                                    </form>
                                </li>
                                <li>
                                    <button
                                        
                                        className=" hover:text-gray-600 hover:scale-110 text-gray-900 font-semibold"
                                    >
                                        Ispiti
                                    </button>
                                </li>
                            </ul>
                        </nav>

                        
                             
                        
                        
                        <div className="mt-6">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="flex flex-wrap justify-start p-6 text-gray-900">
                                        
                                         
                                            {deadlines.map((deadline) => (
                                          <div className="text-center bg-blue-300 w-1/5 h-auto p-4 rounded-lg shadow-md m-6">
                                        <form
                                         action="/addtrie"
                                         method="GET"
                                          >
                                         <input type="hidden" name="course_name" value={deadline.course_name}></input>
                                         Kolegij: <b>{deadline.course_name}</b>
                                         <br/>
                                        
                                         <input type="hidden" name="deadline_id" value={deadline.id}></input>
                                         Datum: <b>{deadline.date}</b>

                                      
                                          <PrimaryButton className="mt-4 ">
                                             prijavi ispit
                                          </PrimaryButton>
                                          </form> 
                                           </div> 
                                            ))}
                                        </div>
                                  
                                    
                                </div>
                            
                        </div>
                      
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
