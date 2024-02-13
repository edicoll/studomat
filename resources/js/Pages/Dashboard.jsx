import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";

export default function Dashboard({ auth, courses, grades }) {
 
    const submit = (course_id) => {
        let odabir = document.getElementById("dodaj");
        odabir.innerHTML = "";
        grades.map((grade) => {
            if (grade.course_id === course_id - "0" && grade.user_id === auth.user.id) {
                let noviElement = document.createElement("div");
                noviElement.classList.add(
                    "relative",
                    "text-center",
                    "bg-gray-200",
                    "w-46",
                    "h-20",
                    "p-4",
                    "rounded-lg",
                    "shadow-md",
                    "mt-12",
                    "m-8"
                );
                // Postavljanje sadržaja
                noviElement.innerHTML = `
                <p>Kolegij:<b> ${grade.course_name}</b></p>
                <p>Ocijena:<b> ${grade.grade}</b></p>
                `;
                // Dodavanje novog elementa kao djeteta odabira
                odabir.appendChild(noviElement);
            }
        });
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
                                        
                                        className="hover:text-gray-600 hover:scale-110 text-gray-900 font-semibold"
                                    >
                                        Ocijene
                                    </button>
                                </li>
                                <li><form action="/ispiti"
                                                method="GET">
                                    <button 
                                        className=" hover:text-gray-600 hover:scale-110 text-gray-900 font-semibold" >
                                        Ispiti
                                    </button>
                                    </form>
                                </li>
                            </ul>
                        </nav>

                        
                             <div className="mt-6">
                             <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                 <div className="flex flex-wrap justify-start p-6 text-gray-900">
                                 <div className="text-center bg-blue-300 w-1/4 h-26 p-4 rounded-lg shadow-md m-12">
                                            <form>
                                                <label>
                                                    Prikaži ocijene za kolegij:
                                                </label>
                                                <select
                                                    className=" rounded-lg shadow-md block w-full mt-4"
                                                    onChange={(event) =>
                                                        submit(
                                                            event.target.value
                                                        )
                                                    }
                                                >
                                                    <option></option>
                                                    {courses.map((course) => (
                                                        <option value={course.id}>
                                                            {course.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </form>
                                        </div>
                                        <div id="dodaj"
                                        className="flex flex-wrap justify-start"></div>
                                      
                                      
                                     </div>
                                 
                             </div>
                         </div>
                        
                        
                      
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
