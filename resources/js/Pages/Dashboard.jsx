import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";

export default function Dashboard({ auth, grades }) {
    const [isVisible1, setIsVisible1] = useState(true);
    const [isVisible2, setIsVisible2] = useState(false);

    const toggleVisibility1 = () => {
        setIsVisible1(true);
        setIsVisible2(false);
    };
    const toggleVisibility2 = () => {
        setIsVisible1(false);
        setIsVisible2(true);
    };

    return (
        <div>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Dashboard" />

                <div className="bg-gray-200 min-h-screen">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <nav className="bg-white p-4 rounded-lg shadow-md">
                            <ul className="flex space-x-8">
                                <li>
                                    <button
                                        onClick={toggleVisibility1}
                                        className="hover:text-gray-600 hover:scale-110 text-gray-900 font-semibold"
                                    >
                                        Ocijene
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={toggleVisibility2}
                                        className=" hover:text-gray-600 hover:scale-110 text-gray-900 font-semibold"
                                    >
                                        Ispiti
                                    </button>
                                </li>
                            </ul>
                        </nav>

                        {isVisible1 && (
                             <div className="mt-6">
                             <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                 <div className="flex flex-wrap justify-start p-6 text-gray-900">
                                      {grades.map((grade) => (
                                               <div className=" text-center bg-gray-200 w-1/6 h-24 p-4 rounded-lg shadow-md m-12">
                                               <h1>Kolegij: {grade.course_name}</h1>   
                                               <h1>Ocijena: {grade.grade}</h1>
                                               </div>
                                                 ))}
                                         
                                     </div>
                                 
                             </div>
                         </div>
                        )}
                        {isVisible2 && (
                            <div className="mt-6">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="flex flex-wrap justify-start p-6 text-gray-900">
                                         
                                            
                                        </div>
                                    
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
