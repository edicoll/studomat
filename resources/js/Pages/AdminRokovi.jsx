import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Dashboard({ auth, courses, deadlines }) {
  


    return (
        <div>
            <AuthenticatedLayout user={auth.user}>
                <Head title="AdminDashboard" />

                <div className="bg-gray-200 min-h-screen">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <nav className="bg-white p-4 rounded-lg shadow-md">
                            <ul className="flex space-x-8">
                                <li>
                                <form action="/home"
                                                method="GET">
                                    <button 
                                        className=" hover:text-gray-600 hover:scale-110 text-gray-900 font-semibold" >
                                        Kolegiji
                                    </button>
                                    </form>
                                </li>
                                <li>
                                    <button
                                  
                                        className=" hover:text-gray-600 hover:scale-110 text-gray-900 font-semibold"
                                    >
                                        Dodavanje rokova
                                    </button>
                                </li>
                                <li>
                                <form action="/ocijene"
                                                method="GET">
                                    <button 
                                        className=" hover:text-gray-600 hover:scale-110 text-gray-900 font-semibold" >
                                        Dodavanje ocijena
                                    </button></form>
                                </li>
                            </ul>
                        </nav>

                      

                        
                            <div className="mt-6">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="flex flex-wrap justify-start p-6 text-gray-900">
                                        <div className="text-center bg-green-200 w-1/4  p-4 rounded-lg shadow-md m-12">
                                            <b>Dodavanje ispitnog roka</b>
                                            <br />
                                            <br />
                                            <form
                                                action="/adddeadline"
                                                method="GET"
                                            >
                                                <label>Odaberi kolegij</label>
                                                <select
                                                    name="course_id"
                                                    className=" rounded-lg shadow-md mt-2 block w-full"
                                                ><option>-- odaberi --</option>
                                                    {courses.map((course) => (
                                                        <option
                                                            value={course.id}
                                                        >
                                                            {course.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <br />

                                                <label>Odaberi datum</label>

                                                <input
                                                    type="date"
                                                    name="date"
                                                    className=" rounded-lg shadow-md mt-2 block w-full"
                                                ></input>
                                                <br />
                                                <PrimaryButton className="mt-6 ">
                                                    dodaj
                                                </PrimaryButton>
                                            </form>
                                        </div>

                                        {deadlines.map((deadline) => (
                                            <div className=" relative text-center bg-gray-200 w-1/6 h-80 p-4 rounded-lg shadow-md mt-12 m-8">
                                                <div className="mt-6">
                                                    Kolegij:{"    "}
                                                    <b>
                                                        {deadline.course_name}
                                                    </b>
                                                </div>
                                                <div className="mt-8">
                                                    Datum:{"    "}
                                                    <b>{deadline.date}</b>
                                                </div>

                                                <form
                                                    action="/deletedeadline"
                                                    method="GET"
                                                    className=" absolute bottom-4 ml-11"
                                                >
                                                    <input
                                                        type="hidden"
                                                        name="id"
                                                        value={deadline.id}
                                                    ></input>
                                                    <PrimaryButton>
                                                        obriši
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
